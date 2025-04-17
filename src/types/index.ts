

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
}

export type PetType = "cat" | "dog" | "hamster" | "turtle" | "rabbit" | "bird" | "fish" | "reptile" | "ferret" | "guinea pig";

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  gender: "male" | "female";
  size?: "small" | "medium" | "large";
  color?: string;
  description: string;
  imageUrl: string;
  shelterId: string;
  status: "available" | "pending" | "adopted";
  arrivalDate: string; // ISO string
  featured?: boolean;
  medicalHistory?: string;
  likes?: string[];
  dislikes?: string[];
  specialNeeds?: boolean;
  specialNeedsDetails?: string;
}

export interface Shelter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
}

export interface Vet {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  imageUrl?: string;
  city: string;
  state: string;
}

export interface Adoption {
  id: string;
  petId: string;
  userId: string;
  status: "pending" | "approved" | "rejected";
  applicationDate: string; // ISO string
  approvalDate?: string; // ISO string
}

export interface SuccessStory {
  id: string;
  petName: string;
  petType: PetType;
  ownerName: string;
  adoptionDate: string; // ISO string
  story: string;
  imageUrl: string;
}

export interface Consultation {
  id: string;
  userId: string;
  petId?: string;
  date: string; // ISO string
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

export interface Donation {
  id: string;
  userId?: string; // Optional for anonymous donations
  amount: number;
  date: string; // ISO string
  message?: string;
  type: "one-time" | "recurring";
}

export interface PetFilters {
  type?: PetType;
  breed?: string;
  age?: "baby" | "young" | "adult" | "senior";
  gender?: "male" | "female";
  status?: "available" | "pending" | "adopted";
  shelterId?: string;
}

// New interface for FilterOptions
export interface FilterOptions {
  gender?: "male" | "female";
  age?: "baby" | "young" | "adult" | "senior";
  status?: "available" | "pending" | "adopted";
}

// Volunteering related interfaces
export interface VolunteerApplication {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  availability: string[];
  interests: string[];
  experience?: string;
  message?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  petType: string;
  consultationType: string;
  preferredDate: string;
  message?: string;
  status: "pending" | "scheduled" | "completed";
  createdAt: string;
}
