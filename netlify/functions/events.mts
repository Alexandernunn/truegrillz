import type { Context } from "@netlify/functions";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, text, serial } from "drizzle-orm/pg-core";

const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
});

const SEED_EVENTS = [
  {
    title: "Annual Community Giveaway",
    description: "Providing essential items, warm meals, and community connection to Nashville families in need.",
    date: "Dec 2025",
    location: "Nashville, TN",
    category: "giveaway",
    imageUrl: "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg",
  },
  {
    title: "Youth Mentorship Session",
    description: "One-on-one and group mentoring sessions connecting Nashville youth with experienced guides.",
    date: "Monthly",
    location: "East Nashville Center",
    category: "mentorship",
    imageUrl: "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg",
  },
  {
    title: "Adopt a Bus Stop",
    description: "Help prepare and distribute meals to children at bus stops across Nashville communities.",
    date: "Weekly",
    location: "Various Locations",
    category: "volunteer",
    imageUrl: "https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_543,h_305,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg",
  },
];

export default async (req: Request, context: Context) => {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);

    let eventList = await db.select().from(events);

    if (eventList.length === 0) {
      await db.insert(events).values(SEED_EVENTS);
      eventList = await db.select().from(events);
    }

    await pool.end();

    return new Response(JSON.stringify(eventList), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    console.error("Events function error:", err);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
