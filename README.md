# 💍 Digital Wedding Invitation Platform

A production-quality Next.js application to create and share beautiful digital wedding invitations with 5 unique templates.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (download from https://nodejs.org)
- **npm** v9+ (comes with Node.js)

---

## 📦 Installation & Run

### Step 1 — Extract the project

Unzip/copy the `wedding-app` folder to your desired location, e.g.:

```
C:\Projects\wedding-app        (Windows)
~/Projects/wedding-app         (Mac/Linux)
```

### Step 2 — Open terminal in the project folder

```bash
cd C:\Projects\wedding-app     # Windows
cd ~/Projects/wedding-app      # Mac/Linux
```

### Step 3 — Install dependencies

```bash
npm install
```

### Step 4 — Run the development server

```bash
npm run dev
```

### Step 5 — Open in browser

```
http://localhost:3000
```

---

## 🗺️ Pages

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Homepage / Landing |
| `http://localhost:3000/admin` | Admin panel — create invitations |
| `http://localhost:3000/{slug}` | View a wedding invitation |

---

## 📁 Project Structure

```
wedding-app/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles + Google Fonts
│   ├── admin/
│   │   └── page.tsx                # Admin panel (create invitation)
│   ├── [slug]/
│   │   ├── page.tsx                # Dynamic invitation page
│   │   └── not-found.tsx           # 404 for invalid slugs
│   └── api/
│       ├── upload/route.ts         # POST /api/upload — image upload
│       └── create/route.ts         # POST /api/create — create invitation
│
├── components/
│   ├── TemplateRenderer.tsx        # Switches template by templateId
│   └── templates/
│       ├── Template1.tsx           # Royal Elegance (gold & ivory)
│       ├── Template2.tsx           # Blush Romance (pink florals)
│       ├── Template3.tsx           # Modern Noir (black & white)
│       ├── Template4.tsx           # Rustic Garden (sage & earth)
│       └── Template5.tsx           # Art Deco (navy & gold)
│
├── lib/
│   ├── types.ts                    # TypeScript interfaces
│   └── invitations.ts              # Data access (read/write JSON)
│
├── data/
│   └── invitations.json            # Invitation storage (auto-created)
│
└── public/
    └── uploads/                    # Uploaded images served statically
```

---

## 🎨 Templates

| ID | Name | Style |
|----|------|-------|
| `template1` | Royal Elegance | Deep purple, gold ornaments, Great Vibes script |
| `template2` | Blush Romance | Pink florals, rounded gallery, soft pastel tones |
| `template3` | Modern Noir | Full-screen black, large type, monochrome gallery |
| `template4` | Rustic Garden | Sage green header, tilted photo cards, earthy tones |
| `template5` | Art Deco | Navy blue, geometric SVG patterns, gold frames |

---

## 🔌 API Reference

### POST `/api/upload`

Upload one or more images.

**Request:** `multipart/form-data` with field name `images`

**Response:**
```json
{ "urls": ["/uploads/photo_1234567890.jpg"] }
```

---

### POST `/api/create`

Create a wedding invitation.

**Request body:**
```json
{
  "brideName": "Priya",
  "groomName": "Rahul",
  "date": "2025-02-14",
  "time": "18:00",
  "venue": "The Grand Palace, Mumbai",
  "story": "We met in college...",
  "templateId": "template1",
  "imageUrls": ["/uploads/photo.jpg"]
}
```

**Response:**
```json
{
  "success": true,
  "slug": "priya-rahul",
  "url": "/priya-rahul",
  "invitation": { ... }
}
```

---

## 📂 Image Storage

Uploaded images are saved to **two** locations:

| Platform | External Path | Public Path |
|----------|---------------|-------------|
| Windows | `D:\wedding-app\uploads\` | `public/uploads/` |
| Mac/Linux | `external-uploads/` (project root) | `public/uploads/` |

Images in `public/uploads/` are served at `/uploads/filename.jpg`.

---

## 🏗️ Production Build

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v3**
- **Google Fonts** — Great Vibes, Playfair Display, Cormorant Garamond, Lato, Montserrat
- **uuid** — unique invitation IDs
- **fs/promises** — file system operations

---

## 💡 Tips

- Slugs are auto-generated as `bride-groom` (e.g. `priya-rahul`)
- If a slug already exists, a number suffix is added: `priya-rahul-2`
- All invitations are stored in `data/invitations.json`
- The admin panel has full validation and loading states
- Images are uploaded before form submission to keep things atomic
