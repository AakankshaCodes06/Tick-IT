import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedSites from "@/components/featured-sites";
import BookingModal from "@/components/booking-modal";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import type { Site } from "@shared/schema";

export default function Home() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookSite = (site: Site) => {
    setSelectedSite(site);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedSite(null);
  };

  return (
    <div className="min-h-screen bg-heritage-50">
      <Navigation />
      <HeroSection />
      <FeaturedSites onBookSite={handleBookSite} />
      <FeaturesSection />
      <Footer />
      
      <BookingModal
        site={selectedSite}
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
      />
    </div>
  );
}
