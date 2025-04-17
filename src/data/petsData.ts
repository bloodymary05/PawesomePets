
import { Pet, PetType, Shelter, SuccessStory, Vet } from "@/types";

export const shelters: Shelter[] = [
  {
    id: "shelter-1",
    name: "Happy Paws Rescue",
    address: "123 Main Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    phone: "(555) 123-4567",
    email: "info@happypawsrescue.org",
    website: "https://www.happypawsrescue.org"
  },
  {
    id: "shelter-2",
    name: "Second Chance Animal Sanctuary",
    address: "456 Oak Avenue",
    city: "Riverdale",
    state: "CA",
    zipCode: "90210",
    phone: "(555) 987-6543",
    email: "contact@secondchance.org",
    website: "https://www.secondchance.org"
  },
  {
    id: "shelter-3",
    name: "Furry Friends Forever",
    address: "789 Pine Road",
    city: "Lakeside",
    state: "WA",
    zipCode: "98001",
    phone: "(555) 456-7890",
    email: "adopt@furryfriendsforever.org",
    website: "https://www.furryfriendsforever.org"
  }
];

// Helper function to generate a random date in the past few months
const getRandomRecentDate = () => {
  const today = new Date();
  const monthsAgo = new Date(today);
  monthsAgo.setMonth(today.getMonth() - Math.floor(Math.random() * 4));
  return monthsAgo.toISOString();
};

export const pets: Pet[] = [
  // Cats
  {
    id: "pet-1",
    name: "Whiskers",
    type: "cat",
    breed: "Domestic Shorthair",
    age: 2,
    gender: "female",
    description: "Whiskers is a playful and affectionate cat who loves to cuddle. She gets along well with other cats and enjoys playing with toys.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    shelterId: "shelter-1",
    status: "available",
    arrivalDate: getRandomRecentDate(),
    featured: true
  },
  {
    id: "pet-2",
    name: "Shadow",
    type: "cat",
    breed: "Maine Coon",
    age: 5,
    gender: "male",
    description: "Shadow is a gentle giant with a luxurious coat. He's a bit shy at first but warms up quickly and loves to be petted.",
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    shelterId: "shelter-2",
    status: "available",
    arrivalDate: getRandomRecentDate()
  },
  {
    id: "pet-3",
    name: "Felix",
    type: "cat",
    breed: "Siamese",
    age: 3,
    gender: "male",
    description: "Felix is a vocal and intelligent Siamese who loves to 'talk' to his humans. He's curious and active, enjoying interactive toys.",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    shelterId: "shelter-3",
    status: "pending",
    arrivalDate: getRandomRecentDate()
  },

  // Dogs
  {
    id: "pet-4",
    name: "Buddy",
    type: "dog",
    breed: "Golden Retriever",
    age: 4,
    gender: "male",
    description: "Buddy is a friendly and energetic Golden Retriever who loves to play fetch. He's great with kids and other dogs, making him an ideal family pet.",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    shelterId: "shelter-1",
    status: "available",
    arrivalDate: getRandomRecentDate(),
    featured: true
  },
  {
    id: "pet-5",
    name: "Daisy",
    type: "dog",
    breed: "Beagle",
    age: 2,
    gender: "female",
    description: "Daisy is a sweet beagle with a gentle temperament. She loves long walks and has a keen nose for adventure!",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    shelterId: "shelter-2",
    status: "available",
    arrivalDate: getRandomRecentDate()
  },
  {
    id: "pet-6",
    name: "Max",
    type: "dog",
    breed: "German Shepherd",
    age: 3,
    gender: "male",
    description: "Max is a loyal and intelligent German Shepherd. He's well-trained and would thrive in an active household.",
    imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    shelterId: "shelter-3",
    status: "adopted",
    arrivalDate: getRandomRecentDate()
  },

  // Rabbits
  {
    id: "pet-7",
    name: "Thumper",
    type: "rabbit",
    breed: "Holland Lop",
    age: 1,
    gender: "male",
    description: "Thumper is an adorable Holland Lop with floppy ears. He's gentle and enjoys being held and petted.",
    imageUrl: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    shelterId: "shelter-1",
    status: "available",
    arrivalDate: getRandomRecentDate()
  },

  // Hamsters
  {
    id: "pet-8",
    name: "Nibbles",
    type: "hamster",
    breed: "Syrian Hamster",
    age: 1,
    gender: "female",
    description: "Nibbles is an active and curious hamster who loves her exercise wheel and tunnels.",
    imageUrl: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    shelterId: "shelter-2",
    status: "available",
    arrivalDate: getRandomRecentDate(),
    featured: true
  },

  // Birds
  {
    id: "pet-9",
    name: "Sunny",
    type: "bird",
    breed: "Canary",
    age: 2,
    gender: "male",
    description: "Sunny is a bright yellow canary with a beautiful singing voice. He brings joy with his cheerful songs.",
    imageUrl: "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    shelterId: "shelter-3",
    status: "available",
    arrivalDate: getRandomRecentDate()
  },

  // Turtles
  {
    id: "pet-10",
    name: "Sheldon",
    type: "turtle",
    breed: "Red-eared Slider",
    age: 5,
    gender: "male",
    description: "Sheldon is a relaxed turtle who enjoys swimming and basking under his heat lamp. He's easy to care for and has a gentle personality.",
    imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    shelterId: "shelter-1",
    status: "available",
    arrivalDate: getRandomRecentDate()
  }
];

export const successStories: SuccessStory[] = [
  {
    id: "story-1",
    petName: "Charlie",
    petType: "dog",
    ownerName: "Sarah Johnson",
    adoptionDate: "2023-02-15T00:00:00.000Z",
    story: "When I first met Charlie at the shelter, he was so shy and wouldn't even look at me. The shelter staff told me he had been rescued from a neglectful situation. I felt an immediate connection and knew I had to give him a loving home. Six months later, Charlie is a completely different dog! He's playful, affectionate, and has become my loyal companion on our daily hikes. Adopting Charlie was the best decision I've ever made.",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "story-2",
    petName: "Luna",
    petType: "cat",
    ownerName: "Michael & Emily Patterson",
    adoptionDate: "2022-11-12T00:00:00.000Z",
    story: "After our kids kept begging for a pet, we decided to visit the local shelter 'just to look.' That's when we met Luna, a beautiful calico who immediately started purring when our daughter held her. We couldn't leave without her! She's adapted wonderfully to our busy household and has a special bond with our youngest. Luna loves to curl up during family movie nights and has become an essential part of our family.",
    imageUrl: "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "story-3",
    petName: "Oliver",
    petType: "rabbit",
    ownerName: "Jessica Martinez",
    adoptionDate: "2023-05-20T00:00:00.000Z",
    story: "I never considered myself a 'rabbit person' until I met Oliver. I was volunteering at an adoption event when this little bunny kept following me around his enclosure. The connection was undeniable! Now Oliver free-roams in my apartment and has such a big personality. He greets me at the door when I come home and loves to cuddle on the couch. He's even litter-trained! Oliver has changed my perspective on rabbits as pets - they're amazing companions with so much love to give.",
    imageUrl: "https://images.unsplash.com/photo-1591382386627-349b692688ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

export const vets: Vet[] = [
  {
    id: "vet-1",
    name: "Dr. Amanda Roberts",
    specialty: "Small Animals & Exotics",
    phone: "(555) 222-3333",
    email: "dr.roberts@petcareclinic.com",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    city: "Springfield",
    state: "IL"
  },
  {
    id: "vet-2",
    name: "Dr. James Wilson",
    specialty: "Canine Behavior & Training",
    phone: "(555) 444-5555",
    email: "dr.wilson@pawsitivevet.com",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    city: "Riverdale",
    state: "CA"
  },
  {
    id: "vet-3",
    name: "Dr. Maria Garcia",
    specialty: "Feline Medicine",
    phone: "(555) 666-7777",
    email: "dr.garcia@felinewellness.com",
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    city: "Lakeside",
    state: "WA"
  },
  {
    id: "vet-4",
    name: "Dr. David Chen",
    specialty: "Avian & Small Mammals",
    phone: "(555) 888-9999",
    email: "dr.chen@allcreaturesvet.com",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    city: "Springfield",
    state: "IL"
  }
];

export const filterPets = (filters: Partial<{
  type: PetType;
  breed: string;
  age: string;
  gender: "male" | "female";
  status: string;
  shelterId: string;
}>) => {
  return pets.filter(pet => {
    if (filters.type && pet.type !== filters.type) return false;
    if (filters.breed && !pet.breed.toLowerCase().includes(filters.breed.toLowerCase())) return false;
    if (filters.gender && pet.gender !== filters.gender) return false;
    if (filters.status && pet.status !== filters.status) return false;
    if (filters.shelterId && pet.shelterId !== filters.shelterId) return false;
    if (filters.age) {
      if (filters.age === "baby" && pet.age >= 1) return false;
      if (filters.age === "young" && (pet.age < 1 || pet.age >= 3)) return false;
      if (filters.age === "adult" && (pet.age < 3 || pet.age >= 8)) return false;
      if (filters.age === "senior" && pet.age < 8) return false;
    }
    return true;
  });
};

export const getFeaturedPets = () => {
  const featuredPets = pets.filter(pet => pet.featured);
  if (featuredPets.length >= 3) return featuredPets.slice(0, 3);
  
  const availablePets = pets.filter(pet => pet.status === "available");
  const randomPets = [...availablePets].sort(() => 0.5 - Math.random()).slice(0, 3);
  return randomPets;
};

export const getPetsByType = (type: PetType) => {
  return pets.filter(pet => pet.type === type);
};

export const getPetById = (id: string) => {
  return pets.find(pet => pet.id === id);
};

export const getShelterById = (id: string) => {
  return shelters.find(shelter => shelter.id === id);
};
