
import HeroSection from "@/components/home/HeroSection";
import FeaturedPets from "@/components/home/FeaturedPets";
import AdoptionSteps from "@/components/home/AdoptionSteps";
import SuccessStories from "@/components/home/SuccessStories";
import VolunteeringSection from "@/components/home/VolunteeringSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HandHeart, Heart, PawPrint, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <FeaturedPets />
      
      <AdoptionSteps />

      <section className="py-16 bg-pet-purple/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're dedicated to matching pets with their perfect forever homes through our careful adoption process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="mx-auto mb-4 bg-pet-green/50 inline-flex items-center justify-center w-16 h-16 rounded-full">
                <PawPrint className="h-8 w-8 text-pet-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Extensive Selection</h3>
              <p className="text-gray-600">Browse through hundreds of pets from various shelters to find your perfect match.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="mx-auto mb-4 bg-pet-pink/50 inline-flex items-center justify-center w-16 h-16 rounded-full">
                <Heart className="h-8 w-8 text-pet-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ethical Practices</h3>
              <p className="text-gray-600">Our adoption process ensures pets go to loving, suitable homes where they'll thrive.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="mx-auto mb-4 bg-pet-yellow/50 inline-flex items-center justify-center w-16 h-16 rounded-full">
                <Users className="h-8 w-8 text-pet-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Our team of animal experts provides guidance through every step of the adoption journey.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="mx-auto mb-4 bg-pet-blue/50 inline-flex items-center justify-center w-16 h-16 rounded-full">
                <HandHeart className="h-8 w-8 text-pet-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ongoing Resources</h3>
              <p className="text-gray-600">Access to training resources, vet recommendations, and community support after adoption.</p>
            </div>
          </div>
        </div>
      </section>

      <SuccessStories />
      
      <VolunteeringSection />

      <section className="py-16 bg-gradient-to-r from-pet-purple to-pet-purple-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Pet?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Start your journey to pet parenthood today and change a life forever.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/pets">
              <Button className="bg-white text-pet-purple hover:bg-gray-100 text-base px-8 py-6">
                Browse All Pets
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-base px-8 py-6">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
