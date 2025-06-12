import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle,
  Search,
  CreditCard,
  Calendar,
  MapPin,
  Users
} from "lucide-react";

const faqData = [
  {
    category: "Booking",
    questions: [
      {
        question: "How do I book tickets for multiple sites?",
        answer: "You can book tickets for each site individually through our platform. Simply select your desired site, choose your date and time, and complete the booking process. For multiple sites, repeat this process for each location."
      },
      {
        question: "Can I modify or cancel my booking?",
        answer: "Yes, you can modify or cancel your booking up to 24 hours before your visit date. Contact our support team or use the booking management feature with your booking reference number."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and select digital wallets. All payments are processed securely through bank-level encryption."
      }
    ]
  },
  {
    category: "Tickets",
    questions: [
      {
        question: "Do I need to print my tickets?",
        answer: "No, digital tickets on your smartphone are accepted at all sites. You'll receive a QR code via email that can be scanned at the entrance."
      },
      {
        question: "Are there group discounts available?",
        answer: "Yes, groups of 10 or more people are eligible for special discounts. Contact our group booking team for customized pricing and arrangements."
      },
      {
        question: "What is included with my ticket?",
        answer: "Standard tickets include site access during your selected time slot. Optional add-ons like audio guides, VR experiences, and guided tours can be purchased during booking."
      }
    ]
  },
  {
    category: "Site Information",
    questions: [
      {
        question: "What should I bring to the site?",
        answer: "Bring comfortable walking shoes, sun protection, water, and your mobile device with the digital ticket. Some sites may have specific requirements which will be mentioned in your booking confirmation."
      },
      {
        question: "Are the sites accessible for people with disabilities?",
        answer: "Most sites offer accessibility features, but availability varies by location. Check the site details page or contact us for specific accessibility information before booking."
      },
      {
        question: "Can I take photos at the sites?",
        answer: "Photography policies vary by site. Most archaeological sites allow personal photography, but flash photography and commercial photography may be restricted. Check site-specific guidelines in your booking confirmation."
      }
    ]
  }
];

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7 Available",
    action: "Start Chat"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "+1 (555) 123-4567",
    availability: "Mon-Sun 6AM-10PM EST",
    action: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@tick-it.com",
    availability: "Response within 4 hours",
    action: "Send Email"
  }
];

export default function SupportPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    bookingId: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Our support team will get back to you within 4 hours.",
    });
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      bookingId: ""
    });
  };

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-heritage-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-heritage-800 mb-4">
            Support Center
          </h1>
          <p className="text-lg text-heritage-600">
            We're here to help with your historical site visits
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {supportChannels.map((channel, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <channel.icon className="mx-auto h-12 w-12 text-heritage-600 mb-4" />
                <h3 className="text-lg font-semibold text-heritage-800 mb-2">
                  {channel.title}
                </h3>
                <p className="text-heritage-600 mb-2">{channel.description}</p>
                <Badge variant="secondary" className="mb-4">
                  {channel.availability}
                </Badge>
                <Button className="w-full bg-heritage-600 text-white hover:bg-heritage-700">
                  {channel.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <div className="flex items-center mb-6">
              <HelpCircle className="mr-3 h-6 w-6 text-heritage-600" />
              <h2 className="text-2xl font-serif font-bold text-heritage-800">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-heritage-400" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-6">
              {filteredFAQs.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="text-heritage-800 flex items-center">
                      {category.category === "Booking" && <Calendar className="mr-2 h-5 w-5" />}
                      {category.category === "Tickets" && <CreditCard className="mr-2 h-5 w-5" />}
                      {category.category === "Site Information" && <MapPin className="mr-2 h-5 w-5" />}
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-heritage-600">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFAQs.length === 0 && searchQuery && (
              <Card>
                <CardContent className="p-8 text-center">
                  <HelpCircle className="mx-auto h-12 w-12 text-heritage-400 mb-4" />
                  <h3 className="text-lg font-semibold text-heritage-800 mb-2">
                    No results found
                  </h3>
                  <p className="text-heritage-600">
                    Try different keywords or contact our support team directly.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Form */}
          <div>
            <div className="flex items-center mb-6">
              <Mail className="mr-3 h-6 w-6 text-heritage-600" />
              <h2 className="text-2xl font-serif font-bold text-heritage-800">
                Contact Us
              </h2>
            </div>

            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-heritage-700 mb-1">
                        Name *
                      </label>
                      <Input
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-heritage-700 mb-1">
                        Email *
                      </label>
                      <Input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heritage-700 mb-1">
                      Booking ID (Optional)
                    </label>
                    <Input
                      value={contactForm.bookingId}
                      onChange={(e) => setContactForm(prev => ({ ...prev, bookingId: e.target.value }))}
                      placeholder="Enter your booking reference number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heritage-700 mb-1">
                      Subject *
                    </label>
                    <Input
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heritage-700 mb-1">
                      Message *
                    </label>
                    <Textarea
                      required
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Please provide details about your inquiry or issue..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-heritage-600 text-white hover:bg-heritage-700"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-heritage-100 rounded-lg">
                  <div className="flex items-center text-heritage-700">
                    <Clock className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">
                      Expected response time: 4 hours or less
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Help Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-heritage-800 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Quick Help
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-heritage-200 rounded-lg hover:bg-heritage-50 transition-colors">
                <Calendar className="mx-auto h-8 w-8 text-heritage-600 mb-2" />
                <h4 className="font-medium text-heritage-800">Booking Guide</h4>
                <p className="text-sm text-heritage-600">Step-by-step booking process</p>
              </div>
              <div className="text-center p-4 border border-heritage-200 rounded-lg hover:bg-heritage-50 transition-colors">
                <CreditCard className="mx-auto h-8 w-8 text-heritage-600 mb-2" />
                <h4 className="font-medium text-heritage-800">Payment Issues</h4>
                <p className="text-sm text-heritage-600">Resolve payment problems</p>
              </div>
              <div className="text-center p-4 border border-heritage-200 rounded-lg hover:bg-heritage-50 transition-colors">
                <MapPin className="mx-auto h-8 w-8 text-heritage-600 mb-2" />
                <h4 className="font-medium text-heritage-800">Site Information</h4>
                <p className="text-sm text-heritage-600">Location and visit details</p>
              </div>
              <div className="text-center p-4 border border-heritage-200 rounded-lg hover:bg-heritage-50 transition-colors">
                <Phone className="mx-auto h-8 w-8 text-heritage-600 mb-2" />
                <h4 className="font-medium text-heritage-800">Emergency Contact</h4>
                <p className="text-sm text-heritage-600">Urgent assistance needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}