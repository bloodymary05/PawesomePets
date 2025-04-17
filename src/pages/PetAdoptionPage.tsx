
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AdoptionForm from "@/components/adoption/AdoptionForm";
import { Pet, PetType } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PetAdoptionPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { id, type } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        if (!id) return;
        
        setIsLoading(true);
        
        // Get the pet from Supabase
        const { data, error } = await supabase
          .from("pet_profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching pet:", error);
          toast({
            title: "Error",
            description: "Could not find the requested pet.",
            variant: "destructive"
          });
          navigate("/pets");
          return;
        }

        // Transform to match Pet interface with proper type casting
        const petData: Pet = {
          id: data.id,
          name: data.name,
          type: data.type as PetType,
          breed: data.breed,
          age: data.age,
          gender: data.gender as "male" | "female",
          size: data.size as "small" | "medium" | "large" | undefined,
          color: data.color,
          description: data.description,
          imageUrl: data.image_url,
          shelterId: data.shelter_id,
          status: data.status as "available" | "pending" | "adopted",
          arrivalDate: data.arrival_date,
          featured: data.featured,
          medicalHistory: data.medical_history,
          likes: data.likes,
          dislikes: data.dislikes,
          specialNeeds: data.special_needs,
          specialNeedsDetails: data.special_needs_details
        };

        setPet(petData);
      } catch (error) {
        console.error("Error in fetchPet:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPet();
  }, [id, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Pet Not Found</h2>
            <p className="mb-6">We couldn't find the pet you're looking for.</p>
            <Link to="/pets">
              <Button>View All Pets</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="mb-8">
          <Link to={`/pets/${type}/${id}`} className="inline-flex items-center text-pet-purple hover:text-pet-purple-dark">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {pet.name}'s Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <img 
                  src={pet.imageUrl} 
                  alt={pet.name}
                  className="w-24 h-24 rounded-full object-cover mr-4" 
                />
                <div>
                  <h2 className="text-2xl font-bold">{pet.name}</h2>
                  <p className="text-gray-600">
                    {pet.breed} • {pet.age} {pet.age === 1 ? 'year' : 'years'} old • {pet.gender === 'male' ? 'Male' : 'Female'}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{pet.description}</p>
            </div>

            <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Adoption Guidelines</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Be at least 21 years old</li>
                <li>• Provide proof of residence</li>
                <li>• Show stable income to care for the pet</li>
                <li>• Allow for a home visit if applicable</li>
                <li>• Pay adoption fees (covers vaccinations, microchipping, etc.)</li>
              </ul>
              <div className="mt-6 text-sm text-gray-600">
                <p>
                  The adoption process typically takes 1-2 weeks to complete. 
                  Our team reviews applications carefully to ensure the best match 
                  for both pets and adopters.
                </p>
              </div>
            </div>
          </div>

          <div>
            <AdoptionForm pet={pet} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetAdoptionPage;
