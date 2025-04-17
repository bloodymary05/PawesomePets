
import { Calendar, CheckCircle, FileText, Heart, HomeIcon, Search } from "lucide-react";

const AdoptionSteps = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-pet-purple" />,
      title: "Browse Available Pets",
      description: "Search through our database of available pets looking for their forever home."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-pet-purple" />,
      title: "Find Your Match",
      description: "Identify a pet that matches your lifestyle, preferences, and home environment."
    },
    {
      icon: <FileText className="h-10 w-10 text-pet-purple" />,
      title: "Submit Application",
      description: "Fill out our adoption application with your details and information about your home."
    },
    {
      icon: <Calendar className="h-10 w-10 text-pet-purple" />,
      title: "Schedule a Meet & Greet",
      description: "Visit your potential new family member to ensure it's a good match for both of you."
    },
    {
      icon: <HomeIcon className="h-10 w-10 text-pet-purple" />,
      title: "Home Check",
      description: "We'll visit your home to ensure it's a safe and suitable environment for your new pet."
    },
    {
      icon: <Heart className="h-10 w-10 text-pet-purple" />,
      title: "Welcome Home",
      description: "Complete the adoption process and welcome your new pet to their forever home."
    }
  ];

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Adoption Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've made adopting a pet from our shelters as simple as possible. Follow these steps to find your perfect companion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4 bg-pet-green/50 inline-flex items-center justify-center w-16 h-16 rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <div className="mt-4 flex items-center">
                <span className="bg-pet-purple text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block h-0.5 bg-pet-purple/20 flex-grow ml-4"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdoptionSteps;
