
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, PawPrint, Search, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData]=useState(null)
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(()=>{

    const user = sessionStorage.getItem("user")
    if(user != null)
    {
      setUserData(user)
    }

  },[])
  
  function handleLogOut() {
    sessionStorage.clear()
    window.location.href="/"
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <PawPrint className="h-8 w-8 text-pet-purple" />
            <span className="ml-2 text-xl font-display font-semibold">Pawsome Pets</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`hover:text-pet-purple transition-colors ${isActive('/') ? 'text-pet-purple font-medium' : ''}`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center hover:text-pet-purple transition-colors">
              <Link
                to="/pets"
                className="flex items-center hover:text-pet-purple transition-colors"
                >
                Adopt
              </Link>
              </button>
            </div>
            <Link 
              to="/about" 
              className={`hover:text-pet-purple transition-colors ${isActive('/about') ? 'text-pet-purple font-medium' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/success-stories" 
              className={`hover:text-pet-purple transition-colors ${isActive('/success-stories') ? 'text-pet-purple font-medium' : ''}`}
            >
              Success Stories
            </Link>
            <Link 
              to="/vets" 
              className={`hover:text-pet-purple transition-colors ${isActive('/vets') ? 'text-pet-purple font-medium' : ''}`}
            >
              Vets
            </Link>
            <Link 
              to="/consultation" 
              className={`hover:text-pet-purple transition-colors ${isActive('/consultation') ? 'text-pet-purple font-medium' : ''}`}
            >
              Consultation
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/donate">
              <Button className="btn-secondary">
                Donate
              </Button>
            </Link>
            {
              !userData &&  <Link to="/login">
              <Button className="btn-primary">
                Sign In
              </Button>
            </Link>
            }
            {
              userData &&  
              <Button className="btn-primary" onClick={handleLogOut}> 
                Sign Out
              </Button>
            }
           
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-gray-700 hover:text-pet-purple"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`py-2 ${isActive('/') ? 'text-pet-purple font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="border-b border-gray-100 my-2"></div>
              <Link 
                to="/pets" 
                className="py-2 font-medium text-gray-600 hover:text-pet-purple"
                onClick={() => setIsMenuOpen(false)}
                >
                Adopt
                </Link>
              <div className="border-b border-gray-100 my-2"></div>
              <Link 
                to="/about" 
                className={`py-2 ${isActive('/about') ? 'text-pet-purple font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/success-stories" 
                className={`py-2 ${isActive('/success-stories') ? 'text-pet-purple font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Success Stories
              </Link>
              <Link 
                to="/vets" 
                className={`py-2 ${isActive('/vets') ? 'text-pet-purple font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Vets
              </Link>
              <Link 
                to="/consultation" 
                className={`py-2 ${isActive('/consultation') ? 'text-pet-purple font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Consultation
              </Link>
              <Link 
                to="/donate" 
                className={`py-2 ${isActive('/donate') ? 'text-pet-purple font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Donate
              </Link>
              <div className="border-b border-gray-100 my-2"></div>
              <div className="flex space-x-4">
                <Link 
                  to="/login" 
                  className="flex-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full">Sign In</Button>
                </Link>
                <Link 
                  to="/signup" 
                  className="flex-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
