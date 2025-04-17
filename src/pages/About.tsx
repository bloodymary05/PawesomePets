
import { Heart, Users, Award, GraduationCap, Handshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-pet-purple/10 to-white py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
                Our Mission to Help <span className="text-pet-purple">Every Pet</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                At PawFinder, we believe every pet deserves a loving home. Our dedicated team works tirelessly to connect animals in need with caring families, creating lifelong bonds and happier communities.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-pet-purple/10 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-pet-purple" />
                  </div>
                  <span className="ml-2 font-medium">10,000+ Adoptions</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-pet-purple/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-pet-purple" />
                  </div>
                  <span className="ml-2 font-medium">50+ Staff Members</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-pet-purple/10 p-2 rounded-full">
                    <Award className="h-5 w-5 text-pet-purple" />
                  </div>
                  <span className="ml-2 font-medium">15 Years of Service</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1601758174039-617983b8cdd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Team member with rescued dog" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -bottom-5 -left-5 bg-white p-3 rounded-lg shadow-md">
                <p className="text-pet-purple font-bold">Since 2008</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Story</h2>
            <p className="text-gray-600">
              From humble beginnings to becoming a leading pet adoption center in the region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-pet-green/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-pet-purple" />
                </div>
                <h3 className="font-bold text-xl mb-2">Our Beginnings</h3>
                <p className="text-gray-600">
                  PawFinder was founded in 2008 by a small group of animal lovers determined to make a difference in their community. What began as a small shelter with just five volunteers has grown into a comprehensive adoption center.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-pet-green/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-pet-purple" />
                </div>
                <h3 className="font-bold text-xl mb-2">Growth & Learning</h3>
                <p className="text-gray-600">
                  Throughout the years, we've expanded our services, built partnerships with veterinarians and trainers, and developed educational programs to help pet owners provide the best care possible.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-pet-green/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-pet-purple" />
                </div>
                <h3 className="font-bold text-xl mb-2">Today's Mission</h3>
                <p className="text-gray-600">
                  Today, our mission extends beyond adoptions. We advocate for animal welfare, provide resources to pet owners facing challenges, and work to create a community where all animals are treated with compassion and respect.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Meet Our Team</h2>
            <p className="text-gray-600">
              Dedicated professionals committed to animal welfare and finding forever homes for pets in need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & Director",
                bio: "With over 20 years in animal welfare, Sarah's passion drives our mission forward every day.",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              },
              {
                name: "Michael Chen",
                role: "Veterinary Coordinator",
                bio: "Michael ensures all our animals receive top-quality medical care before and after adoption.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              },
              {
                name: "Emily Rodriguez",
                role: "Adoption Specialist",
                bio: "Emily has helped match over 1,000 pets with their perfect families in her 5 years with us.",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              },
              {
                name: "James Wilson",
                role: "Community Outreach",
                bio: "James builds partnerships with local businesses and organizations to support our mission.",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="h-48 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{member.name}</h3>
                  <p className="text-pet-purple text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Learn more about our adoption process and how we help pets find loving homes.
              </p>
            </div>

            <Tabs defaultValue="adoption" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="adoption">Adoption Process</TabsTrigger>
                <TabsTrigger value="organization">Our Organization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="adoption" className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does the adoption process work?</AccordionTrigger>
                    <AccordionContent>
                      Our adoption process involves browsing available pets online, scheduling a visit to meet them in person, completing an adoption application, and if approved, finalizing the adoption with our team who will provide all necessary resources for your new pet's transition home.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What are the adoption fees?</AccordionTrigger>
                    <AccordionContent>
                      Adoption fees vary depending on the animal and typically range from $50 to $250. These fees help cover vaccinations, spay/neuter procedures, microchipping, and basic medical care the animal received while in our care.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I return a pet if it's not a good match?</AccordionTrigger>
                    <AccordionContent>
                      Yes, while we strive to make perfect matches, we understand that sometimes it doesn't work out. We accept returns within 30 days and will work with you to either address concerns or find a more suitable pet for your home.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              
              <TabsContent value="organization" className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is PawFinder a non-profit organization?</AccordionTrigger>
                    <AccordionContent>
                      Yes, PawFinder is a 501(c)(3) non-profit organization. All donations are tax-deductible, and we rely on community support to continue our mission of finding homes for pets in need.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How can I volunteer or contribute?</AccordionTrigger>
                    <AccordionContent>
                      We welcome volunteers in various capacities, from animal care and socialization to administrative support and event planning. You can apply on our website or contact our volunteer coordinator. Donations are also greatly appreciated and can be made online, by mail, or in person.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Where do your animals come from?</AccordionTrigger>
                    <AccordionContent>
                      Our animals come from a variety of sources, including owner surrenders, local animal control agencies, and other shelters that may be at capacity. We work within our network to save as many animals as possible and give them a second chance at finding a loving home.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
