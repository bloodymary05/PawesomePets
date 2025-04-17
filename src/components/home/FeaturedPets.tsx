
import { Button } from "@/components/ui/button";
import { Pet, PetType } from "@/types";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PetCard from "../pets/PetCard";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FeaturedPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching featured pets");
        
        // First try to get featured pets
        const { data: featuredData, error: featuredError } = await supabase
          .from("pet_profiles")
          .select("*")
          .eq("featured", true)
          .eq("status", "available")
          .limit(3);
          
        if (featuredError) {
          console.error("Error fetching featured pets:", featuredError);
          throw featuredError;
        }
        
        console.log("Featured pets data:", featuredData);
        
        let petsToShow = featuredData || [];
        
        // If we don't have enough featured pets, supplement with other available ones
        if (petsToShow.length < 3) {
          console.log("Not enough featured pets, fetching additional available pets");
          const { data: additionalData, error: additionalError } = await supabase
            .from("pet_profiles")
            .select("*")
            .eq("status", "available")
            .not("id", "in", `(${petsToShow.map(p => p.id).join(',')})`)
            .limit(3 - petsToShow.length);
            
          if (additionalError) {
            console.error("Error fetching additional pets:", additionalError);
          } else if (additionalData) {
            console.log("Additional pets data:", additionalData);
            petsToShow = [...petsToShow, ...additionalData];
          }
        }
        
        if (petsToShow.length === 0) {
          console.log("No pets found");
          return;
        }
        
        // Transform to match our Pet interface
        const transformedPets: Pet[] = petsToShow.map(pet => ({
          id: pet.id,
          name: pet.name,
          type: pet.type as PetType,
          breed: pet.breed,
          age: pet.age,
          gender: pet.gender as "male" | "female",
          size: pet.size as "small" | "medium" | "large" | undefined,
          color: pet.color,
          description: pet.description,
          imageUrl: pet.image_url,
          shelterId: pet.shelter_id,
          status: pet.status as "available" | "pending" | "adopted",
          arrivalDate: pet.arrival_date,
          featured: pet.featured,
          medicalHistory: pet.medical_history,
          likes: pet.likes,
          dislikes: pet.dislikes,
          specialNeeds: pet.special_needs,
          specialNeedsDetails: pet.special_needs_details
        }));
        
        console.log("Transformed pet data:", transformedPets);
        setPets(transformedPets);
      } catch (error) {
        console.error("Error in fetchFeaturedPets:", error);
        toast({
          title: "Error",
          description: "Failed to load featured pets. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPets();
  }, [toast]);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Featured Pets</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading featured pets...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse">
              <div className="h-64 w-64 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!pets || pets.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Featured Pets</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No featured pets available at the moment. Check back soon!
            </p>
          </div>
          <div className="mt-12 text-center">
            <Link to="/pets">
              <Button className="btn-primary inline-flex items-center">
                View All Pets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Featured Pets</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These adorable companions are waiting to find their forever homes. Each one has a unique personality and lots of love to give.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} featured />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/pets">
            <Button className="btn-primary inline-flex items-center">
              View All Pets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;
