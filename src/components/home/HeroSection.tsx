
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PawPrint, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-white to-pet-green/30 py-16 lg:py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzliODdmNTIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxwYXRoIGQ9Ik0xMiwwbDIuNDUsOS4xMkwyNCwxMmwtOS41NSwyLjg4TDEyLDI0bC0yLjQ1LTkuMTJMMCwxMmw5LjU1LTIuODhaIi8+PC9zdmc+')] bg-repeat opacity-10"></div>
      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800">
              Find Your Perfect <span className="text-pet-purple-dark">Furry Friend</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Our mission is to connect loving homes with pets in need. Browse our adorable adoptable pets and start your journey to pet parenthood today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/pets">
                <Button className="btn-primary text-base px-8 py-6 flex gap-2 items-center">
                  <PawPrint className="h-5 w-5" />
                  Find a Pet
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="btn-secondary text-base px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-12">
              <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                <Link to="/pets/cats?age=baby" className="text-sm bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-pet-purple hover:text-pet-purple transition-colors">
                  Kittens
                </Link>
                <Link to="/pets/dogs?age=young" className="text-sm bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-pet-purple hover:text-pet-purple transition-colors">
                  Young Dogs
                </Link>
                <Link to="/pets/cats?breed=domestic" className="text-sm bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-pet-purple hover:text-pet-purple transition-colors">
                  Domestic Cats
                </Link>
                <Link to="/pets/rabbits" className="text-sm bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-pet-purple hover:text-pet-purple transition-colors">
                  Rabbits
                </Link>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl animate-float">
              <img 
                src="https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                alt="Happy dog and owner" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-fade-in">
              <div className="flex items-center">
                <div className="bg-pet-green rounded-full p-2">
                  <PawPrint className="h-6 w-6 text-pet-purple" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">Over 200+</p>
                  <p className="text-xs text-gray-500">Pets adopted this month</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg animate-fade-in delay-200">
              <div className="flex items-center">
                <div className="bg-pet-yellow rounded-full p-2">
                  <Search className="h-6 w-6 text-pet-purple" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">15 Shelters</p>
                  <p className="text-xs text-gray-500">Partner network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
