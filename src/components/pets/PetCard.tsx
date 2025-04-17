
import { Pet, Shelter } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PetCardProps {
  pet: Pet;
  featured?: boolean;
}

const PetCard = ({ pet, featured = false }: PetCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [shelter, setShelter] = useState<Shelter | null>(null);
  
  useEffect(() => {
    const fetchShelter = async () => {
      if (!pet.shelterId) return;
      
      try {
        console.log("Fetching shelter for pet:", pet.name, "with shelterId:", pet.shelterId);
        const { data, error } = await supabase
          .from('shelters')
          .select('*')
          .eq('id', pet.shelterId)
          .single();
          
        if (error) {
          console.error('Error fetching shelter:', error);
          return;
        }
        
        console.log("Shelter data for pet:", data);
        
        setShelter({
          id: data.id,
          name: data.name,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zip_code,
          phone: data.phone,
          email: data.email,
          website: data.website
        });
      } catch (error) {
        console.error('Error in fetchShelter:', error);
      }
    };
    
    fetchShelter();
  }, [pet.shelterId]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "adopted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className={`pet-card h-full flex flex-col ${featured ? 'transform hover:-translate-y-2 transition-transform' : ''}`}>
      <div className="relative h-56 overflow-hidden">
        <Link to={`/pets/${pet.type}/${pet.id}`} state={{ pet }}>
          <img 
            src={pet.imageUrl || "/placeholder.svg"} 
            alt={pet.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
        </Link>
        <button 
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-pet-pink transition-colors"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
        </button>
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className={`${getStatusColor(pet.status)} capitalize`}>
            {pet.status}
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex-grow pt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{pet.name}</h3>
            <p className="text-gray-600">{pet.breed}</p>
          </div>
          <Badge variant="outline" className="bg-pet-purple/10 border-pet-purple/20 text-pet-purple">
            {pet.age} {pet.age === 1 ? 'year' : 'years'}
          </Badge>
        </div>
        
        <div className="mt-3">
          <p className="text-gray-700 line-clamp-2">{pet.description}</p>
        </div>
        
        {shelter && (
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{shelter.city}, {shelter.state}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link to={`/pets/${pet.type}/${pet.id}/adopt`} state={{ pet }} className="w-full">
          <Button className="w-full bg-pet-purple hover:bg-pet-purple-dark">
            {pet.status === 'available' ? 'Adopt Me' : 'View Details'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
