import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Site } from "@shared/schema";

interface SiteCardProps {
  site: Site;
  onBookNow: (site: Site) => void;
}

export default function SiteCard({ site, onBookNow }: SiteCardProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <img 
        src={site.imageUrl} 
        alt={site.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="bg-heritage-100 text-heritage-700">
            {site.category}
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
            <span className="text-sm font-medium">{site.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-heritage-800 mb-2">
          {site.name}
        </h3>
        
        <p className="text-heritage-600 mb-4">
          {site.location}
        </p>
        
        <p className="text-sm text-heritage-600 mb-4 line-clamp-2">
          {site.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-heritage-700">
              ${site.price}
            </span>
            <span className="text-sm text-heritage-500">/person</span>
          </div>
          <Button 
            onClick={() => onBookNow(site)}
            className="bg-heritage-600 text-white hover:bg-heritage-700 transition-colors"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
