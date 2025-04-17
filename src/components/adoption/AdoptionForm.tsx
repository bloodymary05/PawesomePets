
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Pet } from "@/types";

// Form validation schema
const adoptionFormSchema = z.object({
  housingType: z.string().min(1, { message: "Please select your housing type." }),
  hasYard: z.boolean().optional(),
  otherPets: z.string().optional(),
  experience: z.string().optional(),
  contactPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Please enter your address." }),
  city: z.string().min(2, { message: "Please enter your city." }),
  state: z.string().min(2, { message: "Please enter your state." }),
  zipCode: z.string().min(5, { message: "Please enter a valid zip code." }),
});

type AdoptionFormValues = z.infer<typeof adoptionFormSchema>;

interface AdoptionFormProps {
  pet: Pet;
}

const AdoptionForm = ({ pet }: AdoptionFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<AdoptionFormValues>({
    resolver: zodResolver(adoptionFormSchema),
    defaultValues: {
      housingType: "",
      hasYard: false,
      otherPets: "",
      experience: "",
      contactPhone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  
  // Form submission handler
  const onSubmitAdoption = async (values: AdoptionFormValues) => {
    try {
      setIsSubmitting(true);
      
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData.user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to submit an adoption application.",
          variant: "destructive"
        });
        navigate("/login");
        return;
      }
      
      // Submit adoption application to Supabase
      const { error } = await supabase
        .from("adoption_applications")
        .insert({
          pet_id: pet.id,
          user_id: userData.user.id,
          housing_type: values.housingType,
          has_yard: values.hasYard,
          other_pets: values.otherPets,
          experience: values.experience,
          contact_phone: values.contactPhone,
          address: values.address,
          city: values.city,
          state: values.state,
          zip_code: values.zipCode,
        });
      
      if (error) {
        console.error("Error submitting adoption application:", error);
        toast({
          title: "Submission Failed",
          description: "There was a problem submitting your application. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      // Update pet status to pending
      await supabase
        .from("pet_profiles")
        .update({ status: "pending" })
        .eq("id", pet.id);
      
      // Show success toast
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in adopting. We'll review your application shortly.",
      });
      
      // Redirect to a thank you page or pet listing
      navigate("/adoption-success");
    } catch (error) {
      console.error("Error in adoption submission:", error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-pet-purple">Adoption Application</h2>
      <p className="mb-6 text-gray-600">
        Thank you for your interest in adopting {pet.name}! Please fill out this application 
        form so we can ensure {pet.name} goes to a loving and suitable home.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitAdoption)} className="space-y-6">
          <FormField
            control={form.control}
            name="housingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Housing Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your housing type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="mobile">Mobile Home</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hasYard"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Do you have a fenced yard?</FormLabel>
                  <FormDescription>
                    This is especially important for dogs who need outdoor exercise.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="otherPets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have other pets?</FormLabel>
                <FormDescription>
                  Please list any other pets currently in your home, including type, breed, and age.
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 1 cat (5 years old), 1 dog (Golden Retriever, 3 years old)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Pet Experience</FormLabel>
                <FormDescription>
                  Tell us about your experience with pets, especially with {pet.type}s.
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Share your past experience with pets..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
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
            
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Springfield" {...field} />
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
                    <Input placeholder="IL" {...field} />
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
          
          <div className="pt-4">
            <Button type="submit" className="w-full bg-pet-purple hover:bg-pet-purple-dark" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Adoption Application"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdoptionForm;
