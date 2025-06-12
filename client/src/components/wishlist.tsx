import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Heart, X, Star, MapPin, Calendar } from "lucide-react";
import { Link } from "wouter";
import type { Site } from "@shared/schema";

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSite: (site: Site) => void;
}

export default function Wishlist({ isOpen, onClose, onBookSite }: WishlistProps) {
  const [wishlistItems, setWishlistItems] = useState<Site[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('tick-it-wishlist');
    if (stored) {
      try {
        setWishlistItems(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse wishlist:', error);
      }
    }
  }, [isOpen]);

  const removeFromWishlist = (siteId: number) => {
    const updated = wishlistItems.filter(item => item.id !== siteId);
    setWishlistItems(updated);
    localStorage.setItem('tick-it-wishlist', JSON.stringify(updated));
    toast({
      title: "Removed from Wishlist",
      description: "Site has been removed from your wishlist.",
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem('tick-it-wishlist');
    toast({
      title: "Wishlist Cleared",
      description: "All sites have been removed from your wishlist.",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-serif text-heritage-800 flex items-center">
              <Heart className="mr-2 h-6 w-6 text-red-500" />
              My Wishlist
            </CardTitle>
            <div className="flex items-center space-x-2">
              {wishlistItems.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearWishlist}
                  className="text-heritage-600 hover:text-heritage-700"
                >
                  Clear All
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-heritage-600 hover:text-heritage-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[70vh]">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="mx-auto h-12 w-12 text-heritage-400 mb-4" />
              <h3 className="text-lg font-semibold text-heritage-800 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-heritage-600 mb-4">
                Start adding sites you'd like to visit to keep track of your favorites.
              </p>
              <Button onClick={onClose} className="bg-heritage-600 text-white hover:bg-heritage-700">
                Explore Sites
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-heritage-600 mb-4">
                {wishlistItems.length} site{wishlistItems.length !== 1 ? 's' : ''} saved
              </p>
              
              {wishlistItems.map((site) => (
                <Card key={site.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img 
                        src={site.imageUrl} 
                        alt={site.name}
                        className="w-full md:w-32 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-heritage-800">
                              {site.name}
                            </h3>
                            <div className="flex items-center text-heritage-600 text-sm mb-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{site.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {site.category}
                              </Badge>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
                                <span className="text-sm text-heritage-600">{site.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromWishlist(site.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-heritage-600 mb-3 line-clamp-2">
                          {site.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-heritage-700">
                              ${site.price}
                            </span>
                            <span className="text-sm text-heritage-500">/person</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Link href={`/site/${site.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-heritage-600 text-heritage-600 hover:bg-heritage-50"
                                onClick={onClose}
                              >
                                View Details
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              onClick={() => {
                                onBookSite(site);
                                onClose();
                              }}
                              className="bg-heritage-600 text-white hover:bg-heritage-700"
                            >
                              <Calendar className="mr-1 h-3 w-3" />
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Utility functions for wishlist management
export const addToWishlist = (site: Site, toast: any) => {
  const existing = localStorage.getItem('tick-it-wishlist');
  const wishlist: Site[] = existing ? JSON.parse(existing) : [];
  
  if (wishlist.find(item => item.id === site.id)) {
    toast({
      title: "Already in Wishlist",
      description: "This site is already saved to your wishlist.",
    });
    return;
  }
  
  wishlist.push(site);
  localStorage.setItem('tick-it-wishlist', JSON.stringify(wishlist));
  toast({
    title: "Added to Wishlist",
    description: `${site.name} has been saved to your wishlist.`,
  });
};

export const removeFromWishlist = (siteId: number, toast: any) => {
  const existing = localStorage.getItem('tick-it-wishlist');
  if (!existing) return;
  
  const wishlist: Site[] = JSON.parse(existing);
  const updated = wishlist.filter(item => item.id !== siteId);
  localStorage.setItem('tick-it-wishlist', JSON.stringify(updated));
  toast({
    title: "Removed from Wishlist",
    description: "Site has been removed from your wishlist.",
  });
};

export const isInWishlist = (siteId: number): boolean => {
  const existing = localStorage.getItem('tick-it-wishlist');
  if (!existing) return false;
  
  try {
    const wishlist: Site[] = JSON.parse(existing);
    return wishlist.some(item => item.id === siteId);
  } catch {
    return false;
  }
};

export const getWishlistCount = (): number => {
  const existing = localStorage.getItem('tick-it-wishlist');
  if (!existing) return 0;
  
  try {
    const wishlist: Site[] = JSON.parse(existing);
    return wishlist.length;
  } catch {
    return 0;
  }
};