/**
 * lib/db.ts
 * MongoDB connection manager.
 * Returns `null` when MONGODB_URI is not set — callers fall back to local JSON.
 */

import mongoose from "mongoose";

// ── Connection cache (Next.js hot-reload safe) ────────────────────────────────
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: mongoose.Connection | null | undefined;
  // eslint-disable-next-line no-var
  var _mongoosePromise: Promise<mongoose.Connection | null> | undefined;
}

let cached = global._mongooseConn ?? null;
let pendingPromise = global._mongoosePromise ?? null;

/**
 * Returns a live Mongoose connection, or `null` if MONGODB_URI is empty.
 * Reuses a cached connection across hot-reloads in development.
 */
export async function connectToDatabase(): Promise<mongoose.Connection | null> {
  const uri = process.env.MONGODB_URI?.trim();

  // ── No URI → local fallback ────────────────────────────────────────────────
  if (!uri) {
    return null;
  }

  // ── Already connected ──────────────────────────────────────────────────────
  if (cached && cached.readyState === 1) {
    return cached;
  }

  // ── Connection in progress ─────────────────────────────────────────────────
  if (pendingPromise) {
    return pendingPromise;
  }

  // ── New connection ─────────────────────────────────────────────────────────
  pendingPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000, // fail fast so local fallback kicks in
      bufferCommands: false,
    })
    .then((m) => {
      cached = m.connection;
      global._mongooseConn = cached;
      console.log("✅ MongoDB Atlas connected");
      return cached;
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed — falling back to local storage:", err.message);
      cached = null;
      global._mongooseConn = null;
      pendingPromise = null;
      global._mongoosePromise = null;
      return null;
    });

  global._mongoosePromise = pendingPromise;
  return pendingPromise;
}

/** True when a MongoDB connection is live. */
export async function isMongoAvailable(): Promise<boolean> {
  const conn = await connectToDatabase();
  return conn !== null && conn.readyState === 1;
}
