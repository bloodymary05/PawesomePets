
import { Clock, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const VolunteeringSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Volunteer activity 1 */}
              <div className="bg-pet-green/10 p-6 rounded-xl">
                <div className="text-pet-purple mb-4">
                  <Heart className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold mb-2">Animal Care</h4>
                <p className="text-gray-600">
                  Help with daily care activities for our shelter animals including feeding, walking, and socialization.
                </p>
              </div>

              {/* Volunteer activity 2 */}
              <div className="bg-pet-blue/10 p-6 rounded-xl">
                <div className="text-pet-purple mb-4">
                  <Users className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold mb-2">Event Support</h4>
                <p className="text-gray-600">
                  Join us at adoption events, fundraisers, and community outreach programs to help find homes for pets.
                </p>
              </div>

              {/* Volunteer activity 3 */}
              <div className="bg-pet-yellow/10 p-6 rounded-xl">
                <div className="text-pet-purple mb-4">
                  <Clock className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold mb-2">Administrative Help</h4>
                <p className="text-gray-600">
                  Assist with paperwork, answering phones, and helping visitors navigate the adoption process.
                </p>
              </div>

              {/* Volunteer activity 4 */}
              <div className="bg-pet-pink/10 p-6 rounded-xl">
                <div className="text-pet-purple mb-4">
                  <Heart className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold mb-2">Foster Program</h4>
                <p className="text-gray-600">
                  Open your home temporarily to animals who need special care before they're ready for adoption.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:pl-12 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Make a Difference by Volunteering</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our volunteers are the heart of our organization. Join our team and help create better lives for pets waiting for their forever homes. No matter your skills or availability, we have opportunities for you to make a meaningful impact.
            </p>
            <Link to="/volunteer">
              <Button size="lg" className="bg-pet-purple hover:bg-pet-purple-dark">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteeringSection;
