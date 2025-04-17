import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PawPrint } from "lucide-react";
import PetCard from "@/components/pets/PetCard";
import PetFilters from "@/components/pets/PetFilters";
import { Pet, PetType } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Define FilterOptions interface
interface FilterOptions {
  gender?: "male" | "female";
  age?: "baby" | "young" | "adult" | "senior";
  status?: "available" | "pending" | "adopted";
}

const Pets = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { type } = useParams<{ type: string }>();
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Filter states
  const [filters, setFilters] = useState<FilterOptions>({
    gender: undefined,
    age: undefined,
    status: undefined,
  });
  
  // Search term
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        console.log("Fetching pets with type:", type);
        
        let query = supabase
          .from("pet_profiles")
          .select("*");
          
        // Filter by pet type if provided in URL
        if (type) {
          const singleType = type.endsWith('s') ? type.slice(0, -1) : type;
          query = query.eq("type", singleType);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error("Error fetching pets:", error);
          toast({
            title: "Error",
            description: "Failed to load pets. Please try again later.",
            variant: "destructive"
          });
          return;
        }
        
        console.log("Fetched pets data:", data);
        
        if (!data || data.length === 0) {
          console.log("No pets found");
          setPets([]);
          setFilteredPets([]);
          setLoading(false);
          return;
        }
        
        // Transform data to match the Pet interface with proper type casting
        const petData: Pet[] = data.map(pet => ({
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
        
        console.log("Transformed pet data:", petData);
        setPets(petData);
        setFilteredPets(petData);
      } catch (error) {
        console.error("Error in fetchPets:", error);
        toast({
          title: "Error",
          description: "Something went wrong while loading the pets.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPets();
  }, [type, toast]);
  
  // Apply filters when they change
  useEffect(() => {
    if (!pets.length) return;
    
    const filtered = pets.filter(pet => {
      // Apply gender filter
      if (filters.gender && pet.gender !== filters.gender) {
        return false;
      }
      
      // Apply age filter
      if (filters.age) {
        if (filters.age === "baby" && pet.age >= 1) return false;
        if (filters.age === "young" && (pet.age < 1 || pet.age > 3)) return false;
        if (filters.age === "adult" && (pet.age < 3 || pet.age > 8)) return false;
        if (filters.age === "senior" && pet.age <= 8) return false;
      }
      
      // Apply status filter
      if (filters.status && pet.status !== filters.status) {
        return false;
      }
      
      // Apply search term
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          pet.name.toLowerCase().includes(searchTermLower) ||
          pet.breed.toLowerCase().includes(searchTermLower) ||
          pet.description.toLowerCase().includes(searchTermLower)
        );
      }
      
      return true;
    });
    
    setFilteredPets(filtered);
  }, [pets, filters, searchTerm]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      gender: undefined,
      age: undefined,
      status: undefined,
    });
    setSearchTerm("");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
            <>Find Your <span className="text-pet-purple">Perfect</span> Companion</>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our available pets looking for their forever homes. Each one has a unique personality and lots of love to give.
          </p>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <PetFilters 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              onResetFilters={resetFilters} 
              petType={type}
            />
          </div>
          
          {/* Pet Listings */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-pulse flex flex-col items-center">
                  <PawPrint className="h-12 w-12 text-gray-300" />
                  <p className="text-gray-500 mt-4">Loading pets...</p>
                </div>
              </div>
            ) : filteredPets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredPets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow">
                <div className="mb-4">
                  <PawPrint className="h-12 w-12 text-gray-300 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No pets found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any pets matching your criteria. Try adjusting your filters.
                </p>
                <button 
                  onClick={resetFilters}
                  className="bg-pet-purple hover:bg-pet-purple-dark text-white px-4 py-2 rounded"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Adoption Info */}
        <div className="bg-pet-purple/10 rounded-lg p-8 mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Adoption Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We want to ensure every pet finds the right home. Here's how our adoption process works.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-pet-purple/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pet-purple font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Browse & Apply</h3>
              <p className="text-gray-600">Find a pet you connect with and complete our adoption application form.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-pet-purple/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pet-purple font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Meet & Greet</h3>
              <p className="text-gray-600">Schedule a time to meet your potential new pet and see if it's a good match.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-pet-purple/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pet-purple font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Welcome Home</h3>
              <p className="text-gray-600">Complete the adoption paperwork and welcome your new family member home!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pets;
