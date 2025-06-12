import { Card, CardContent } from "@/components/ui/card";
import { 
  CalendarCheck, 
  MapPin, 
  Globe, 
  Smartphone, 
  Shield, 
  Headphones 
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Real-time Availability",
    description: "Live capacity tracking ensures you get accurate availability and avoid disappointment."
  },
  {
    icon: MapPin,
    title: "Interactive Site Maps",
    description: "Navigate historical sites with detailed interactive maps and virtual tour previews."
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Experience sites in your preferred language with comprehensive multilingual support."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Seamless booking experience optimized for all devices, from smartphones to desktop."
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Bank-level security with multiple payment options including cards, PayPal, and digital wallets."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist with bookings, changes, and travel planning."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-heritage-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-heritage-800 mb-4">
            Why Choose HeriTix?
          </h2>
          <p className="text-lg text-heritage-600 max-w-2xl mx-auto">
            Experience history with modern convenience and comprehensive features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-heritage-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-heritage-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-heritage-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
