
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PetFilters as PetFiltersType } from "@/types";
import { FilterX, Search } from "lucide-react";
import { useState } from "react";

interface PetFiltersProps {
  filters: PetFiltersType;
  onFilterChange: (newFilters: PetFiltersType) => void;
  onResetFilters: () => void;
  petType?: string;
}

const PetFilters = ({ filters, onFilterChange, onResetFilters, petType }: PetFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // You would typically call a handler here, but we're removing form validation
  };

  const handleSelectChange = (key: keyof PetFiltersType, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value === "all" ? undefined : value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Filter Pets</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onResetFilters}
          className="text-gray-500 hover:text-pet-purple hover:bg-pet-green/30 text-sm gap-1"
        >
          <FilterX className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="space-y-5">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium">Search</Label>
          <div className="relative mt-1">
            <Input 
              id="search" 
              placeholder="Search by name or breed" 
              className="pl-9"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

          <div>
            <Label htmlFor="type" className="text-sm font-medium">Pet Type</Label>
            <Select
              value={filters.type || "all"}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger id="type" className="mt-1">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="cat">Cats</SelectItem>
                <SelectItem value="dog">Dogs</SelectItem>
                <SelectItem value="rabbit">Rabbits</SelectItem>
                <SelectItem value="hamster">Hamsters</SelectItem>
                <SelectItem value="bird">Birds</SelectItem>
                <SelectItem value="turtle">Turtles</SelectItem>
              </SelectContent>
            </Select>
          </div>

        {/* Status */}
        <div>
          <Label htmlFor="status" className="text-sm font-medium">Status</Label>
          <Select
            value={filters.status || "all"}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger id="status" className="mt-1">
              <SelectValue placeholder="Any Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="adopted">Adopted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age Group */}
        <div>
          <Label className="text-sm font-medium">Age</Label>
          <RadioGroup 
            className="mt-1 space-y-1"
            value={filters.age || "all"}
            onValueChange={(value) => handleSelectChange("age", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-age" />
              <Label htmlFor="all-age" className="cursor-pointer">Any Age</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="baby" id="baby" />
              <Label htmlFor="baby" className="cursor-pointer">Baby</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="young" id="young" />
              <Label htmlFor="young" className="cursor-pointer">Young</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="adult" id="adult" />
              <Label htmlFor="adult" className="cursor-pointer">Adult</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="senior" id="senior" />
              <Label htmlFor="senior" className="cursor-pointer">Senior</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Gender */}
        <div>
          <Label className="text-sm font-medium">Gender</Label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Button
              type="button"
              variant={filters.gender === "male" ? "default" : "outline"}
              className={filters.gender === "male" ? "bg-pet-purple hover:bg-pet-purple-dark" : ""}
              onClick={() => handleSelectChange("gender", filters.gender === "male" ? "all" : "male")}
            >
              Male
            </Button>
            <Button
              type="button"
              variant={filters.gender === "female" ? "default" : "outline"}
              className={filters.gender === "female" ? "bg-pet-purple hover:bg-pet-purple-dark" : ""}
              onClick={() => handleSelectChange("gender", filters.gender === "female" ? "all" : "female")}
            >
              Female
            </Button>
          </div>
        </div>

        {/* Apply button - typically used for mobile filter drawers */}
        <div className="pt-2">
          <Button className="w-full bg-pet-purple hover:bg-pet-purple-dark">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetFilters;
