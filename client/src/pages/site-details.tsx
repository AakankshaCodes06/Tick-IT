import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BookingModal from "@/components/booking-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Camera, 
  Wifi, 
  Car,
  Calendar,
  Shield,
  Volume2,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import type { Site } from "@shared/schema";

const getFeatureIcon = (feature: string) => {
  if (feature.toLowerCase().includes('audio')) return Volume2;
  if (feature.toLowerCase().includes('wifi')) return Wifi;
  if (feature.toLowerCase().includes('parking')) return Car;
  if (feature.toLowerCase().includes('photography')) return Camera;
  if (feature.toLowerCase().includes('security')) return Shield;
  return Users;
};

export default function SiteDetailsPage() {
  const params = useParams();
  const siteId = params.id ? parseInt(params.id) : null;
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { data: site, isLoading, error } = useQuery<Site>({
    queryKey: ['/api/sites', siteId],
    enabled: !!siteId,
  });

  const handleBookNow = () => {
    if (site) {
      setSelectedSite(site);
      setIsBookingModalOpen(true);
    }
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedSite(null);
  };

  if (!siteId) {
    return (
      <div className="min-h-screen bg-heritage-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-heritage-800">Invalid Site ID</h1>
            <Link href="/">
              <Button className="mt-4 bg-heritage-600 text-white hover:bg-heritage-700">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-heritage-50">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-96 w-full rounded-lg" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !site) {
    return (
      <div className="min-h-screen bg-heritage-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-heritage-800">Site Not Found</h1>
            <p className="text-heritage-600 mt-2">The site you're looking for doesn't exist or has been removed.</p>
            <Link href="/">
              <Button className="mt-4 bg-heritage-600 text-white hover:bg-heritage-700">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-heritage-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-heritage-600 hover:text-heritage-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sites
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={site.imageUrl} 
                alt={site.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90 text-heritage-700">
                  {site.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-1">
                <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                <span className="text-sm font-medium">{site.rating}</span>
              </div>
            </div>

            {/* Site Information */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-serif text-heritage-800 mb-2">
                      {site.name}
                    </CardTitle>
                    <div className="flex items-center text-heritage-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{site.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-heritage-700">
                      ${site.price}
                    </div>
                    <div className="text-sm text-heritage-500">per person</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-heritage-700 leading-relaxed">
                  {site.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            {site.features && site.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-heritage-800">Site Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {site.features.map((feature, index) => {
                      const IconComponent = getFeatureIcon(feature);
                      return (
                        <div key={index} className="flex items-center">
                          <IconComponent className="h-5 w-5 text-heritage-600 mr-3" />
                          <span className="text-heritage-700">{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heritage-800 flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Available Time Slots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {site.availableTimeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${
                        slot.available === 0
                          ? 'border-heritage-200 bg-heritage-50 opacity-50'
                          : 'border-heritage-300 bg-white hover:border-heritage-500 transition-colors'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-heritage-800">{slot.time}</div>
                        <div className="font-bold text-heritage-700">${slot.price}</div>
                      </div>
                      <div className="text-sm text-heritage-600">
                        {slot.available > 0 ? (
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {slot.available} / {slot.capacity} available
                          </span>
                        ) : (
                          <span className="text-red-600">Sold Out</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heritage-800">Visit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-heritage-800 mb-2">What to Expect</h4>
                  <p className="text-heritage-600 text-sm">
                    This historical site offers a unique glimpse into ancient civilizations. Visitors can explore 
                    well-preserved structures, learn about historical significance, and enjoy guided tours that 
                    bring history to life.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold text-heritage-800 mb-2">Important Notes</h4>
                  <ul className="text-heritage-600 text-sm space-y-1">
                    <li>• Comfortable walking shoes recommended</li>
                    <li>• Sun protection advised for outdoor areas</li>
                    <li>• Photography permitted in designated areas</li>
                    <li>• Large bags may require security screening</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-heritage-800 mb-2">Accessibility</h4>
                  <p className="text-heritage-600 text-sm">
                    This site provides accessibility features including wheelchair access to main areas, 
                    accessible restrooms, and assistance for visitors with mobility needs. Contact support 
                    for specific accessibility requirements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-heritage-800 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Visit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-heritage-700 mb-1">
                    ${site.price}
                  </div>
                  <div className="text-sm text-heritage-500">starting price per person</div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-heritage-600">Category:</span>
                    <span className="font-medium text-heritage-800">{site.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-heritage-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
                      <span className="font-medium text-heritage-800">{site.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-heritage-600">Available Slots:</span>
                    <span className="font-medium text-heritage-800">
                      {site.availableTimeSlots.filter(slot => slot.available > 0).length} times
                    </span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleBookNow}
                  className="w-full bg-heritage-600 text-white hover:bg-heritage-700"
                  size="lg"
                >
                  Book Now
                </Button>
                
                <div className="text-xs text-heritage-500 text-center">
                  Free cancellation up to 24 hours before visit
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heritage-800">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-heritage-600 mr-3" />
                  <span className="text-heritage-700">Suitable for all ages</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-heritage-600 mr-3" />
                  <span className="text-heritage-700">2-3 hours recommended visit</span>
                </div>
                <div className="flex items-center text-sm">
                  <Camera className="h-4 w-4 text-heritage-600 mr-3" />
                  <span className="text-heritage-700">Photography allowed</span>
                </div>
                <div className="flex items-center text-sm">
                  <Shield className="h-4 w-4 text-heritage-600 mr-3" />
                  <span className="text-heritage-700">Secure booking guaranteed</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heritage-800">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-heritage-600 mb-4">
                  Have questions about this site or need assistance with booking?
                </p>
                <Link href="/support">
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      
      <BookingModal
        site={selectedSite}
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
      />
    </div>
  );
}