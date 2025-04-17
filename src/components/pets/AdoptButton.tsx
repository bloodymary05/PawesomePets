
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Pet } from "@/types";

interface AdoptButtonProps {
  pet: Pet;
  className?: string;
}

const AdoptButton = ({ pet, className = "" }: AdoptButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAdoptClick = async () => {
    setIsLoading(true);

    try {
      // Check if user is authenticated
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to begin the adoption process.",
          variant: "destructive"
        });
        navigate("/login", { state: { redirectTo: `/pets/${pet.type}/${pet.id}/adopt` } });
        return;
      }

      // Navigate to adoption form if user is authenticated
      navigate(`/pets/${pet.type}/${pet.id}/adopt`);
    } catch (err) {
      console.error("Error checking authentication:", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={`bg-pet-green hover:bg-pet-green-dark flex items-center gap-2 ${className}`}
      disabled={isLoading || pet.status !== "available"}
      onClick={handleAdoptClick}
    >
      <PawPrint className="h-4 w-4" />
      {isLoading ? "Loading..." : pet.status === "available" ? "Adopt Me!" : "Already Pending"}
    </Button>
  );
};

export default AdoptButton;
