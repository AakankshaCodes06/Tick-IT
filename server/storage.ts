import { sites, bookings, type Site, type Booking, type InsertSite, type InsertBooking } from "@shared/schema";

export interface IStorage {
  // Sites
  getAllSites(): Promise<Site[]>;
  getSiteById(id: number): Promise<Site | undefined>;
  getSitesByCategory(category: string): Promise<Site[]>;
  createSite(site: InsertSite): Promise<Site>;
  
  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingById(id: number): Promise<Booking | undefined>;
  getBookingsByEmail(email: string): Promise<Booking[]>;
}

export class MemStorage implements IStorage {
  private sites: Map<number, Site>;
  private bookings: Map<number, Booking>;
  private currentSiteId: number;
  private currentBookingId: number;

  constructor() {
    this.sites = new Map();
    this.bookings = new Map();
    this.currentSiteId = 1;
    this.currentBookingId = 1;
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleSites: Omit<Site, 'id'>[] = [
      {
        name: "Chichen Itza",
        location: "Yucatan, Mexico",
        description: "Ancient Mayan city featuring the iconic El Castillo pyramid and rich astronomical alignments.",
        category: "Archaeological",
        price: "45.00",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Audio Guide Available", "Virtual Reality Experience", "Guided Tours"],
        availableTimeSlots: [
          { time: "9:00 AM - 11:00 AM", price: 45, capacity: 100, available: 85 },
          { time: "11:30 AM - 1:30 PM", price: 45, capacity: 100, available: 72 },
          { time: "2:00 PM - 4:00 PM", price: 45, capacity: 100, available: 91 },
          { time: "4:30 PM - 6:30 PM", price: 50, capacity: 100, available: 0 },
        ],
        isActive: true,
      },
      {
        name: "Petra",
        location: "Wadi Musa, Jordan",
        description: "Rose-red city carved into sandstone cliffs, showcasing Nabataean architectural mastery.",
        category: "Archaeological",
        price: "65.00",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d34f51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Night Tours", "Camel Rides", "Local Guides"],
        availableTimeSlots: [
          { time: "8:00 AM - 12:00 PM", price: 65, capacity: 150, available: 120 },
          { time: "1:00 PM - 5:00 PM", price: 65, capacity: 150, available: 95 },
          { time: "6:00 PM - 9:00 PM", price: 80, capacity: 75, available: 45 },
        ],
        isActive: true,
      },
      {
        name: "Stonehenge",
        location: "Wiltshire, England",
        description: "Prehistoric stone circle monument with mysterious origins and astronomical significance.",
        category: "Monument",
        price: "35.00",
        rating: "4.7",
        imageUrl: "https://images.unsplash.com/photo-1599833975787-5e3f19d18208?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Audio Guide", "Exhibition Center", "Gift Shop"],
        availableTimeSlots: [
          { time: "9:30 AM - 11:00 AM", price: 35, capacity: 50, available: 28 },
          { time: "11:30 AM - 1:00 PM", price: 35, capacity: 50, available: 15 },
          { time: "2:00 PM - 3:30 PM", price: 35, capacity: 50, available: 42 },
          { time: "4:00 PM - 5:30 PM", price: 35, capacity: 50, available: 33 },
        ],
        isActive: true,
      },
      {
        name: "Acropolis of Athens",
        location: "Athens, Greece",
        description: "Ancient citadel containing the remains of several historically significant buildings including the Parthenon.",
        category: "Archaeological",
        price: "25.00",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Museum Access", "Multilingual Guides", "Photography Permitted"],
        availableTimeSlots: [
          { time: "8:00 AM - 10:30 AM", price: 25, capacity: 200, available: 156 },
          { time: "11:00 AM - 1:30 PM", price: 25, capacity: 200, available: 189 },
          { time: "2:00 PM - 4:30 PM", price: 25, capacity: 200, available: 134 },
          { time: "5:00 PM - 7:30 PM", price: 30, capacity: 150, available: 98 },
        ],
        isActive: true,
      },
      {
        name: "Egyptian Museum",
        location: "Cairo, Egypt",
        description: "World's most extensive collection of ancient Egyptian artifacts and treasures including Tutankhamun's treasures.",
        category: "Museum",
        price: "20.00",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Special Exhibitions", "Photography Pass", "Expert Guides"],
        availableTimeSlots: [
          { time: "9:00 AM - 12:00 PM", price: 20, capacity: 300, available: 245 },
          { time: "12:30 PM - 3:30 PM", price: 20, capacity: 300, available: 198 },
          { time: "4:00 PM - 7:00 PM", price: 25, capacity: 250, available: 167 },
        ],
        isActive: true,
      },
      {
        name: "Pompeii",
        location: "Naples, Italy",
        description: "Preserved ancient Roman city frozen in time by volcanic ash from Mount Vesuvius in 79 AD.",
        category: "Ancient Ruins",
        price: "18.00",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Archaeological Tours", "Virtual Reconstructions", "Street Art Displays"],
        availableTimeSlots: [
          { time: "8:30 AM - 11:30 AM", price: 18, capacity: 400, available: 312 },
          { time: "12:00 PM - 3:00 PM", price: 18, capacity: 400, available: 289 },
          { time: "3:30 PM - 6:30 PM", price: 22, capacity: 300, available: 201 },
        ],
        isActive: true,
      },
    ];

    sampleSites.forEach(site => {
      const id = this.currentSiteId++;
      this.sites.set(id, { ...site, id });
    });
  }

  async getAllSites(): Promise<Site[]> {
    return Array.from(this.sites.values()).filter(site => site.isActive);
  }

  async getSiteById(id: number): Promise<Site | undefined> {
    return this.sites.get(id);
  }

  async getSitesByCategory(category: string): Promise<Site[]> {
    return Array.from(this.sites.values()).filter(
      site => site.isActive && site.category === category
    );
  }

  async createSite(insertSite: InsertSite): Promise<Site> {
    const id = this.currentSiteId++;
    const site: Site = {
      ...insertSite,
      id,
      rating: "0",
      isActive: true,
    };
    this.sites.set(id, site);
    return site;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = {
      ...insertBooking,
      id,
      status: "confirmed",
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByEmail(email: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.customerEmail === email
    );
  }
}

export const storage = new MemStorage();
