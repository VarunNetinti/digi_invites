import { NextRequest, NextResponse } from "next/server";
import { getInvitationById } from "@/lib/storage";
import * as fs from "fs";
import * as path from "path";
import * as zlib from "zlib";

/* ─────────────────────────────────────────────────────────────
   Pure-Node ZIP builder (no external dependencies).
   Implements PKZIP local file headers + central directory.
───────────────────────────────────────────────────────────── */

interface ZipEntry {
  name: string;   // path inside ZIP
  data: Buffer;
}

function buildZip(entries: ZipEntry[]): Buffer {
  const localHeaders: Buffer[] = [];
  const centralDirs: Buffer[]  = [];
  let offset = 0;

  const dosNow = (() => {
    const d = new Date();
    const dosDate = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    const dosTime = (d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2);
    return { dosDate, dosTime };
  })();

  for (const entry of entries) {
    const nameBytes  = Buffer.from(entry.name, "utf8");
    const compressed = zlib.deflateRawSync(entry.data, { level: 6 });
    const crc        = crc32(entry.data);
    const { dosDate, dosTime } = dosNow;

    // Local file header
    const local = Buffer.alloc(30 + nameBytes.length);
    local.writeUInt32LE(0x04034b50, 0);   // signature
    local.writeUInt16LE(20, 4);            // version needed
    local.writeUInt16LE(0, 6);             // flags
    local.writeUInt16LE(8, 8);             // compression (deflate)
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(entry.data.length, 22);
    local.writeUInt16LE(nameBytes.length, 26);
    local.writeUInt16LE(0, 28);
    nameBytes.copy(local, 30);

    localHeaders.push(local, compressed);

    // Central directory entry
    const cd = Buffer.alloc(46 + nameBytes.length);
    cd.writeUInt32LE(0x02014b50, 0);      // signature
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(8, 10);
    cd.writeUInt16LE(dosTime, 12);
    cd.writeUInt16LE(dosDate, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(compressed.length, 20);
    cd.writeUInt32LE(entry.data.length, 24);
    cd.writeUInt16LE(nameBytes.length, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(offset, 42);
    nameBytes.copy(cd, 46);
    centralDirs.push(cd);

    offset += local.length + compressed.length;
  }

  const cdBuf   = Buffer.concat(centralDirs);
  const eocd    = Buffer.alloc(22);
  const count   = entries.length;
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(count, 8);
  eocd.writeUInt16LE(count, 10);
  eocd.writeUInt32LE(cdBuf.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([...localHeaders, cdBuf, eocd]);
}

/* CRC-32 */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();
function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of buf) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ byte) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

/* ─── read a source file from the project ─── */
const ROOT = path.join(process.cwd());
function src(relPath: string): string {
  try { return fs.readFileSync(path.join(ROOT, relPath), "utf8"); }
  catch { return ""; }
}

/* ─────────────────────────────────────────────────────────────
   GET /api/export?id=<invitationId>
───────────────────────────────────────────────────────────── */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const invitation = await getInvitationById(id);
    if (!invitation) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const inv = invitation;

    const { brideName, groomName, slug, templateId } = invitation;
    const safeName = `${brideName}-${groomName}`.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
    const folderName = `invitation-${safeName}`;

    const gf = inv.groomFamily ?? { fatherName: "", motherName: "", members: [] };
    const tNum = templateId.replace("template", "");

    const hardcodedBlock = `
  // ── Hardcoded invitation data ─────────────────────────
  const brideName            = ${q(inv.brideName)};
  const groomName            = ${q(inv.groomName)};
  const brideAbout           = ${q(inv.brideAbout)};
  const groomAbout           = ${q(inv.groomAbout)};
  const date                 = ${q(inv.date)};
  const time                 = ${q(inv.time)};
  const venue                = ${q(inv.venue)};
  const venueAddress         = ${q(inv.venueAddress)};
  const venueMapUrl          = ${q(inv.venueMapUrl)};
  const receptionVenue       = ${q(inv.receptionVenue)};
  const receptionTime        = ${q(inv.receptionTime)};
  const dressCode            = ${q(inv.dressCode)};
  const specialNote          = ${q(inv.specialNote)};
  const rsvpContact          = ${q(inv.rsvpContact)};
  const rsvpDeadline         = ${q(inv.rsvpDeadline)};
  const rsvpWhatsapp         = ${q(inv.rsvpWhatsapp)};
  const story                = \`${esc(inv.story)}\`;
  const coupleHashtag        = ${q(inv.coupleHashtag)};
  const fontFamily           = ${q(inv.fontFamily ?? "Great Vibes")};
  const accentColor          = ${q(inv.accentColor ?? "#c9a84c")};
  const openingEffect        = ${q(inv.openingEffect ?? "hearts")};
  const openingFormat        = ${q(inv.openingFormat ?? "letter")};
  const lang                 = ${q(inv.lang ?? "english")};
  const backgroundMusicUrl   = ${q(inv.backgroundMusicUrl)};
  const imageUrls            = ${imgArr(inv.imageUrls)};
  const heroImageUrls        = ${imgArr(inv.heroImageUrls)};
  const storyImageUrls       = ${imgArr(inv.storyImageUrls)};
  const brideFamilyImageUrls = ${imgArr(inv.brideFamilyImageUrls)};
  const groomFamilyImageUrls = ${imgArr(inv.groomFamilyImageUrls)};
  const brideFamily = {
    fatherName: ${q(bf.fatherName)},
    motherName: ${q(bf.motherName)},
    members: [${(bf.members ?? []).map((m: {name:string;relation:string}) => `{ name: ${q(m.name)}, relation: ${q(m.relation)} }`).join(", ")}],
  };
  const groomFamily = {
    fatherName: ${q(gf.fatherName)},
    motherName: ${q(gf.motherName)},
    members: [${(gf.members ?? []).map((m: {name:string;relation:string}) => `{ name: ${q(m.name)}, relation: ${q(m.relation)} }`).join(", ")}],
  };
  const events = [${(inv.events ?? []).map((e: {name:string;date:string;time:string;venue:string;venueAddress:string}) =>
    `{ name: ${q(e.name)}, date: ${q(e.date)}, time: ${q(e.time)}, venue: ${q(e.venue)}, venueAddress: ${q(e.venueAddress)} }`
  ).join(", ")}];
  // ─────────────────────────────────────────────────────`;

    // Read template source and substitute
    let templateSource = src(`components/templates/Template${tNum}.tsx`);

    // Replace destructuring block with hardcoded consts
    templateSource = templateSource.replace(
      /const \{[\s\S]*?\} = invitation;/,
      hardcodedBlock
    );
    // Remove translations resolver
    templateSource = templateSource.replace(
      /\s*const t = TRANSLATIONS\[[\s\S]*?\].*?;/g, ""
    );
    // Remove ls/tt helpers block
    templateSource = templateSource.replace(
      /\s*\/\/ For non-Latin[\s\S]*?const tt = .*?;/g, ""
    );
    // Change component signature — no longer needs invitation prop
    templateSource = templateSource.replace(
      /export default function Template\d+\(\s*\{[^}]*\}\s*:\s*TemplateProps\s*\)/,
      `export default function Template${tNum}({ isPreview = false }: { isPreview?: boolean })`
    );
    // Remove TemplateProps import
    templateSource = templateSource.replace(
      /import \{ TemplateProps \} from ["']@\/lib\/types["'];\n?/g, ""
    );
    // Remove translations import
    templateSource = templateSource.replace(
      /import \{ TRANSLATIONS[^}]*\} from ["']@\/lib\/translations["'];\n?/g, ""
    );

    // ── Second pass: replace ALL variable references with literal values ──
    // This replaces {brideName} → "Priya", ${venue} → "The Taj Palace" etc. directly in JSX

    const jsxVal = (v: string | undefined | null) => v ?? "";
    const jsxStr = (v: string | undefined | null) => `"${(v ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;

    // Build the full substitution map — every variable that was hardcoded as a const
    const substitutions: Record<string, string> = {
      brideName:            jsxStr(inv.brideName),
      groomName:            jsxStr(inv.groomName),
      brideAbout:           jsxStr(inv.brideAbout),
      groomAbout:           jsxStr(inv.groomAbout),
      date:                 jsxStr(inv.date),
      time:                 jsxStr(inv.time),
      venue:                jsxStr(inv.venue),
      venueAddress:         jsxStr(inv.venueAddress),
      venueMapUrl:          jsxStr(inv.venueMapUrl),
      receptionVenue:       jsxStr(inv.receptionVenue),
      receptionTime:        jsxStr(inv.receptionTime),
      dressCode:            jsxStr(inv.dressCode),
      specialNote:          jsxStr(inv.specialNote),
      rsvpContact:          jsxStr(inv.rsvpContact),
      rsvpDeadline:         jsxStr(inv.rsvpDeadline),
      rsvpWhatsapp:         jsxStr(inv.rsvpWhatsapp),
      coupleHashtag:        jsxStr(inv.coupleHashtag),
      fontFamily:           jsxStr(inv.fontFamily ?? "Great Vibes"),
      accentColor:          jsxStr(inv.accentColor ?? "#c9a84c"),
      openingEffect:        jsxStr(inv.openingEffect ?? "hearts"),
      openingFormat:        jsxStr(inv.openingFormat ?? "letter"),
      lang:                 jsxStr(inv.lang ?? "english"),
      backgroundMusicUrl:   jsxStr(inv.backgroundMusicUrl),
    };

    // Remove the entire hardcoded consts block — we'll inline everything
    templateSource = templateSource.replace(
      /\/\/ ── Hardcoded invitation data[\s\S]*?\/\/ ─{20,}/,
      "// Data inlined directly into JSX below"
    );

    // 1. Replace JSX expressions: {brideName} → "Priya"  and  {groomName || "Groom"} → "Rahul"
    for (const [varName, val] of Object.entries(substitutions)) {
      const bare   = jsxVal(inv[varName as keyof typeof inv] as string);
      // {varName} → literal value (quoted string in JSX, or raw if already in attr)
      templateSource = templateSource.replace(
        new RegExp(`\\{${varName}\\}`, "g"),
        bare ? `{${val}}` : "{\"\"}"
      );
      // {varName || "Fallback"} → literal value
      templateSource = templateSource.replace(
        new RegExp(`\\{${varName} \\|\\| ["'][^"']*["']\\}`, "g"),
        bare ? `{${val}}` : `{"${varName}"}`
      );
      // template literal ${varName} → bare value (inside backtick strings)
      templateSource = templateSource.replace(
        new RegExp(`\\$\\{${varName}\\}`, "g"),
        bare
      );
      // template literal ${varName || "Fallback"} → bare value
      templateSource = templateSource.replace(
        new RegExp(`\\$\\{${varName} \\|\\| ["'][^"']*["']\\}`, "g"),
        bare
      );
    }

    // 2. story is a multiline string — replace template literal usage too
    const storyVal = (inv.story ?? "").replace(/`/g, "'").replace(/\\/g, "\\\\");
    templateSource = templateSource
      .replace(/\{story\}/g, `{"${storyVal.replace(/"/g, '\\"').replace(/\n/g, "\\n")}"}`)
      .replace(/\$\{story\}/g, storyVal)
      .replace(/const story\s*=.*?;/g, "");

    // 3. Replace array references — imageUrls.length, heroImageUrls etc.
    const heroLen    = (inv.heroImageUrls    ?? []).length;
    const storyLen   = (inv.storyImageUrls   ?? []).length;
    const brideFamLen= (inv.brideFamilyImageUrls ?? []).length;
    const groomFamLen= (inv.groomFamilyImageUrls ?? []).length;

    // Inline the arrays as literal arrays
    const arrInline = (a: string[] | undefined) =>
      !a || a.length === 0 ? "[]" : `[${a.map(u => `"${u.replace(/"/g, '\\"')}`+'"').join(", ")}]`;
    templateSource = templateSource
      .replace(/\bheroImageUrls\b/g,        arrInline(inv.heroImageUrls))
      .replace(/\bstoryImageUrls\b/g,       arrInline(inv.storyImageUrls))
      .replace(/\bbrideFamilyImageUrls\b/g, arrInline(inv.brideFamilyImageUrls))
      .replace(/\bgroomFamilyImageUrls\b/g, arrInline(inv.groomFamilyImageUrls))
      .replace(/\bimageUrls\b/g,            arrInline(inv.imageUrls));

    // 4. Inline brideFamily / groomFamily object literals
    const bfLit = `{ fatherName: ${jsxStr(bf.fatherName)}, motherName: ${jsxStr(bf.motherName)}, members: [${(bf.members ?? []).map(m => `{ name: ${jsxStr(m.name)}, relation: ${jsxStr(m.relation)} }`).join(", ")}] }`;
    const gfLit = `{ fatherName: ${jsxStr(gf.fatherName)}, motherName: ${jsxStr(gf.motherName)}, members: [${(gf.members ?? []).map(m => `{ name: ${jsxStr(m.name)}, relation: ${jsxStr(m.relation)} }`).join(", ")}] }`;
    templateSource = templateSource
      .replace(/\bbrideFamily\b/g, bfLit)
      .replace(/\bgroomFamily\b/g, gfLit);

    // 5. Inline events array
    const evLit = `[${(inv.events ?? []).map(e =>
      `{ name: ${jsxStr(e.name)}, date: ${jsxStr(e.date)}, time: ${jsxStr(e.time)}, venue: ${jsxStr(e.venue)}, venueAddress: ${jsxStr(e.venueAddress)} }`
    ).join(", ")}]`;
    templateSource = templateSource.replace(/\bevents\b/g, evLit);

    // 6. Remove remaining const declarations that are now inlined
    templateSource = templateSource.replace(
      /^\s*const (brideName|groomName|brideAbout|groomAbout|date|time|venue|venueAddress|venueMapUrl|receptionVenue|receptionTime|dressCode|specialNote|rsvpContact|rsvpDeadline|rsvpWhatsapp|coupleHashtag|fontFamily|accentColor|openingEffect|openingFormat|lang|backgroundMusicUrl|imageUrls|heroImageUrls|storyImageUrls|brideFamilyImageUrls|groomFamilyImageUrls|brideFamily|groomFamily|events)\s*=.*?;\n/gm,
      ""
    );

    // 7. Remove the "Data inlined" comment placeholder
    templateSource = templateSource.replace(
      /\s*\/\/ Data inlined directly into JSX below\s*/g, "\n  "
    );

    // ── Minimal page.tsx — renders the template directly ──
    const indexPage = `"use client";
import Template${tNum} from "@/components/templates/Template${tNum}";

export default function Home() {
  return <Template${tNum} />;
}
`;

    // ── Minimal layout ──
    const layoutFile = `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "${brideName} & ${groomName} — Wedding Invitation",
  description: "You are cordially invited to the wedding of ${brideName} and ${groomName}.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0d0820" }}>
        {children}
      </body>
    </html>
  );
}
`;

    // ── package.json — minimal, no DB, no admin ──
    const packageJson = JSON.stringify({
      name: `invitation-${safeName}`,
      version: "1.0.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start" },
      dependencies: { next: "15.1.0", react: "^19.0.0", "react-dom": "^19.0.0" },
      devDependencies: {
        "@types/node": "^22.0.0",
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0",
        autoprefixer: "^10.4.20",
        postcss: "^8.4.49",
        tailwindcss: "^3.4.17",
        typescript: "^5.7.2",
      },
    }, null, 2);

    // ── next.config.ts — minimal ──
    const nextConfig = `import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: { domains: ["localhost", "res.cloudinary.com"] },
};
export default nextConfig;
`;

    // ── tsconfig ──
    const tsConfig = JSON.stringify({
      compilerOptions: {
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true, skipLibCheck: true, strict: true, noEmit: true,
        esModuleInterop: true, module: "esnext", moduleResolution: "bundler",
        resolveJsonModule: true, isolatedModules: true, jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./*"] },
        target: "ES2017",
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    }, null, 2);

    // ── README ──
    const readme = `# ${brideName} & ${groomName} — Wedding Invitation

This is a standalone Next.js app for the wedding invitation of **${brideName} & ${groomName}**.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy

\`\`\`bash
npm run build
npm run start
\`\`\`

Or deploy to Vercel, Netlify, or any Node.js host.

---
*Generated by Digi Invites — a product of AK Tech Dev Solutions*
`;

    // ── Shared components & files to copy as-is ──
    const componentsToCopy: [string, string][] = [
      ["components/InvitationWrapper.tsx",              "components/InvitationWrapper.tsx"],
      ["components/ImageSlideshow.tsx",                 "components/ImageSlideshow.tsx"],
      ["components/effects/EffectRenderer.tsx",         "components/effects/EffectRenderer.tsx"],
      ["components/effects/index.ts",                   "components/effects/index.ts"],
      ["components/effects/HeartsEffect.tsx",           "components/effects/HeartsEffect.tsx"],
      ["components/effects/BirdsEffect.tsx",            "components/effects/BirdsEffect.tsx"],
      ["components/effects/ParrotsEffect.tsx",          "components/effects/ParrotsEffect.tsx"],
      ["components/effects/RosePetalsEffect.tsx",       "components/effects/RosePetalsEffect.tsx"],
      ["components/effects/StarsEffect.tsx",            "components/effects/StarsEffect.tsx"],
      ["components/effects/ButterfliesEffect.tsx",      "components/effects/ButterfliesEffect.tsx"],
      ["components/effects/ConfettiEffect.tsx",         "components/effects/ConfettiEffect.tsx"],
      ["components/effects/FirefliesEffect.tsx",        "components/effects/FirefliesEffect.tsx"],
      ["components/effects/FireworksEffect.tsx",        "components/effects/FireworksEffect.tsx"],
      ["components/effects/BalloonsEffect.tsx",         "components/effects/BalloonsEffect.tsx"],
      ["components/effects/GoldDustEffect.tsx",         "components/effects/GoldDustEffect.tsx"],
      ["components/effects/MandalaEffect.tsx",          "components/effects/MandalaEffect.tsx"],
      ["components/effects/SakuraEffect.tsx",           "components/effects/SakuraEffect.tsx"],
      ["components/effects/ShootingStarsEffect.tsx",    "components/effects/ShootingStarsEffect.tsx"],
      ["components/openings/OpeningFormatRenderer.tsx", "components/openings/OpeningFormatRenderer.tsx"],
      ["components/openings/BookOpening.tsx",           "components/openings/BookOpening.tsx"],
      ["components/openings/CinematicOpening.tsx",      "components/openings/CinematicOpening.tsx"],
      ["components/openings/CurtainOpening.tsx",        "components/openings/CurtainOpening.tsx"],
      ["components/openings/GateOpening.tsx",           "components/openings/GateOpening.tsx"],
      ["components/openings/RiseUpOpening.tsx",         "components/openings/RiseUpOpening.tsx"],
      ["components/openings/ScrollOpening.tsx",         "components/openings/ScrollOpening.tsx"],
      ["components/openings/TypewriterOpening.tsx",     "components/openings/TypewriterOpening.tsx"],
      ["components/openings/ZoomRevealOpening.tsx",     "components/openings/ZoomRevealOpening.tsx"],
      ["lib/types.ts",                                  "lib/types.ts"],
      ["lib/translations.ts",                           "lib/translations.ts"],
    ];

    // ── globals.css ──
    const globalsCss = src("app/globals.css") || `* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0d0820; color: #fff; }
`;

    // ── tailwind / postcss configs ──
    const tailwindConfig = src("tailwind.config.ts") || `import type { Config } from "tailwindcss";
const config: Config = { content: ["./**/*.{ts,tsx}"], theme: { extend: {} }, plugins: [] };
export default config;
`;
    const postcssConfig = src("postcss.config.mjs") || `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };`;

    // ── Build entries list ──
    const entries: ZipEntry[] = [];
    const add = (name: string, content: string) =>
      entries.push({ name: `${folderName}/${name}`, data: Buffer.from(content, "utf8") });

    add("package.json",       packageJson);
    add("next.config.ts",     nextConfig);
    add("tsconfig.json",      tsConfig);
    add("postcss.config.mjs", postcssConfig);
    add("tailwind.config.ts", tailwindConfig);
    add("README.md",          readme);
    add("next-env.d.ts",      `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`);
    add("app/layout.tsx",     layoutFile);
    add("app/page.tsx",       indexPage);
    add("app/globals.css",    globalsCss);

    // The star of the show: template with ALL data hardcoded inside it
    add(`components/templates/Template${tNum}.tsx`, templateSource);

    for (const [srcPath, destPath] of componentsToCopy) {
      const content = src(srcPath);
      if (content) add(destPath, content);
    }

    // ── Build ZIP ──
    const zipBuffer = buildZip(entries);

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${folderName}.zip"`,
        "Content-Length": String(zipBuffer.length),
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[export]", e);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
