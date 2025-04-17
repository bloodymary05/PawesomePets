
import { useState, useEffect } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, CheckCircle, Phone, Mail } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitConsultation } from "@/services/supabaseClient";
import { useToast } from "@/hooks/use-toast";

// Consultation form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  petType: z.string().min(1, { message: "Please select a pet type" }),
  consultationType: z.string().min(1, { message: "Please select a consultation type" }),
  preferredDate: z.date({ required_error: "Please select a date" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Consultation = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      petType: "",
      consultationType: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting consultation:", data);
      
      await submitConsultation({
        name: data.name,
        email: data.email,
        phone: data.phone,
        pet_type: data.petType,
        consultation_type: data.consultationType,
        preferred_date: data.preferredDate.toISOString(),
        message: data.message,
      });
      
      setIsSubmitted(true);
      toast({
        title: "Consultation Request Submitted",
        description: "We'll contact you shortly to confirm your appointment.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error submitting consultation:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your consultation request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pet types
  const petTypes = [
    "Dog", "Cat", "Bird", "Rabbit", "Hamster", "Guinea Pig", 
    "Ferret", "Reptile", "Fish", "Other"
  ];

  // Consultation types
  const consultationTypes = [
    "General Checkup", "Vaccination", "Dental Care", "Spay/Neuter", 
    "Illness", "Injury", "Behavioral Issue", "Nutrition Consultation", 
    "Senior Pet Care", "Other"
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-center text-2xl">Request Received</CardTitle>
            <CardDescription className="text-center">
              Thank you for scheduling a consultation.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6">
              We've received your consultation request. A member of our team will contact you soon to confirm your appointment.
            </p>
            <Button onClick={() => window.location.href = "/"} className="w-full">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
            Schedule a <span className="text-pet-purple">Vet Consultation</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book an appointment with one of our experienced veterinarians for your pet's health needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Request an Appointment</CardTitle>
                <CardDescription>
                  Fill out the form below to schedule a consultation with one of our veterinarians.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="petType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pet Type</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              >
                                <option value="">Select pet type</option>
                                {petTypes.map((type) => (
                                  <option key={type} value={type.toLowerCase()}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="consultationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Consultation Type</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="">Select consultation type</option>
                              {consultationTypes.map((type) => (
                                <option key={type} value={type.toLowerCase()}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Preferred Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || 
                                  date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Schedule up to 2 months in advance
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please share any relevant details about your pet's condition or specific concerns." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Schedule Consultation"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hours of Operation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-1 text-pet-purple" />
                      Emergency services available 24/7
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <div className="bg-pet-purple/20 p-1 rounded-full mr-2 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-pet-purple" />
                    </div>
                    <span>Confirmation call within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-pet-purple/20 p-1 rounded-full mr-2 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-pet-purple" />
                    </div>
                    <span>Arrive 15 minutes before your appointment</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-pet-purple/20 p-1 rounded-full mr-2 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-pet-purple" />
                    </div>
                    <span>Bring any previous medical records</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-pet-purple/20 p-1 rounded-full mr-2 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-pet-purple" />
                    </div>
                    <span>Keep your pet in a carrier or on a leash</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-pet-purple" />
                    (555) 123-4567
                  </p>
                  <p className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-pet-purple" />
                    contact@pawfinder.com
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = "/vets"}>
                  View Our Veterinarians
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
