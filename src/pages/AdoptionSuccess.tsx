
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint, CheckCircle, Home, CalendarCheck } from "lucide-react";

const AdoptionSuccess = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-custom max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Application Submitted Successfully!
          </h1>
          
          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-4">
              Thank you for taking the first step in providing a forever home to a pet in need. 
              Your application has been received and is being reviewed by our adoption team.
            </p>
            <p className="text-gray-600">
              We typically process applications within 2-3 business days. 
              A member of our team will contact you to discuss your application 
              and schedule a meet-and-greet with the pet.
            </p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 my-6">
            <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="bg-pet-purple/20 p-3 rounded-full mb-3">
                  <PawPrint className="h-6 w-6 text-pet-purple" />
                </div>
                <h3 className="font-medium mb-1">Application Review</h3>
                <p className="text-sm text-gray-500">Our team will review your information</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-pet-green/20 p-3 rounded-full mb-3">
                  <CalendarCheck className="h-6 w-6 text-pet-green" />
                </div>
                <h3 className="font-medium mb-1">Meet & Greet</h3>
                <p className="text-sm text-gray-500">Schedule time to meet your potential pet</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-pet-pink/20 p-3 rounded-full mb-3">
                  <Home className="h-6 w-6 text-pet-pink" />
                </div>
                <h3 className="font-medium mb-1">Bring Home</h3>
                <p className="text-sm text-gray-500">Welcome your new family member</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8">
            If you have any questions or need to provide additional information,
            please contact us at <span className="text-pet-purple font-medium">adoption@pawsomepets.com</span> 
            or call <span className="text-pet-purple font-medium">(555) 123-4567</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pets">
              <Button className="bg-pet-purple hover:bg-pet-purple-dark">
                Browse More Pets
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionSuccess;
