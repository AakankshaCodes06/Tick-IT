import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Globe, User, Heart } from "lucide-react";
import { getWishlistCount } from "@/components/wishlist";

interface NavigationProps {
  onWishlistOpen?: () => void;
}

export default function Navigation({ onWishlistOpen }: NavigationProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      setWishlistCount(getWishlistCount());
    };
    
    updateWishlistCount();
    window.addEventListener('storage', updateWishlistCount);
    
    return () => window.removeEventListener('storage', updateWishlistCount);
  }, []);

  const navigationItems = [
    { href: "/", label: "Explore Sites" },
    { href: "/search", label: "Advanced Search" },
    { href: "/bookings", label: "My Bookings" },
    { href: "/support", label: "Support" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-serif font-bold text-heritage-700 cursor-pointer">
                TICK-IT
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="text-heritage-700 hover:text-heritage-500 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                    {item.label}
                  </span>
                </Link>
              ))}
              <div className="ml-4 flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onWishlistOpen}
                  className="relative border-heritage-600 text-heritage-600 hover:bg-heritage-50"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
                <Button variant="outline" size="sm" className="bg-heritage-500 text-white hover:bg-heritage-600">
                  <Globe className="mr-2 h-4 w-4" />
                  EN
                </Button>
                <Button size="sm" className="bg-heritage-700 text-white hover:bg-heritage-800">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6 text-heritage-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  {navigationItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <span 
                        className="text-heritage-700 hover:text-heritage-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                  <div className="flex space-x-2 px-3 py-2">
                    <Button variant="outline" className="flex-1 bg-heritage-500 text-white hover:bg-heritage-600">
                      EN
                    </Button>
                    <Button className="flex-1 bg-heritage-700 text-white hover:bg-heritage-800">
                      Login
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
