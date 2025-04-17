
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Calendar, User, MessageSquare } from "lucide-react";
import { SuccessStory, PetType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SuccessStories = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("view");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for submitting new story
  const [formData, setFormData] = useState({
    petName: "",
    petType: "dog" as PetType,
    ownerName: "",
    story: "",
    imageUrl: ""
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const loadStories = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching success stories");
        
        const { data, error } = await supabase
          .from('success_stories')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Error fetching success stories:", error);
          toast({
            title: "Error Loading Stories",
            description: "There was a problem loading the success stories. Please try again later.",
            variant: "destructive",
          });
          return;
        }
        
        console.log("Fetched success stories:", data);
        
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
        
        setStories(successStories);
      } catch (error) {
        console.error("Error in loadStories:", error);
        toast({
          title: "Error Loading Stories",
          description: "There was a problem loading the success stories. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'petType' ? value as PetType : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      console.log("Submitting success story:", formData);
      
      const { data, error } = await supabase
        .from("success_stories")
        .insert([{
          pet_name: formData.petName,
          pet_type: formData.petType,
          owner_name: formData.ownerName,
          story: formData.story,
          image_url: formData.imageUrl || 'https://via.placeholder.com/400x300?text=Pet+Story',
        }])
        .select();

      if (error) {
        console.error("Error submitting success story:", error);
        throw error;
      }
      
      console.log("Success story submission response:", data);
      
      // If successful, add the new story to the list
      if (data && data[0]) {
        const newStory: SuccessStory = {
          id: data[0].id,
          petName: data[0].pet_name,
          petType: data[0].pet_type as PetType,
          ownerName: data[0].owner_name,
          adoptionDate: data[0].adoption_date,
          story: data[0].story,
          imageUrl: data[0].image_url || '/placeholder.svg'
        };
        
        setStories([newStory, ...stories]);
        setFormData({
          petName: "",
          petType: "dog" as PetType,
          ownerName: "",
          story: "",
          imageUrl: ""
        });
        
        // Switch back to view tab
        setActiveTab("view");
        
        toast({
          title: "Success!",
          description: "Your story has been shared successfully.",
        });
      }
    } catch (error) {
      console.error("Error submitting success story:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
            Adoption <span className="text-pet-purple">Success Stories</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Read heartwarming stories from families who have found their perfect companions through our adoption program.
            Share your own journey and inspire others to open their homes to pets in need.
          </p>
        </div>
        
        <Tabs defaultValue="view" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="view">Read Stories</TabsTrigger>
            <TabsTrigger value="share">Share Your Story</TabsTrigger>
          </TabsList>
          <TabsContent value="view">
            {isLoading ? (
              <div className="flex justify-center my-12">
                <div className="animate-pulse">
                  <div className="h-64 w-64 rounded-full bg-gray-200"></div>
                </div>
              </div>
            ) : stories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {stories.map((story) => (
                  <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={story.imageUrl} 
                        alt={`${story.petName} with ${story.ownerName}`} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-xl">{story.petName}</h3>
                        <span className="px-3 py-1 rounded-full bg-pet-purple/10 text-pet-purple text-xs font-medium">
                          {story.petType}
                        </span>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-600 text-sm">{story.ownerName}</span>
                        <Calendar className="h-4 w-4 text-gray-500 ml-4 mr-2" />
                        <span className="text-gray-600 text-sm">
                          {new Date(story.adoptionDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div>
                        <MessageSquare className="h-4 w-4 text-gray-500 mb-2" />
                        <p className="text-gray-700 italic line-clamp-4 text-sm">
                          "{story.story}"
                        </p>
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <Button variant="ghost" size="sm" className="pl-0 text-pet-purple">
                          <Heart className="h-4 w-4 mr-2" />
                          Heartwarming
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center my-12 p-8 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-2">No Stories Yet</h3>
                <p className="text-gray-600 mb-4">Be the first to share your adoption success story!</p>
                <Button onClick={() => setActiveTab("share")}>Share Your Story</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="share">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm mt-8">
              <h3 className="font-bold text-2xl mb-6 text-center">Share Your Success Story</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="petName" className="block text-sm font-medium text-gray-700 mb-1">Pet's Name</label>
                    <Input 
                      id="petName" 
                      name="petName" 
                      value={formData.petName} 
                      onChange={handleInputChange} 
                      placeholder="What's your pet's name?" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="petType" className="block text-sm font-medium text-gray-700 mb-1">Pet Type</label>
                    <select
                      id="petType"
                      name="petType"
                      value={formData.petType}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="cat">Cat</option>
                      <option value="dog">Dog</option>
                      <option value="hamster">Hamster</option>
                      <option value="turtle">Turtle</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="bird">Bird</option>
                      <option value="fish">Fish</option>
                      <option value="reptile">Reptile</option>
                      <option value="ferret">Ferret</option>
                      <option value="guinea pig">Guinea Pig</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <Input 
                      id="ownerName" 
                      name="ownerName" 
                      value={formData.ownerName} 
                      onChange={handleInputChange} 
                      placeholder="What's your name?" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">Your Story</label>
                    <Textarea 
                      id="story" 
                      name="story" 
                      value={formData.story} 
                      onChange={handleInputChange} 
                      placeholder="Tell us about your adoption journey and life with your new pet..." 
                      className="min-h-[150px]"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                    <Input 
                      id="imageUrl" 
                      name="imageUrl" 
                      value={formData.imageUrl} 
                      onChange={handleInputChange} 
                      placeholder="https://example.com/your-image.jpg" 
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Share a photo URL of you and your pet. If left blank, we'll use a placeholder image.
                    </p>
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Your Story'}
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={() => setActiveTab("view")}>Cancel</Button>
                  </div>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuccessStories;
