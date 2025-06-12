import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SiteCard from "@/components/site-card";
import BookingModal from "@/components/booking-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  DollarSign, 
  Calendar,
  Users,
  SlidersHorizontal,
  X
} from "lucide-react";
import type { Site } from "@shared/schema";

const CATEGORIES = ["All", "Archaeological", "Museum", "Monument", "Ancient Ruins"];
const SORT_OPTIONS = [
  { value: "name", label: "Name A-Z" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "availability", label: "Most Available" }
];

export default function SearchPage() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const { data: sites, isLoading, error } = useQuery<Site[]>({
    queryKey: ['/api/sites'],
  });

  const filteredAndSortedSites = useMemo(() => {
    if (!sites) return [];

    let filtered = sites.filter(site => {
      // Text search
      const matchesSearch = searchQuery === "" || 
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "All" || site.category === selectedCategory;

      // Price filter
      const price = parseFloat(site.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      // Rating filter
      const rating = parseFloat(site.rating || "0");
      const matchesRating = rating >= minRating;

      // Availability filter
      const hasAvailability = site.availableTimeSlots?.some(slot => slot.available > 0) || false;
      const matchesAvailability = availabilityFilter === "all" || 
        (availabilityFilter === "available" && hasAvailability) ||
        (availabilityFilter === "soldout" && !hasAvailability);

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesAvailability;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "rating":
          return parseFloat(b.rating || "0") - parseFloat(a.rating || "0");
        case "availability":
          const aAvailable = a.availableTimeSlots?.reduce((sum, slot) => sum + slot.available, 0) || 0;
          const bAvailable = b.availableTimeSlots?.reduce((sum, slot) => sum + slot.available, 0) || 0;
          return bAvailable - aAvailable;
        default:
          return 0;
      }
    });

    return filtered;
  }, [sites, searchQuery, selectedCategory, priceRange, minRating, sortBy, availabilityFilter]);

  const handleBookSite = (site: Site) => {
    setSelectedSite(site);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedSite(null);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceRange([0, 100]);
    setMinRating(0);
    setSortBy("name");
    setAvailabilityFilter("all");
  };

  const activeFiltersCount = [
    searchQuery !== "",
    selectedCategory !== "All",
    priceRange[0] !== 0 || priceRange[1] !== 100,
    minRating !== 0,
    availabilityFilter !== "all"
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-heritage-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-heritage-800 mb-2">
              Search Historical Sites
            </h1>
            <p className="text-heritage-600">
              Discover and book visits to archaeological wonders and historical landmarks
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-heritage-600 text-white">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:col-span-1`}>
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-heritage-800 flex items-center">
                    <Filter className="mr-2 h-5 w-5" />
                    Filters
                  </CardTitle>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-heritage-600 hover:text-heritage-700"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search" className="block text-sm font-medium text-heritage-700 mb-2">
                    Search
                  </Label>
                  <div className="relative">
                    <Input
                      id="search"
                      placeholder="Site name, location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-3 h-4 w-4 text-heritage-400" />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label className="block text-sm font-medium text-heritage-700 mb-2">
                    Category
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="block text-sm font-medium text-heritage-700 mb-2">
                    Price Range (${priceRange[0]} - ${priceRange[1]})
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-heritage-500 mt-1">
                    <span>$0</span>
                    <span>$100+</span>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <Label className="block text-sm font-medium text-heritage-700 mb-2">
                    Minimum Rating ({minRating} stars)
                  </Label>
                  <Slider
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                    max={5}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-heritage-500 mt-1">
                    <span>0 ⭐</span>
                    <span>5 ⭐</span>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <Label className="block text-sm font-medium text-heritage-700 mb-2">
                    Availability
                  </Label>
                  <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sites</SelectItem>
                      <SelectItem value="available">Available Now</SelectItem>
                      <SelectItem value="soldout">Sold Out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-heritage-600">
                {isLoading ? (
                  <Skeleton className="h-5 w-32" />
                ) : (
                  `${filteredAndSortedSites.length} sites found`
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="sort" className="text-sm text-heritage-700">
                  Sort by:
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-red-600">Failed to load sites. Please try again later.</p>
                </CardContent>
              </Card>
            ) : filteredAndSortedSites.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="mx-auto h-12 w-12 text-heritage-400 mb-4" />
                  <h3 className="text-lg font-semibold text-heritage-800 mb-2">
                    No sites found
                  </h3>
                  <p className="text-heritage-600 mb-4">
                    Try adjusting your filters or search terms to find more results.
                  </p>
                  <Button onClick={clearFilters} className="bg-heritage-600 text-white hover:bg-heritage-700">
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedSites.map((site) => (
                  <SiteCard
                    key={site.id}
                    site={site}
                    onBookNow={handleBookSite}
                  />
                ))}
              </div>
            )}

            {/* Load More Button (for future pagination) */}
            {filteredAndSortedSites.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-heritage-600 text-sm">
                  Showing all {filteredAndSortedSites.length} results
                </p>
              </div>
            )}
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