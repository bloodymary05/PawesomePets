
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
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
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitVolunteerApplication } from "@/services/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Heart, HelpCircle, Clock, MapPin, CheckCircle } from "lucide-react";

// Volunteering form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Please enter your address" }),
  city: z.string().min(2, { message: "Please enter your city" }),
  state: z.string().min(2, { message: "Please enter your state" }),
  zipCode: z.string().min(5, { message: "Please enter your ZIP code" }),
  availability: z.array(z.string()).min(1, { message: "Please select at least one availability option" }),
  interests: z.array(z.string()).min(1, { message: "Please select at least one interest" }),
  experience: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Volunteer = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to apply for volunteering.",
            variant: "destructive"
          });
          navigate("/login", { state: { redirectTo: "/volunteer" } });
          return;
        }
        
        setUser(user);
      } catch (error) {
        console.error("Error checking user:", error);
        toast({
          title: "Authentication Error",
          description: "Please sign in to apply for volunteering.",
          variant: "destructive"
        });
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
  }, [navigate, toast]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      availability: [],
      interests: [],
      experience: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to apply for volunteering.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    setIsSubmitting(true);
    try {
      console.log("Submitting volunteer application:", data);
      
      await submitVolunteerApplication({
        user_id: user.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zipCode,
        availability: data.availability,
        interests: data.interests,
        experience: data.experience,
        message: data.message,
      });
      
      setIsSubmitted(true);
      toast({
        title: "Volunteer Application Submitted",
        description: "Thank you for your interest in volunteering. We'll review your application and get back to you soon.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error submitting volunteer application:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Availability options
  const availabilityOptions = [
    { id: "weekday_mornings", label: "Weekday Mornings" },
    { id: "weekday_afternoons", label: "Weekday Afternoons" },
    { id: "weekday_evenings", label: "Weekday Evenings" },
    { id: "weekend_mornings", label: "Weekend Mornings" },
    { id: "weekend_afternoons", label: "Weekend Afternoons" },
    { id: "weekend_evenings", label: "Weekend Evenings" },
  ];

  // Interest options
  const interestOptions = [
    { id: "animal_care", label: "Animal Care & Handling" },
    { id: "dog_walking", label: "Dog Walking" },
    { id: "cat_socialization", label: "Cat Socialization" },
    { id: "adoption_events", label: "Adoption Events" },
    { id: "administrative", label: "Administrative Support" },
    { id: "fundraising", label: "Fundraising" },
    { id: "photography", label: "Photography/Social Media" },
    { id: "transport", label: "Animal Transport" },
    { id: "fostering", label: "Fostering" },
    { id: "other", label: "Other" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pet-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-center text-2xl">Application Received</CardTitle>
            <CardDescription className="text-center">
              Thank you for your interest in volunteering!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6">
              We've received your volunteer application and will review it shortly. Someone from our team will contact you about the next steps in the process.
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
            Volunteer with <span className="text-pet-purple">PawFinder</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our team of dedicated volunteers who make a difference in animals' lives every day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Application</CardTitle>
                <CardDescription>
                  Please fill out the form below to apply for volunteer opportunities.
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
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="availability"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Availability</FormLabel>
                            <FormDescription>
                              Select all times you may be available to volunteer.
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {availabilityOptions.map((option) => (
                              <FormField
                                key={option.id}
                                control={form.control}
                                name="availability"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={option.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(option.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, option.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== option.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {option.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="interests"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Interests</FormLabel>
                            <FormDescription>
                              Select all volunteer activities you are interested in.
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {interestOptions.map((option) => (
                              <FormField
                                key={option.id}
                                control={form.control}
                                name="interests"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={option.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(option.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, option.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== option.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {option.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous Experience</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe any previous experience working with animals or in volunteer positions." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why You Want to Volunteer</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us why you're interested in volunteering with us and what you hope to contribute." 
                              className="min-h-[100px]"
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
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pet-purple" />
                  Make a Difference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our volunteers are the heart of our organization. By donating your time, you directly help animals in need find loving homes and improve their quality of life.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <p className="text-sm">Help socialize and exercise animals</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <p className="text-sm">Support adoption events</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <p className="text-sm">Assist with daily shelter operations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-pet-purple" />
                  Volunteer FAQ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">What are the age requirements?</h3>
                  <p className="text-sm text-gray-600">Volunteers must be at least 18 years old. Youth volunteers (14-17) can volunteer with parental consent and supervision.</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Is training provided?</h3>
                  <p className="text-sm text-gray-600">Yes, all volunteers receive training specific to their role before starting.</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">How much time do I need to commit?</h3>
                  <p className="text-sm text-gray-600">We ask for a minimum commitment of 4 hours per month for at least 3 months.</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">What happens after I apply?</h3>
                  <p className="text-sm text-gray-600">We'll contact you to schedule an orientation where you'll learn about volunteer opportunities and next steps.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-pet-purple" />
                  Volunteer Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Weekdays</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Weekends</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="pt-3 border-t mt-3">
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-pet-purple" />
                      Multiple shelter locations available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
