
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pets from "./pages/Pets";
import About from "./pages/About";
import Consultation from "./pages/Consultation";
import SuccessStories from "./pages/SuccessStories";
import Vets from "./pages/Vets";
import Donate from "./pages/Donate";
import PetAdoptionPage from "./pages/PetAdoptionPage";
import AdoptionSuccess from "./pages/AdoptionSuccess";
import UserApplications from "./pages/UserApplications";
import Volunteer from "./pages/Volunteer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pets/:type" element={<Pets />} />
            <Route path="/pets/:type/:id/adopt" element={<PetAdoptionPage />} />
            <Route path="/adoption-success" element={<AdoptionSuccess />} />
            <Route path="/my-applications" element={<UserApplications />} />
            <Route path="/about" element={<About />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/vets" element={<Vets />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/volunteer" element={<Volunteer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
