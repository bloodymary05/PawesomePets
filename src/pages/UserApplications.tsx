
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  PawPrint,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: string;
  pet_id: string;
  status: string;
  application_date: string;
  approval_date: string | null;
  rejection_reason: string | null;
  pet: {
    name: string;
    type: string;
    breed: string;
    image_url: string;
  };
}

const UserApplications = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to view your applications.",
          variant: "destructive"
        });
        navigate("/login", { state: { redirectTo: "/my-applications" } });
        return;
      }
      
      fetchApplications(user.id);
    };
    
    checkUser();
  }, [navigate, toast]);

  const fetchApplications = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("adoption_applications")
        .select(`
          id,
          pet_id,
          status,
          application_date,
          approval_date,
          rejection_reason,
          pet_profiles:pet_id (
            name,
            type, 
            breed,
            image_url
          )
        `)
        .eq("user_id", userId)
        .order("application_date", { ascending: false });

      if (error) {
        throw error;
      }

      // Transform to format we need
      const formattedApplications = data.map(app => ({
        id: app.id,
        pet_id: app.pet_id,
        status: app.status,
        application_date: app.application_date,
        approval_date: app.approval_date,
        rejection_reason: app.rejection_reason,
        pet: {
          name: app.pet_profiles?.name || "Unknown",
          type: app.pet_profiles?.type || "Unknown",
          breed: app.pet_profiles?.breed || "Unknown",
          image_url: app.pet_profiles?.image_url || "/placeholder.svg"
        }
      }));

      setApplications(formattedApplications);
    } catch (err) {
      console.error("Error fetching applications:", err);
      toast({
        title: "Error",
        description: "Failed to load your applications. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-10 w-10 text-green-500" />;
      case "rejected":
        return <XCircle className="h-10 w-10 text-red-500" />;
      default:
        return <Clock className="h-10 w-10 text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            My Adoption Applications
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track the status of your pet adoption applications and learn about next steps in the process.
          </p>
        </div>

        {applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <Card key={application.id} className="overflow-hidden">
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={application.pet.image_url}
                    alt={application.pet.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(application.status)}
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{application.pet.name}</CardTitle>
                      <CardDescription>
                        {application.pet.breed} • {application.pet.type}
                      </CardDescription>
                    </div>
                    <div className="mt-1">{getStatusIcon(application.status)}</div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Application Date:</p>
                      <p className="font-medium">
                        {new Date(application.application_date).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {application.approval_date && (
                      <div>
                        <p className="text-sm text-gray-500">Approval Date:</p>
                        <p className="font-medium">
                          {new Date(application.approval_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    
                    {application.rejection_reason && (
                      <div>
                        <p className="text-sm text-gray-500">Reason:</p>
                        <p className="font-medium">{application.rejection_reason}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t bg-gray-50">
                  {application.status === "pending" ? (
                    <div className="w-full text-center text-gray-600">
                      <Clock className="h-4 w-4 inline-block mr-1" /> 
                      Awaiting shelter review
                    </div>
                  ) : application.status === "approved" ? (
                    <Link to={`/pets/${application.pet.type}/${application.pet_id}`} className="w-full">
                      <Button className="w-full bg-pet-purple">
                        Next Steps <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/pets" className="w-full">
                      <Button variant="outline" className="w-full">
                        Browse More Pets <PawPrint className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center max-w-xl mx-auto">
            <ClipboardList className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Applications Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't submitted any pet adoption applications. 
              Start your journey to pet parenthood today!
            </p>
            <Link to="/pets">
              <Button className="bg-pet-purple hover:bg-pet-purple-dark">
                Find Your Perfect Pet
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserApplications;
