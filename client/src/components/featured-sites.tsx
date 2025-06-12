import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SiteCard from "./site-card";
import { SITE_CATEGORIES } from "@/lib/constants";
import type { Site } from "@shared/schema";

interface FeaturedSitesProps {
  onBookSite: (site: Site) => void;
}

export default function FeaturedSites({ onBookSite }: FeaturedSitesProps) {
  const [activeCategory, setActiveCategory] = useState("All Sites");

  const { data: sites, isLoading, error } = useQuery<Site[]>({
    queryKey: ['/api/sites', activeCategory === "All Sites" ? "" : activeCategory],
  });

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Failed to load sites. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-heritage-800 mb-4">
            Featured Historical Sites
          </h2>
          <p className="text-lg text-heritage-600 max-w-2xl mx-auto">
            Explore our most popular archaeological and historical destinations
          </p>
        </div>
        
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {SITE_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={
                activeCategory === category
                  ? "bg-heritage-600 text-white hover:bg-heritage-700"
                  : "bg-heritage-100 text-heritage-700 hover:bg-heritage-200"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Sites Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sites?.map((site) => (
                <SiteCard
                  key={site.id}
                  site={site}
                  onBookNow={onBookSite}
                />
              ))}
            </div>
            
            {sites && sites.length === 0 && (
              <div className="text-center py-12">
                <p className="text-heritage-600 text-lg">
                  No sites found in this category.
                </p>
              </div>
            )}
          </>
        )}
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-heritage-700 text-white hover:bg-heritage-800">
            View All Sites
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
