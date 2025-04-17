
import { Button } from "@/components/ui/button";
import { SuccessStory, PetType } from "@/types";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SuccessStories = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 3; // Display 3 stories by default
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching success stories for home page");
        
        const { data, error } = await supabase
          .from('success_stories')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);
          
        if (error) {
          console.error("Error fetching success stories:", error);
          throw error;
        }
        
        console.log("Fetched success stories for home page:", data);
        
        if (!data || data.length === 0) {
          console.log("No success stories found");
          return;
        }
        
        // Transform to match our SuccessStory interface
        const successStories: SuccessStory[] = data.map(story => ({
          id: story.id,
          petName: story.pet_name,
          petType: story.pet_type as PetType,
          ownerName: story.owner_name,
          adoptionDate: story.adoption_date,
          story: story.story,
          imageUrl: story.image_url || "/placeholder.svg"
        }));
        
        console.log("Transformed success stories:", successStories);
        setStories(successStories);
      } catch (error) {
        console.error("Error in fetchSuccessStories:", error);
        toast({
          title: "Error",
          description: "Failed to load success stories. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSuccessStories();
  }, [toast]);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-pet-purple/5 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Adoption Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading stories...
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

  if (!stories || stories.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-pet-purple/5 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Adoption Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No success stories available yet.
            </p>
          </div>
          <div className="mt-12 text-center">
            <Link to="/success-stories">
              <Button className="btn-primary inline-flex items-center">
                Share Your Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-pet-purple/5 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Adoption Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Heartwarming tales of pets finding their forever homes and the families whose lives they've changed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={story.imageUrl} 
                  alt={`${story.petName} with ${story.ownerName}`} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <Quote className="h-6 w-6 text-pet-purple mr-2 flex-shrink-0" />
                  <p className="text-gray-700 italic line-clamp-3">{story.story}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">{story.petName}</h3>
                    <p className="text-sm text-gray-600">Adopted by {story.ownerName}</p>
                  </div>
                  <Link to="/success-stories">
                    <Button variant="ghost" size="sm" className="text-pet-purple hover:text-pet-purple-dark hover:bg-pet-green">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/success-stories">
            <Button className="btn-primary inline-flex items-center">
              View All Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
