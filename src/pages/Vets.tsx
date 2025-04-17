
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Calendar, Star, Search, Stethoscope } from "lucide-react";
import { Vet } from "@/types";
import { fetchVets } from "@/services/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

const Vets = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Use React Query for fetching vets data
  const { data: vets = [], isLoading, error } = useQuery({
    queryKey: ['vets'],
    queryFn: fetchVets
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching vets:", error);
      toast({
        title: "Error",
        description: "Failed to load veterinarians. Please try again.",
        variant: "destructive"
      });
    }
  }, [error, toast]);
  
  // Get unique specialties for filter
  const specialties = Array.from(new Set(vets.map(vet => vet.specialty)));
  
  const filteredVets = vets.filter(vet => {
    const matchesSearch = 
      vet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      vet.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.state.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSpecialty = !selectedSpecialty || vet.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pet-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading veterinarians...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
            Meet Our <span className="text-pet-purple">Veterinary Team</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Our network of experienced veterinarians provides exceptional care for pets through all stages of their lives.
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, city, or state..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-64">
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedSpecialty || ""}
                onChange={(e) => setSelectedSpecialty(e.target.value || null)}
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Vets */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Veterinarians</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVets.slice(0, 3).map((vet) => (
              <Card key={vet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={vet.imageUrl} 
                    alt={vet.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{vet.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Stethoscope className="h-3.5 w-3.5 mr-1 text-pet-purple" />
                    {vet.specialty}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-600 text-sm">{vet.city}, {vet.state}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-600 text-sm">{vet.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-600 text-sm">{vet.email}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = "/consultation"}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Vets Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All Veterinarians</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVets.map((vet) => (
                    <TableRow key={vet.id}>
                      <TableCell className="font-medium">{vet.name}</TableCell>
                      <TableCell>{vet.specialty}</TableCell>
                      <TableCell>{vet.city}, {vet.state}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-600 text-sm hidden md:inline">{vet.email}</span>
                          <span className="text-gray-600 text-sm md:hidden">Email</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => window.location.href = "/consultation"}>
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Schedule</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        
        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Services</h2>
            <div className="space-y-4">
              {[
                { title: "Wellness Exams", desc: "Comprehensive health assessments for pets of all ages" },
                { title: "Vaccinations", desc: "Core and lifestyle vaccines to prevent common diseases" },
                { title: "Dental Care", desc: "Professional cleaning and oral health maintenance" },
                { title: "Surgery", desc: "Both routine and complex surgical procedures" },
                { title: "Emergency Care", desc: "Urgent medical attention when your pet needs it most" },
                { title: "Nutrition Counseling", desc: "Personalized diet plans for optimal pet health" }
              ].map((service, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-pet-green/20 p-2 rounded-full mr-3 mt-1">
                    <Star className="h-4 w-4 text-pet-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Why Choose Our Vets?</h2>
            <div className="bg-pet-purple/10 rounded-lg p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-pet-purple" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Experienced Professionals:</strong> Our veterinarians have years of specialized training and experience.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-pet-purple" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Compassionate Care:</strong> We treat every pet as if they were our own, with gentle handling and empathy.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-pet-purple" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>State-of-the-Art Facilities:</strong> Our clinics are equipped with advanced diagnostic and treatment technology.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-pet-purple" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Continuing Education:</strong> Our team stays current with the latest advancements in veterinary medicine.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-pet-purple" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Client Education:</strong> We empower pet owners with the knowledge to make informed decisions about their pet's health.
                  </p>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Button className="w-full sm:w-auto" onClick={() => window.location.href = "/consultation"}>
                  Find a Vet Near You
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Emergency Information */}
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <div className="bg-red-100 p-3 rounded-full">
                <Phone className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-700 mb-2">Emergency Veterinary Services</h3>
              <p className="text-gray-700 mb-4">
                For after-hours emergencies, please call our 24/7 emergency line. Our on-call veterinarians are available to provide guidance or arrange emergency care.
              </p>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-red-500" />
                <span className="font-bold text-lg">(555) 911-PETS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vets;
