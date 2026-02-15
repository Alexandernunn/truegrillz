import { db } from "./db";
import {
  insertContactSchema,
  contactSubmissions,
  events,
  type InsertContactSubmission,
  type ContactSubmission,
  type Event
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createContactSubmission(contact: InsertContactSubmission): Promise<ContactSubmission>;
  getEvents(): Promise<Event[]>;
}

export class DatabaseStorage implements IStorage {
  async createContactSubmission(insertContact: InsertContactSubmission): Promise<ContactSubmission> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }
}

export const storage = new DatabaseStorage();
