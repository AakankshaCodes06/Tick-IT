import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe, User } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "/", label: "Explore Sites" },
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
                HeriTix
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a className="text-heritage-700 hover:text-heritage-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    {item.label}
                  </a>
                </Link>
              ))}
              <div className="ml-4 flex items-center space-x-2">
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
                      <a 
                        className="text-heritage-700 hover:text-heritage-500 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
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
