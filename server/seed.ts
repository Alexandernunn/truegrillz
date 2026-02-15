
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
        imageUrl: "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg"
      },
      {
        title: "Youth Mentorship Sessions",
        description: "One-on-one and group mentoring sessions connecting Nashville youth with experienced guides and role models.",
        date: "Monthly",
        location: "Nashville, TN",
        category: "mentorship",
        imageUrl: "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/627981294_17864939718568787_1136690152794711311_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de2a&_nc_ohc=y4p0Q-3m6YUAX_6_H8P&_nc_ht=scontent-den2-1.cdninstagram.com&oh=00_AfC4G2P8v4WJ4f8_8W7-S5z4_8v4WJ4f8_8W7-S5z4&oe=65C4F8D5"
      },
      {
        title: "Adopt a Bus Stop Volunteer Days",
        description: "Help prepare and distribute meals to children at bus stops across Nashville communities.",
        date: "Ongoing",
        location: "Nashville, TN",
        category: "volunteer",
        imageUrl: "https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_543,h_305,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg"
      }
    ]);
    console.log("Seeding complete!");
  } else {
    console.log("Events already exist, skipping seed.");
  }
}

seed().catch(console.error);
