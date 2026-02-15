
import { db } from "./db";
import { events } from "@shared/schema";

async function seed() {
  const existingEvents = await db.select().from(events);
  if (existingEvents.length === 0) {
    console.log("Seeding events...");
    await db.insert(events).values([
      {
        title: "Annual Community Giveaway",
        description: "Our signature event providing essential items, warm meals, and community connection to Nashville families in need.",
        date: "2025",
        location: "Nashville, TN",
        category: "giveaway",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
      },
      {
        title: "Youth Mentorship Sessions",
        description: "One-on-one and group mentoring sessions connecting Nashville youth with experienced guides and role models.",
        date: "Monthly",
        location: "Nashville, TN",
        category: "mentorship",
        imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80"
      },
      {
        title: "Adopt a Bus Stop Volunteer Days",
        description: "Help prepare and distribute meals to children at bus stops across Nashville communities.",
        date: "Ongoing",
        location: "Nashville, TN",
        category: "volunteer",
        imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
      }
    ]);
    console.log("Seeding complete!");
  } else {
    console.log("Events already exist, skipping seed.");
  }
}

seed().catch(console.error);
