import { useState, useEffect } from "react";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { useForm } from "react-hook-form";
 import { z } from "zod";
 import { useToast } from "@/hooks/use-toast";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
 } from "@/components/ui/form";
 import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from "@/components/ui/select";
 import { CreditCard, DollarSign, Heart, PawPrint } from "lucide-react";
 import { createClient } from "@supabase/supabase-js";
 
 const supabase = createClient('https://izfrkbrlwmretkzjwydu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6ZnJrYnJsd21yZXRremp3eWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNjQ1OTUsImV4cCI6MjA1OTg0MDU5NX0.Wp_aL2JnWfvuY4byH819HGlfy4tRbImvbF65uDYREoc')

 const donationFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
   message: "Please enter a valid donation amount greater than 0.",
  }),
  frequency: z.enum(["one-time", "monthly", "quarterly", "annually"], {
   required_error: "Please select a donation frequency.",
  }),
  message: z.string().optional(),
 });

 type DonationFormValues = z.infer<typeof donationFormSchema>;

 const Donate = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define preset donation amounts
  const presetAmounts = [25, 50, 100, 250, 500];
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  // Initialize form with validation
  const form = useForm<DonationFormValues>({
   resolver: zodResolver(donationFormSchema),
   defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    amount: "50",
    frequency: "one-time",
    message: "",
   },
  });

  // Handle preset amount selection
  const handleAmountSelect = (amount: number) => {
   setSelectedAmount(amount);
   setCustomAmount(amount.toString());
   form.setValue("amount", amount.toString());
  };

  // Handle custom amount change
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   setCustomAmount(e.target.value);
   setSelectedAmount(null);
   form.setValue("amount", e.target.value);
  };

  // Form submission handler
  const onSubmit = async (values: DonationFormValues) => {
   setIsSubmitting(true);

   try {
    const { data, error } = await supabase
     .from('donations')
     .insert([
      {
       amount: parseFloat(values.amount),
       frequency: values.frequency === 'one-time' ? 'One-time' :
        values.frequency === 'monthly' ? 'Monthly' :
        values.frequency === 'quarterly' ? 'Monthly' : // Assuming quarterly is also monthly for your DB
        'Yearly',
       first_name: values.firstName,
       last_name: values.lastName,
       email: values.email,
       message: values.message,
      },
     ]);

    if (error) {
     console.error("Error inserting donation:", error);
     toast({
      title: "Donation Failed",
      description: "Something went wrong while processing your donation. Please try again later.",
      variant: "destructive",
     });
    } else {
     console.log("Donation data inserted:", data);
     // Show success toast
     toast({
      title: "Donation Successful",
      description: `Thank you for your ${values.frequency === "one-time" ? "" : values.frequency + " "}donation of $${values.amount}!`,
     });

     // Reset form and loading state
     form.reset();
     setSelectedAmount(null);
     setCustomAmount("");
    }
   } catch (error: any) {
    console.error("Unexpected error during donation:", error);
    toast({
     title: "Donation Failed",
     description: "An unexpected error occurred. Please try again later.",
     variant: "destructive",
    });
   } finally {
    setIsSubmitting(false);
   }
  };

  return (
   <div className="min-h-screen bg-gray-50 py-12">
    <div className="container-custom">
     {/* Hero Section */}
     <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
       Support Our <span className="text-pet-purple">Animal Rescue Mission</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
       Your generous donation helps us rescue, rehabilitate, and rehome animals in need. Every dollar makes a difference in a furry friend's life.
      </p>
     </div>

     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Donation Form */}
      <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6 md:p-8">
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
         <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>

         {/* Donation Amount Selection */}
         <div className="space-y-4">
          <FormLabel>Select Donation Amount</FormLabel>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
           {presetAmounts.map((amount) => (
            <Button
             key={amount}
             type="button"
             variant={selectedAmount === amount ? "default" : "outline"}
             className={selectedAmount === amount ? "bg-pet-purple hover:bg-pet-purple-dark" : ""}
             onClick={() => handleAmountSelect(amount)}
            >
             ${amount}
            </Button>
           ))}
          </div>

          <div className="relative mt-4">
           <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
           <Input
            placeholder="Custom Amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className="pl-10"
           />
          </div>
         </div>

         {/* Donation Frequency */}
         <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
           <FormItem>
            <FormLabel>Donation Frequency</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
             <FormControl>
              <SelectTrigger>
               <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
             </FormControl>
             <SelectContent>
              <SelectItem value="one-time">One-time</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
             </SelectContent>
            </Select>
            <FormMessage />
           </FormItem>
          )}
         />

         {/* Personal Information */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
           control={form.control}
           name="firstName"
           render={({ field }) => (
            <FormItem>
             <FormLabel>First Name</FormLabel>
             <FormControl>
              <Input placeholder="John" {...field} />
             </FormControl>
             <FormMessage />
            </FormItem>
           )}
          />

          <FormField
           control={form.control}
           name="lastName"
           render={({ field }) => (
            <FormItem>
             <FormLabel>Last Name</FormLabel>
             <FormControl>
              <Input placeholder="Doe" {...field} />
             </FormControl>
             <FormMessage />
            </FormItem>
           )}
          />
         </div>

         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
           <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
             <Input type="email" placeholder="john.doe@example.com" {...field} />
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
            <FormLabel>Message (Optional)</FormLabel>
            <FormControl>
             <Textarea
              placeholder="Share why you're supporting our cause..."
              {...field}
             />
            </FormControl>
            <FormMessage />
           </FormItem>
          )}
         />

         <Button
          type="submit"
          className="w-full bg-pet-purple hover:bg-pet-purple-dark"
          disabled={isSubmitting}
         >
          {isSubmitting ? "Processing..." : "Complete Donation"}
         </Button>
        </form>
       </Form>
      </div>

      {/* Donation Impact */}
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
       <h2 className="text-2xl font-bold mb-6">Your Impact</h2>

       <div className="space-y-6">
        <div className="flex items-start">
         <div className="bg-pet-purple/10 p-3 rounded-full mr-4">
          <PawPrint className="h-6 w-6 text-pet-purple" />
         </div>
         <div>
          <h3 className="font-medium text-lg">$25</h3>
          <p className="text-gray-600">Provides food and basic care for one rescued animal for a week</p>
         </div>
        </div>

        <div className="flex items-start">
         <div className="bg-pet-purple/10 p-3 rounded-full mr-4">
          <Heart className="h-6 w-6 text-pet-purple" />
         </div>
         <div>
          <h3 className="font-medium text-lg">$50</h3>
          <p className="text-gray-600">Covers vaccinations and preventative medications for a pet</p>
         </div>
        </div>

        <div className="flex items-start">
         <div className="bg-pet-purple/10 p-3 rounded-full mr-4">
          <CreditCard className="h-6 w-6 text-pet-purple" />
         </div>
         <div>
          <h3 className="font-medium text-lg">$100</h3>
          <p className="text-gray-600">Funds spay/neuter surgery for one animal</p>
         </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
         <h3 className="font-medium text-lg mb-2">Other Ways to Help</h3>
         <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Volunteer at our shelter locations</li>
          <li>Become a foster parent for animals</li>
          <li>Donate supplies from our wishlist</li>
          <li>Spread the word on social media</li>
         </ul>
         <Button variant="outline" className="w-full mt-4" onClick={() => window.location.href = "/volunteer"}>
          Learn More About Volunteering
         </Button>
        </div>
       </div>
      </div>
     </div>

     {/* Donation Impact Stories */}
     <div className="bg-pet-purple/10 rounded-lg p-8">
      <div className="text-center mb-8">
       <h2 className="text-2xl font-bold mb-4">How Your Donations Help</h2>
       <p className="text-gray-600 max-w-2xl mx-auto">
        Every contribution makes a real difference in the lives of animals. Here are some recent success stories made possible by generous donors like you.
       </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <img
         src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
         alt="Rescued rabbit"
         className="w-full h-48 object-cover"
        />
        <div className="p-4">
         <h3 className="font-bold text-lg">Emergency Rescue Fund</h3>
         <p className="text-gray-600 mt-1">Your donations helped us rescue 12 abandoned rabbits and provide emergency medical care.</p>
        </div>
       </div>

       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <img
         src="https://images.unsplash.com/photo-1603232644431-4353d4d06f79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
         alt="Dog getting vaccinated"
         className="w-full h-48 object-cover"
        />
        <div className="p-4">
         <h3 className="font-bold text-lg">Vaccination Program</h3>
         <p className="text-gray-600 mt-1">We were able to vaccinate over 200 pets from low-income households in our community.</p>
        </div>
       </div>

       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <img
         src="https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
         alt="Cat in shelter"
         className="w-full h-48 object-cover"
        />
        <div className="p-4">
         <h3 className="font-bold text-lg">Shelter Expansion</h3>
         <p className="text-gray-600 mt-1">We expanded our cat shelter facilities to accommodate 50% more rescued felines.</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 };

 export default Donate;
