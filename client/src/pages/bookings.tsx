import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar, MapPin, Clock, Users, CreditCard } from "lucide-react";
import type { Booking } from "@shared/schema";

export default function BookingsPage() {
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const { data: bookings, isLoading, error } = useQuery<Booking[]>({
    queryKey: ['/api/bookings', searchEmail],
    enabled: !!searchEmail,
  });

  const handleSearch = () => {
    setSearchEmail(email);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-heritage-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-heritage-800 mb-4">
            My Bookings
          </h1>
          <p className="text-lg text-heritage-600">
            View and manage your historical site bookings
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address to view bookings"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="bg-heritage-600 text-white hover:bg-heritage-700"
                disabled={!email}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Bookings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {searchEmail && (
          <div>
            {isLoading && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {error && (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-red-600">Failed to load bookings. Please try again.</p>
                </CardContent>
              </Card>
            )}

            {!isLoading && !error && bookings && (
              <>
                {bookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Calendar className="mx-auto h-12 w-12 text-heritage-400 mb-4" />
                      <h3 className="text-lg font-semibold text-heritage-800 mb-2">
                        No bookings found
                      </h3>
                      <p className="text-heritage-600">
                        No bookings were found for this email address.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-heritage-800">
                      Found {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
                    </h2>
                    
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl text-heritage-800">
                              Booking #{booking.id}
                            </CardTitle>
                            <Badge className={getStatusColor(booking.status || 'confirmed')}>
                              {booking.status || 'confirmed'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-heritage-500 mr-2" />
                              <div>
                                <p className="text-sm text-heritage-600">Site ID</p>
                                <p className="font-medium">{booking.siteId}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-heritage-500 mr-2" />
                              <div>
                                <p className="text-sm text-heritage-600">Visit Date</p>
                                <p className="font-medium">{booking.visitDate}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-heritage-500 mr-2" />
                              <div>
                                <p className="text-sm text-heritage-600">Time Slot</p>
                                <p className="font-medium">{booking.timeSlot}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 text-heritage-500 mr-2" />
                              <div>
                                <p className="text-sm text-heritage-600">Total Amount</p>
                                <p className="font-medium">${booking.totalAmount}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-heritage-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-heritage-600 mb-1">Customer Details</p>
                                <p className="font-medium">{booking.customerName}</p>
                                <p className="text-sm text-heritage-600">{booking.customerEmail}</p>
                                {booking.customerPhone && (
                                  <p className="text-sm text-heritage-600">{booking.customerPhone}</p>
                                )}
                              </div>
                              
                              <div>
                                <p className="text-sm text-heritage-600 mb-1">Ticket Summary</p>
                                <div className="flex items-center space-x-4 text-sm">
                                  {(booking.adultTickets || 0) > 0 && (
                                    <span className="flex items-center">
                                      <Users className="h-3 w-3 mr-1" />
                                      {booking.adultTickets} Adult
                                    </span>
                                  )}
                                  {(booking.childTickets || 0) > 0 && (
                                    <span className="flex items-center">
                                      <Users className="h-3 w-3 mr-1" />
                                      {booking.childTickets} Child
                                    </span>
                                  )}
                                  {(booking.studentTickets || 0) > 0 && (
                                    <span className="flex items-center">
                                      <Users className="h-3 w-3 mr-1" />
                                      {booking.studentTickets} Student
                                    </span>
                                  )}
                                </div>
                                {booking.addOns && booking.addOns.length > 0 && (
                                  <p className="text-sm text-heritage-600 mt-1">
                                    Add-ons: {(booking.addOns as string[]).join(', ')}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {booking.createdAt && (
                            <div className="mt-4 pt-4 border-t border-heritage-200">
                              <p className="text-sm text-heritage-600">
                                Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {!searchEmail && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="mx-auto h-12 w-12 text-heritage-400 mb-4" />
              <h3 className="text-lg font-semibold text-heritage-800 mb-2">
                Search for Your Bookings
              </h3>
              <p className="text-heritage-600">
                Enter your email address above to view your booking history and details.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
}