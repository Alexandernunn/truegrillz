import type { Context } from "@netlify/functions";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export default async (req: Request, context: Context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const input = contactSchema.parse(body);

    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);

    const [contact] = await db
      .insert(contactSubmissions)
      .values(input)
      .returning();

    await pool.end();

    return new Response(JSON.stringify({ success: true, id: contact.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ message: "Invalid input", errors: err.errors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    console.error("Contact function error:", err);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
