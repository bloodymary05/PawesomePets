import { supabase } from "@/integrations/supabase/client";
import { Pet, Shelter, PetType, SuccessStory, Vet } from "@/types";

// Pet related functions
export const fetchPets = async () => {
  try {
    const { data, error } = await supabase
      .from("pet_profiles")
      .select("*");

    if (error) throw error;
    
    // Transform to match our Pet interface with proper type casting
    const pets: Pet[] = data.map(pet => ({
      id: pet.id,
      name: pet.name,
      type: pet.type as PetType,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender as "male" | "female",
      size: pet.size as "small" | "medium" | "large" | undefined,
      color: pet.color,
      description: pet.description,
      imageUrl: pet.image_url,
      shelterId: pet.shelter_id,
      status: pet.status as "available" | "pending" | "adopted",
      arrivalDate: pet.arrival_date,
      featured: pet.featured,
      medicalHistory: pet.medical_history,
      likes: pet.likes,
      dislikes: pet.dislikes,
      specialNeeds: pet.special_needs,
      specialNeedsDetails: pet.special_needs_details
    }));
    
    return pets;
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error;
  }
};

export const fetchPetById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("pet_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    
    // Transform to match our Pet interface with proper type casting
    const pet: Pet = {
      id: data.id,
      name: data.name,
      type: data.type as PetType,
      breed: data.breed,
      age: data.age,
      gender: data.gender as "male" | "female",
      size: data.size as "small" | "medium" | "large" | undefined,
      color: data.color,
      description: data.description,
      imageUrl: data.image_url,
      shelterId: data.shelter_id,
      status: data.status as "available" | "pending" | "adopted",
      arrivalDate: data.arrival_date,
      featured: data.featured,
      medicalHistory: data.medical_history,
      likes: data.likes,
      dislikes: data.dislikes,
      specialNeeds: data.special_needs,
      specialNeedsDetails: data.special_needs_details
    };
    
    return pet;
  } catch (error) {
    console.error("Error fetching pet:", error);
    throw error;
  }
};

export const fetchFeaturedPets = async () => {
  try {
    const { data, error } = await supabase
      .from("pet_profiles")
      .select("*")
      .eq("featured", true)
      .eq("status", "available")
      .limit(3);

    if (error) throw error;
    
    // If we don't have enough featured pets, get some available ones
    let petsToShow = [...data];
    if (petsToShow.length < 3) {
      const { data: additionalData, error: additionalError } = await supabase
        .from("pet_profiles")
        .select("*")
        .eq("status", "available")
        .limit(3 - petsToShow.length);
        
      if (!additionalError && additionalData) {
        petsToShow = [...petsToShow, ...additionalData];
      }
    }
    
    // Transform to match our Pet interface with proper type casting
    const pets: Pet[] = petsToShow.map(pet => ({
      id: pet.id,
      name: pet.name,
      type: pet.type as PetType,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender as "male" | "female",
      size: pet.size as "small" | "medium" | "large" | undefined,
      color: pet.color,
      description: pet.description,
      imageUrl: pet.image_url,
      shelterId: pet.shelter_id,
      status: pet.status as "available" | "pending" | "adopted",
      arrivalDate: pet.arrival_date,
      featured: pet.featured,
      medicalHistory: pet.medical_history,
      likes: pet.likes,
      dislikes: pet.dislikes,
      specialNeeds: pet.special_needs,
      specialNeedsDetails: pet.special_needs_details
    }));
    
    return pets;
  } catch (error) {
    console.error("Error fetching featured pets:", error);
    throw error;
  }
};

// Shelter related functions
export const fetchShelters = async () => {
  try {
    const { data, error } = await supabase
      .from("shelters")
      .select("*");

    if (error) throw error;
    
    // Transform to match our Shelter interface
    const shelters: Shelter[] = data.map(shelter => ({
      id: shelter.id,
      name: shelter.name,
      address: shelter.address,
      city: shelter.city,
      state: shelter.state,
      zipCode: shelter.zip_code,
      phone: shelter.phone,
      email: shelter.email,
      website: shelter.website
    }));
    
    return shelters;
  } catch (error) {
    console.error("Error fetching shelters:", error);
    throw error;
  }
};

export const fetchShelterById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("shelters")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    
    // Transform to match our Shelter interface
    const shelter: Shelter = {
      id: data.id,
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zip_code,
      phone: data.phone,
      email: data.email,
      website: data.website
    };
    
    return shelter;
  } catch (error) {
    console.error("Error fetching shelter:", error);
    throw error;
  }
};

// Success stories functions
export const fetchSuccessStories = async () => {
  try {
    const { data, error } = await supabase
      .from("success_stories")
      .select("*");

    if (error) throw error;
    
    // Transform to match our SuccessStory interface with proper type casting
    const stories: SuccessStory[] = data.map(story => ({
      id: story.id,
      petName: story.pet_name,
      petType: story.pet_type as PetType,
      ownerName: story.owner_name,
      adoptionDate: story.adoption_date,
      story: story.story,
      imageUrl: story.image_url || "/placeholder.svg"
    }));
    
    return stories;
  } catch (error) {
    console.error("Error fetching success stories:", error);
    throw error;
  }
};

export const submitSuccessStory = async (storyData: {
  pet_name: string;
  pet_type: string;
  owner_name: string;
  story: string;
  image_url?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("success_stories")
      .insert([{
        ...storyData,
        adoption_date: new Date().toISOString(),
      }])
      .select();

    if (error) {
      console.error("Error submitting story:", error);
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error("Error submitting success story:", error);
    throw error;
  }
};

// Veterinarian related functions
export const fetchVets = async () => {
  try {
    const { data, error } = await supabase
      .from("veterinarians")
      .select("*");

    if (error) throw error;
    
    // Transform to match our Vet interface
    const vets: Vet[] = data.map(vet => ({
      id: vet.id,
      name: vet.name,
      specialty: vet.specialty,
      phone: vet.phone,
      email: vet.email,
      imageUrl: vet.image_url,
      city: vet.city,
      state: vet.state
    }));
    
    console.log("Fetched vets:", vets);
    return vets;
  } catch (error) {
    console.error("Error fetching vets:", error);
    throw error;
  }
};

// Consultation related functions
export const submitConsultation = async (consultationData: {
  name: string;
  email: string;
  phone: string;
  pet_type: string;
  consultation_type: string;
  preferred_date: string;
  message?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("consultations")
      .insert([consultationData])
      .select();

    if (error) throw error;
    
    return data[0];
  } catch (error) {
    console.error("Error submitting consultation:", error);
    throw error;
  }
};

// Volunteering related functions
export const submitVolunteerApplication = async (volunteerData: {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  availability: string[];
  interests: string[];
  experience?: string;
  message?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("volunteering")
      .insert([volunteerData])
      .select();

    if (error) throw error;
    
    return data[0];
  } catch (error) {
    console.error("Error submitting volunteer application:", error);
    throw error;
  }
};

export const fetchUserVolunteerApplications = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("volunteering")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error fetching volunteer applications:", error);
    throw error;
  }
};
