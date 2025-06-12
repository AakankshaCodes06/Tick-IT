import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Calendar, Users } from "lucide-react";

export default function HeroSection() {
  const [searchData, setSearchData] = useState({
    destination: "",
    date: "",
    visitors: "1 Adult"
  });

  const handleSearch = () => {
    console.log("Search data:", searchData);
  };

  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-fade-in">
            Discover History,<br />Book Your Journey
          </h1>
          <p className="text-xl md:text-2xl text-heritage-100 mb-12 animate-slide-up">
            Explore archaeological wonders and historical sites with seamless ticket booking
          </p>
          
          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto shadow-2xl animate-slide-up">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                <div className="col-span-1 md:col-span-2">
                  <Label htmlFor="destination" className="block text-sm font-medium text-heritage-700 mb-2">
                    Destination
                  </Label>
                  <div className="relative">
                    <Input
                      id="destination"
                      placeholder="Search sites, monuments, museums..."
                      value={searchData.destination}
                      onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
                      className="pr-10"
                    />
                    <MapPin className="absolute right-3 top-3 h-4 w-4 text-heritage-400" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="date" className="block text-sm font-medium text-heritage-700 mb-2">
                    Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={searchData.date}
                      onChange={(e) => setSearchData(prev => ({ ...prev, date: e.target.value }))}
                    />
                    <Calendar className="absolute right-3 top-3 h-4 w-4 text-heritage-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-heritage-700 mb-2">
                    Visitors
                  </Label>
                  <Select value={searchData.visitors} onValueChange={(value) => setSearchData(prev => ({ ...prev, visitors: value }))}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-heritage-400" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 Adult">1 Adult</SelectItem>
                      <SelectItem value="2 Adults">2 Adults</SelectItem>
                      <SelectItem value="3+ Adults">3+ Adults</SelectItem>
                      <SelectItem value="Family Package">Family Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full mt-6 bg-heritage-600 text-white py-4 text-lg font-semibold hover:bg-heritage-700 transition-all transform hover:scale-105"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Available Sites
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
