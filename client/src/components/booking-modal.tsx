import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Minus, Plus, Shield, CreditCard, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { TICKET_TYPES, ADD_ONS } from "@/lib/constants";
import type { Site } from "@shared/schema";
import type { BookingFormData } from "@/types";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().optional(),
  visitDate: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  adultTickets: z.number().min(0),
  childTickets: z.number().min(0),
  studentTickets: z.number().min(0),
  addOns: z.array(z.string()),
  cardNumber: z.string().min(1, "Card number is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  cvv: z.string().min(3, "CVV must be at least 3 digits"),
  cardholderName: z.string().min(1, "Cardholder name is required"),
});

interface BookingModalProps {
  site: Site | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ site, isOpen, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [ticketCounts, setTicketCounts] = useState({
    adult: 2,
    child: 1,
    student: 0
  });
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["vr-experience"]);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      visitDate: "",
      timeSlot: "",
      adultTickets: 2,
      childTickets: 1,
      studentTickets: 0,
      addOns: ["vr-experience"],
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Your tickets have been booked successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/sites'] });
      onClose();
      resetForm();
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedDate(undefined);
    setSelectedTimeSlot("");
    setTicketCounts({ adult: 2, child: 1, student: 0 });
    setSelectedAddOns(["vr-experience"]);
    form.reset();
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const calculateTotal = () => {
    if (!site) return 0;
    
    const basePrice = parseFloat(site.price);
    const adultTotal = ticketCounts.adult * basePrice;
    const childTotal = ticketCounts.child * 25;
    const studentTotal = ticketCounts.student * 35;
    
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = ADD_ONS.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    
    const serviceFee = 5;
    return adultTotal + childTotal + studentTotal + addOnTotal + serviceFee;
  };

  const updateTicketCount = (type: keyof typeof ticketCounts, increment: boolean) => {
    setTicketCounts(prev => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    if (!site || !selectedDate) return;

    const bookingData: BookingFormData = {
      siteId: site.id,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      visitDate: selectedDate.toISOString().split('T')[0],
      timeSlot: selectedTimeSlot,
      adultTickets: ticketCounts.adult,
      childTickets: ticketCounts.child,
      studentTickets: ticketCounts.student,
      addOns: selectedAddOns,
      totalAmount: calculateTotal().toString(),
    };

    createBookingMutation.mutate(bookingData);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step <= currentStep 
                ? 'bg-heritage-600 text-white' 
                : 'bg-heritage-200 text-heritage-500'
            }`}>
              {step}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              step <= currentStep ? 'text-heritage-700' : 'text-heritage-500'
            }`}>
              {step === 1 ? 'Date & Time' : step === 2 ? 'Tickets' : 'Payment'}
            </span>
            {step < 3 && <div className="w-12 h-0.5 bg-heritage-200 ml-4" />}
          </div>
        ))}
      </div>
    </div>
  );

  if (!site) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-heritage-800">
            Book Your Visit
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="p-6">
          {renderStepIndicator()}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Step 1: Date & Time Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calendar */}
                    <div>
                      <h3 className="text-lg font-semibold text-heritage-800 mb-4">Select Date</h3>
                      <Card>
                        <CardContent className="p-4">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="rounded-md border"
                          />
                        </CardContent>
                      </Card>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <h3 className="text-lg font-semibold text-heritage-800 mb-4">Available Time Slots</h3>
                      <div className="space-y-3">
                        {site.availableTimeSlots.map((slot, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                              selectedTimeSlot === slot.time
                                ? 'border-2 border-heritage-600 bg-heritage-50'
                                : slot.available === 0
                                ? 'border-heritage-200 opacity-50 cursor-not-allowed'
                                : 'border-heritage-200 hover:border-heritage-400'
                            }`}
                            onClick={() => slot.available > 0 && setSelectedTimeSlot(slot.time)}
                          >
                            <div>
                              <div className="font-medium">{slot.time}</div>
                              <div className="text-sm text-heritage-600">
                                {slot.available > 0 ? `${slot.available} spots available` : 'Sold out'}
                              </div>
                            </div>
                            <div className="text-heritage-600 font-semibold">${slot.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={!selectedDate || !selectedTimeSlot}
                      className="bg-heritage-600 text-white hover:bg-heritage-700"
                    >
                      Continue to Tickets →
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Ticket Selection */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-heritage-800">Select Ticket Types</h3>
                  
                  {/* Ticket Types */}
                  <div className="space-y-4">
                    {TICKET_TYPES.map((ticket) => (
                      <div key={ticket.type} className="flex items-center justify-between p-4 border border-heritage-200 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-heritage-800 capitalize">
                            {ticket.type} {ticket.type === 'adult' ? '(18+)' : ticket.type === 'child' ? '(6-17)' : ''}
                          </h4>
                          <p className="text-sm text-heritage-600">{ticket.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-heritage-700">${ticket.price}.00</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateTicketCount(ticket.type, false)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {ticketCounts[ticket.type]}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateTicketCount(ticket.type, true)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add-ons */}
                  <div>
                    <h4 className="font-semibold text-heritage-800 mb-4">Enhance Your Experience</h4>
                    <div className="space-y-3">
                      {ADD_ONS.map((addOn) => (
                        <div key={addOn.id} className="flex items-center space-x-3 p-3 border border-heritage-200 rounded-lg">
                          <Checkbox
                            checked={selectedAddOns.includes(addOn.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedAddOns(prev => [...prev, addOn.id]);
                              } else {
                                setSelectedAddOns(prev => prev.filter(id => id !== addOn.id));
                              }
                            }}
                          />
                          <div className="flex-1">
                            <div className="font-medium">{addOn.name}</div>
                            <div className="text-sm text-heritage-600">{addOn.description}</div>
                          </div>
                          <span className="font-semibold text-heritage-700">+${addOn.price}.00</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <Card className="bg-heritage-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-heritage-800 mb-3">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        {ticketCounts.adult > 0 && (
                          <div className="flex justify-between">
                            <span>Adult tickets ({ticketCounts.adult}) × ${site.price}</span>
                            <span>${(ticketCounts.adult * parseFloat(site.price)).toFixed(2)}</span>
                          </div>
                        )}
                        {ticketCounts.child > 0 && (
                          <div className="flex justify-between">
                            <span>Child tickets ({ticketCounts.child}) × $25.00</span>
                            <span>${(ticketCounts.child * 25).toFixed(2)}</span>
                          </div>
                        )}
                        {ticketCounts.student > 0 && (
                          <div className="flex justify-between">
                            <span>Student tickets ({ticketCounts.student}) × $35.00</span>
                            <span>${(ticketCounts.student * 35).toFixed(2)}</span>
                          </div>
                        )}
                        {selectedAddOns.map(addOnId => {
                          const addOn = ADD_ONS.find(a => a.id === addOnId);
                          return addOn ? (
                            <div key={addOnId} className="flex justify-between">
                              <span>{addOn.name}</span>
                              <span>${addOn.price}.00</span>
                            </div>
                          ) : null;
                        })}
                        <div className="flex justify-between">
                          <span>Service fee</span>
                          <span>$5.00</span>
                        </div>
                        <div className="border-t border-heritage-200 pt-2 flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="bg-heritage-200 text-heritage-700 hover:bg-heritage-300"
                    >
                      ← Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="bg-heritage-600 text-white hover:bg-heritage-700"
                    >
                      Continue to Payment →
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-heritage-800">Payment Details</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Payment Form */}
                    <div className="space-y-6">
                      {/* Contact Information */}
                      <div>
                        <h4 className="font-semibold text-heritage-800 mb-4">Contact Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="customerPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="customerEmail"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h4 className="font-semibold text-heritage-800 mb-4">Payment Method</h4>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="1234 5678 9012 3456" {...field} />
                                    <CreditCard className="absolute right-3 top-3 h-4 w-4 text-heritage-400" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>MM/YY</FormLabel>
                                  <FormControl>
                                    <Input placeholder="12/25" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="cardholderName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <Card className="bg-heritage-50">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-heritage-800 mb-4">Booking Summary</h4>
                          <div className="space-y-3 text-sm">
                            <div className="font-medium">{site.name}</div>
                            <div className="text-heritage-600">
                              {selectedDate?.toLocaleDateString()}
                            </div>
                            <div className="text-heritage-600">{selectedTimeSlot}</div>
                            <hr className="my-3" />
                            {ticketCounts.adult > 0 && (
                              <div className="flex justify-between">
                                <span>Adult tickets ({ticketCounts.adult})</span>
                                <span>${(ticketCounts.adult * parseFloat(site.price)).toFixed(2)}</span>
                              </div>
                            )}
                            {ticketCounts.child > 0 && (
                              <div className="flex justify-between">
                                <span>Child tickets ({ticketCounts.child})</span>
                                <span>${(ticketCounts.child * 25).toFixed(2)}</span>
                              </div>
                            )}
                            {ticketCounts.student > 0 && (
                              <div className="flex justify-between">
                                <span>Student tickets ({ticketCounts.student})</span>
                                <span>${(ticketCounts.student * 35).toFixed(2)}</span>
                              </div>
                            )}
                            {selectedAddOns.map(addOnId => {
                              const addOn = ADD_ONS.find(a => a.id === addOnId);
                              return addOn ? (
                                <div key={addOnId} className="flex justify-between">
                                  <span>{addOn.name}</span>
                                  <span>${addOn.price}.00</span>
                                </div>
                              ) : null;
                            })}
                            <div className="flex justify-between">
                              <span>Service fee</span>
                              <span>$5.00</span>
                            </div>
                            <hr className="my-3" />
                            <div className="flex justify-between font-semibold text-lg">
                              <span>Total</span>
                              <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center text-green-700 text-sm">
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Secure payment protected by SSL encryption</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="bg-heritage-200 text-heritage-700 hover:bg-heritage-300"
                    >
                      ← Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={createBookingMutation.isPending}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      {createBookingMutation.isPending ? (
                        "Processing..."
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Complete Booking
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
