import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedSites from "@/components/featured-sites";
import BookingModal from "@/components/booking-modal";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import Wishlist from "@/components/wishlist";
import type { Site } from "@shared/schema";

export default function Home() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const handleBookSite = (site: Site) => {
    setSelectedSite(site);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedSite(null);
  };

  const handleOpenWishlist = () => {
    setIsWishlistOpen(true);
  };

  const handleCloseWishlist = () => {
    setIsWishlistOpen(false);
  };

  return (
    <div className="min-h-screen bg-heritage-50">
      <Navigation onWishlistOpen={handleOpenWishlist} />
      <HeroSection />
      <FeaturedSites onBookSite={handleBookSite} />
      <FeaturesSection />
      <Footer />
      
      <BookingModal
        site={selectedSite}
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
      />
      
      <Wishlist
        isOpen={isWishlistOpen}
        onClose={handleCloseWishlist}
        onBookSite={handleBookSite}
      />
    </div>
  );
}
