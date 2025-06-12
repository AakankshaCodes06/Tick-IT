import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all sites
  app.get("/api/sites", async (req, res) => {
    try {
      const { category } = req.query;
      
      let sites;
      if (category && typeof category === 'string') {
        sites = await storage.getSitesByCategory(category);
      } else {
        sites = await storage.getAllSites();
      }
      
      res.json(sites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sites" });
    }
  });

  // Get site by ID
  app.get("/api/sites/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid site ID" });
      }

      const site = await storage.getSiteById(id);
      if (!site) {
        return res.status(404).json({ message: "Site not found" });
      }

      res.json(site);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch site" });
    }
  });

  // Create booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      
      // Verify site exists
      const site = await storage.getSiteById(validatedData.siteId);
      if (!site) {
        return res.status(404).json({ message: "Site not found" });
      }

      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid booking data",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Get booking by ID
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid booking ID" });
      }

      const booking = await storage.getBookingById(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });

  // Get bookings by email
  app.get("/api/bookings", async (req, res) => {
    try {
      const { email } = req.query;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Email parameter is required" });
      }

      const bookings = await storage.getBookingsByEmail(email);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
