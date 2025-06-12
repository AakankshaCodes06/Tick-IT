import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { LANGUAGES } from "@/lib/constants";

const footerSections = [
  {
    title: "Destinations",
    links: [
      "Archaeological Sites",
      "Historical Monuments",
      "Museums",
      "Ancient Ruins",
      "UNESCO Sites"
    ]
  },
  {
    title: "Support",
    links: [
      "Help Center",
      "Booking Guide",
      "Cancellation Policy",
      "Contact Us",
      "Travel Safety"
    ]
  },
  {
    title: "Company",
    links: [
      "About Us",
      "Careers",
      "Press",
      "Privacy Policy",
      "Terms of Service"
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-heritage-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">HeriTix</h3>
            <p className="text-heritage-200 mb-4">
              Connecting travelers with the world's most significant archaeological and historical sites through seamless digital experiences.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-heritage-300 hover:text-white p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-heritage-300 hover:text-white p-2">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-heritage-300 hover:text-white p-2">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-heritage-300 hover:text-white p-2">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Button
                      variant="ghost"
                      className="text-heritage-300 hover:text-white p-0 h-auto font-normal justify-start"
                    >
                      {link}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-heritage-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-heritage-300 text-sm">
            © 2024 HeriTix. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-heritage-300 text-sm">Available in:</span>
            <Select defaultValue="en">
              <SelectTrigger className="w-32 bg-heritage-700 border-heritage-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </footer>
  );
}
