import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sites = pgTable("sites", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // Archaeological, Museum, Monument, Ancient Ruins
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  imageUrl: text("image_url").notNull(),
  features: jsonb("features").$type<string[]>().default([]),
  availableTimeSlots: jsonb("available_time_slots").$type<{
    time: string;
    price: number;
    capacity: number;
    available: number;
  }[]>().default([]),
  isActive: boolean("is_active").default(true),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  visitDate: text("visit_date").notNull(),
  timeSlot: text("time_slot").notNull(),
  adultTickets: integer("adult_tickets").default(0),
  childTickets: integer("child_tickets").default(0),
  studentTickets: integer("student_tickets").default(0),
  addOns: jsonb("add_ons").$type<string[]>().default([]),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("confirmed"), // confirmed, cancelled, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSiteSchema = createInsertSchema(sites).omit({
  id: true,
  rating: true,
  isActive: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type Site = typeof sites.$inferSelect;
export type InsertSite = z.infer<typeof insertSiteSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
