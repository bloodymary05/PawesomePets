
import { supabase } from "@/integrations/supabase/client";

// Function to insert mock data into the database
export const insertMockData = async () => {
  try {
    console.log("Starting mock data insertion...");
    
    // Mock shelters
    const shelterData = [
      {
        name: "Pawsome Rescue",
        address: "123 Main Street",
        city: "Portland",
        state: "OR",
        zip_code: "97201",
        phone: "(503) 555-1234",
        email: "info@pawsomerescue.org",
        website: "https://www.pawsomerescue.org"
      },
      {
        name: "Happy Tails Sanctuary",
        address: "456 Oak Avenue",
        city: "Seattle",
        state: "WA",
        zip_code: "98101",
        phone: "(206) 555-5678",
        email: "contact@happytails.org",
        website: "https://www.happytailssanctuary.org"
      },
      {
        name: "Forever Friends Animal Shelter",
        address: "789 Pine Street",
        city: "San Francisco",
        state: "CA",
        zip_code: "94102",
        phone: "(415) 555-9012",
        email: "adopt@foreverfriends.org",
        website: "https://www.foreverfriends.org"
      },
      {
        name: "Loving Paws Rescue",
        address: "321 Cedar Road",
        city: "Austin",
        state: "TX",
        zip_code: "78701",
        phone: "(512) 555-3456",
        email: "help@lovingpaws.org",
        website: "https://www.lovingpawsrescue.org"
      },
      {
        name: "Safe Haven Pet Sanctuary",
        address: "654 Birch Boulevard",
        city: "Denver",
        state: "CO",
        zip_code: "80201",
        phone: "(303) 555-7890",
        email: "info@safehavenpets.org",
        website: "https://www.safehavenpets.org"
      },
      {
        name: "Second Chance Animal Shelter",
        address: "987 Maple Drive",
        city: "Chicago",
        state: "IL",
        zip_code: "60601",
        phone: "(312) 555-2345",
        email: "adopt@secondchance.org",
        website: "https://www.secondchanceshelter.org"
      },
      {
        name: "New Beginnings Pet Rescue",
        address: "159 Elm Street",
        city: "Boston",
        state: "MA",
        zip_code: "02101",
        phone: "(617) 555-6789",
        email: "rescue@newbeginnings.org",
        website: "https://www.newbeginningspetrescue.org"
      },
      {
        name: "Furry Friends Refuge",
        address: "753 Spruce Lane",
        city: "Miami",
        state: "FL",
        zip_code: "33101",
        phone: "(305) 555-0123",
        email: "help@furryfriendsrefuge.org",
        website: "https://www.furryfriendsrefuge.org"
      },
      {
        name: "Paws and Claws Rescue",
        address: "852 Redwood Avenue",
        city: "New York",
        state: "NY",
        zip_code: "10001",
        phone: "(212) 555-4567",
        email: "info@pawsandclaws.org",
        website: "https://www.pawsandclawsrescue.org"
      },
      {
        name: "Hope for Paws",
        address: "426 Aspen Circle",
        city: "Los Angeles",
        state: "CA",
        zip_code: "90001",
        phone: "(213) 555-8901",
        email: "hope@hopeforpaws.org",
        website: "https://www.hopeforpaws.org"
      }
    ];

    // Insert shelters
    const { error: shelterError } = await supabase
      .from("shelters")
      .insert(shelterData);
    
    if (shelterError) {
      console.error("Error inserting shelter data:", shelterError);
    } else {
      console.log("Successfully inserted shelter data");
    }

    // Get shelter IDs for pet references
    const { data: shelters } = await supabase
      .from("shelters")
      .select("id");
    
    const shelterIds = shelters?.map(shelter => shelter.id) || [];

    // Mock pet profiles
    const petData = [
      {
        name: "Buddy",
        type: "dog",
        breed: "Golden Retriever",
        age: 3,
        gender: "male",
        size: "large",
        color: "golden",
        description: "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks.",
        image_url: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
        shelter_id: shelterIds[0],
        status: "available",
        likes: ["Playing fetch", "Swimming", "Car rides"],
        dislikes: ["Being alone", "Thunderstorms"]
      },
      {
        name: "Luna",
        type: "cat",
        breed: "Siamese",
        age: 2,
        gender: "female",
        size: "medium",
        color: "cream and brown",
        description: "Luna is a curious and affectionate Siamese cat who enjoys lounging in sunny spots and playing with string toys.",
        image_url: "https://images.unsplash.com/photo-1520315342629-6ea920342047?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
        shelter_id: shelterIds[1],
        status: "available",
        likes: ["Sunny spots", "String toys", "Chin scratches"],
        dislikes: ["Loud noises", "Water"]
      },
      {
        name: "Max",
        type: "dog",
        breed: "Labrador Retriever",
        age: 5,
        gender: "male",
        size: "large",
        color: "chocolate",
        description: "Max is a gentle and well-trained Labrador who loves children and other animals.",
        image_url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
        shelter_id: shelterIds[2],
        status: "available",
        likes: ["Playing with kids", "Belly rubs", "Treats"],
        dislikes: ["Being alone", "Cats"]
      },
      {
        name: "Charlie",
        type: "dog",
        breed: "Beagle",
        age: 1,
        gender: "male",
        size: "medium",
        color: "tricolor",
        description: "Charlie is a playful Beagle puppy with lots of energy and a curious nature.",
        image_url: "https://images.unsplash.com/photo-1598369685311-a22ca3406009?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
        shelter_id: shelterIds[3],
        status: "available",
        featured: true,
        likes: ["Exploring", "Sniffing", "Toys"],
        dislikes: ["Being left alone", "Baths"]
      },
      {
        name: "Bella",
        type: "cat",
        breed: "Maine Coon",
        age: 4,
        gender: "female",
        size: "large",
        color: "tabby",
        description: "Bella is a majestic and gentle Maine Coon who loves to be brushed and pampered.",
        image_url: "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
        shelter_id: shelterIds[4],
        status: "available",
        featured: true,
        likes: ["Being brushed", "Bird watching", "Treats"],
        dislikes: ["Loud noises", "Strangers"]
      },
      {
        name: "Rocky",
        type: "dog",
        breed: "Bulldog",
        age: 6,
        gender: "male",
        size: "medium",
        color: "white and brown",
        description: "Rocky is a laid-back Bulldog who loves to nap and receive belly rubs.",
        image_url: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
        shelter_id: shelterIds[5],
        status: "available",
        likes: ["Napping", "Belly rubs", "Short walks"],
        dislikes: ["Heat", "Exercise", "Stairs"]
      },
      {
        name: "Coco",
        type: "dog",
        breed: "Poodle",
        age: 2,
        gender: "female",
        size: "small",
        color: "brown",
        description: "Coco is an intelligent and well-mannered Poodle who is great with children.",
        image_url: "https://images.unsplash.com/photo-1594149515845-ebbd50b88bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
        shelter_id: shelterIds[6],
        status: "pending",
        likes: ["Training", "Cuddles", "Toys"],
        dislikes: ["Being alone", "Rain"]
      },
      {
        name: "Oliver",
        type: "cat",
        breed: "Tabby",
        age: 1,
        gender: "male",
        size: "small",
        color: "orange tabby",
        description: "Oliver is a playful and spirited kitten who loves to chase toys and explore.",
        image_url: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
        shelter_id: shelterIds[7],
        status: "available",
        featured: true,
        likes: ["Chasing toys", "Climbing", "Sunny spots"],
        dislikes: ["Loud noises", "Being held too long"]
      },
      {
        name: "Milo",
        type: "dog",
        breed: "Border Collie",
        age: 3,
        gender: "male",
        size: "medium",
        color: "black and white",
        description: "Milo is a highly intelligent Border Collie who excels at agility training and problem-solving.",
        image_url: "https://images.unsplash.com/photo-1553882809-a4f57e59501d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
        shelter_id: shelterIds[8],
        status: "available",
        likes: ["Agility training", "Frisbee", "Mental challenges"],
        dislikes: ["Inactivity", "Being ignored"]
      },
      {
        name: "Sophie",
        type: "cat",
        breed: "Ragdoll",
        age: 5,
        gender: "female",
        size: "medium",
        color: "white and gray",
        description: "Sophie is a calm and affectionate Ragdoll who loves to be held and cuddled.",
        image_url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
        shelter_id: shelterIds[9],
        status: "adopted",
        likes: ["Being held", "Gentle pets", "Lap time"],
        dislikes: ["Loud environments", "Quick movements"]
      }
    ];

    // Insert pets
    const { error: petError } = await supabase
      .from("pet_profiles")
      .insert(petData);
    
    if (petError) {
      console.error("Error inserting pet data:", petError);
    } else {
      console.log("Successfully inserted pet data");
    }

    // Get pet IDs for adoption references
    const { data: pets } = await supabase
      .from("pet_profiles")
      .select("id");
    
    const petIds = pets?.map(pet => pet.id) || [];

    // Mock success stories
    const successStoryData = [
      {
        pet_name: "Bailey",
        pet_type: "dog",
        owner_name: "Michael Johnson",
        story: "Bailey was my first dog ever, and I was nervous about the responsibility. From the moment we met at the shelter, we had an instant connection. He's now my constant companion and has brought so much joy into my life. Adopting him was the best decision I've ever made.",
        image_url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
      },
      {
        pet_name: "Whiskers",
        pet_type: "cat",
        owner_name: "Sarah Thompson",
        story: "After losing my previous cat of 15 years, I was heartbroken. I wasn't sure I was ready for another pet, but when I saw Whiskers at the shelter, something just clicked. She's helped me heal and brings so much laughter into my home with her playful antics.",
        image_url: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
      },
      {
        pet_name: "Rex",
        pet_type: "dog",
        owner_name: "David Wilson",
        story: "I adopted Rex as a senior dog when everyone else was looking at puppies. He had been overlooked for months, but I could see the gentle soul inside him. He's been the perfect companion for my quiet lifestyle, and we enjoy peaceful walks and relaxing evenings together.",
        image_url: "https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
      },
      {
        pet_name: "Mittens",
        pet_type: "cat",
        owner_name: "Jennifer Lee",
        story: "Adopting Mittens changed my entire perspective on cats. I always thought I was a 'dog person' until this little furball came into my life. She's affectionate, playful, and has such a unique personality. Now I can't imagine life without her purring next to me.",
        image_url: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
      },
      {
        pet_name: "Cooper",
        pet_type: "dog",
        owner_name: "Amanda Rodriguez",
        story: "Cooper was extremely shy when I first brought him home from the shelter. He had been rescued from a neglectful situation and didn't trust humans. With patience and love, he's transformed into a confident, happy dog who now even works with me as a therapy dog visiting hospitals.",
        image_url: "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
      },
      {
        pet_name: "Felix",
        pet_type: "cat",
        owner_name: "Thomas Martin",
        story: "I adopted Felix when my children begged for a pet. What started as 'the kids' cat' quickly became my best friend. He seems to know when I've had a tough day and always comes to sit with me. Our whole family has learned so much about responsibility and compassion through caring for him.",
        image_url: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
      },
      {
        pet_name: "Rosie",
        pet_type: "dog",
        owner_name: "Emma Clark",
        story: "Rosie was my first apartment dog after moving to the city alone. She's been my safety net, my reason to get outside and explore the neighborhood, and my introduction to a whole community of dog lovers. Thanks to her, I feel at home in what was once a strange new place.",
        image_url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
      },
      {
        pet_name: "Shadow",
        pet_type: "cat",
        owner_name: "Robert Taylor",
        story: "I adopted Shadow thinking I was saving him, but in reality, he saved me. During a difficult period of depression, his predictable needs gave me a reason to get up every morning. His quiet companionship helped me through the darkest days, and now we're both thriving together.",
        image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
      },
      {
        pet_name: "Lucy",
        pet_type: "dog",
        owner_name: "Kevin Anderson",
        story: "Lucy was supposed to be a family dog, but she quickly became 'my' dog, following me everywhere. When I was diagnosed with a chronic illness, she intuitively changed her behavior to become more calm and attentive. She's not just a pet; she's my personal support system with paws.",
        image_url: "https://images.unsplash.com/photo-1550028061-602e21997984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
      },
      {
        pet_name: "Mochi",
        pet_type: "rabbit",
        owner_name: "Lisa Kim",
        story: "Adopting Mochi the rabbit opened my eyes to how intelligent and affectionate these animals can be. He's litter-trained, comes when called, and does tricks that amaze visitors. He's changed how many of my friends view rabbits, and several have gone on to adopt rescue bunnies of their own.",
        image_url: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
      }
    ];

    // Insert success stories
    const { error: successStoryError } = await supabase
      .from("success_stories")
      .insert(successStoryData);
    
    if (successStoryError) {
      console.error("Error inserting success story data:", successStoryError);
    } else {
      console.log("Successfully inserted success story data");
    }

    // Mock consultation data
    const consultationData = [
      {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "(555) 123-4567",
        pet_type: "dog",
        consultation_type: "Behavioral",
        preferred_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        message: "My dog has been showing signs of anxiety when I leave the house. I'd like to discuss possible solutions."
      },
      {
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        phone: "(555) 234-5678",
        pet_type: "cat",
        consultation_type: "Nutritional",
        preferred_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        message: "I'm concerned about my cat's weight and would like advice on a proper diet plan."
      },
      {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        phone: "(555) 345-6789",
        pet_type: "dog",
        consultation_type: "Medical",
        preferred_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        message: "My senior dog has been limping lately, and I'd like to discuss treatment options."
      },
      {
        name: "Sarah Davis",
        email: "sarah.davis@example.com",
        phone: "(555) 456-7890",
        pet_type: "rabbit",
        consultation_type: "General Care",
        preferred_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        message: "I'm a new rabbit owner and would like guidance on proper cage setup and care."
      },
      {
        name: "David Wilson",
        email: "david.wilson@example.com",
        phone: "(555) 567-8901",
        pet_type: "dog",
        consultation_type: "Training",
        preferred_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        message: "I need help training my new puppy with basic commands and house training."
      },
      {
        name: "Jennifer Martinez",
        email: "jennifer.martinez@example.com",
        phone: "(555) 678-9012",
        pet_type: "cat",
        consultation_type: "Behavioral",
        preferred_date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        message: "My cat has started spraying in the house, and I need help addressing this behavior."
      },
      {
        name: "Robert Taylor",
        email: "robert.taylor@example.com",
        phone: "(555) 789-0123",
        pet_type: "dog",
        consultation_type: "Medical",
        preferred_date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        message: "I'd like to discuss vaccination schedules and preventative care for my new rescue dog."
      },
      {
        name: "Lisa Anderson",
        email: "lisa.anderson@example.com",
        phone: "(555) 890-1234",
        pet_type: "bird",
        consultation_type: "Nutritional",
        preferred_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        message: "I'd like advice on the best diet for my parakeet."
      },
      {
        name: "Kevin Thomas",
        email: "kevin.thomas@example.com",
        phone: "(555) 901-2345",
        pet_type: "dog",
        consultation_type: "Adoption Counseling",
        preferred_date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
        message: "I'm considering adopting a senior dog and would like to discuss special considerations."
      },
      {
        name: "Amanda Rodriguez",
        email: "amanda.rodriguez@example.com",
        phone: "(555) 012-3456",
        pet_type: "cat",
        consultation_type: "General Care",
        preferred_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        message: "I'm going on vacation and would like advice on cat care while I'm away."
      }
    ];

    // Insert consultation data
    const { error: consultationError } = await supabase
      .from("consultations")
      .insert(consultationData);
    
    if (consultationError) {
      console.error("Error inserting consultation data:", consultationError);
    } else {
      console.log("Successfully inserted consultation data");
    }

    // Mock volunteering data
    const volunteeringData = [
      {
        user_id: "00000000-0000-0000-0000-000000000001", // Placeholder for user ID
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "(555) 123-4567",
        address: "123 Pine Street",
        city: "Portland",
        state: "OR",
        zip_code: "97201",
        availability: ["weekday_mornings", "weekend_afternoons"],
        interests: ["dog_walking", "cat_socialization", "administrative"],
        experience: "I've volunteered at animal shelters before and have two dogs at home.",
        message: "I'm passionate about animal welfare and would love to help out!"
      },
      {
        user_id: "00000000-0000-0000-0000-000000000002", // Placeholder for user ID
        name: "Taylor Smith",
        email: "taylor.smith@example.com",
        phone: "(555) 234-5678",
        address: "456 Oak Avenue",
        city: "Seattle",
        state: "WA",
        zip_code: "98101",
        availability: ["weekend_mornings", "weekend_afternoons"],
        interests: ["events", "photography", "social_media"],
        experience: "I'm a professional photographer and would love to help take photos of animals for adoption listings.",
        message: "I believe good photos help animals get adopted faster and want to contribute my skills."
      },
      {
        user_id: "00000000-0000-0000-0000-000000000003", // Placeholder for user ID
        name: "Jordan Williams",
        email: "jordan.williams@example.com",
        phone: "(555) 345-6789",
        address: "789 Maple Drive",
        city: "San Francisco",
        state: "CA",
        zip_code: "94102",
        availability: ["weekday_evenings", "weekend_evenings"],
        interests: ["dog_walking", "foster_program", "transport"],
        experience: "I don't have previous shelter experience, but I've had dogs all my life and am good with them.",
        message: "I have a flexible schedule and reliable car, so I can help with transport as needed."
      },
      {
        user_id: "00000000-0000-0000-0000-000000000004", // Placeholder for user ID
        name: "Casey Brown",
        email: "casey.brown@example.com",
        phone: "(555) 456-7890",
        address: "101 Cedar Lane",
        city: "Austin",
        state: "TX",
        zip_code: "78701",
        availability: ["weekday_mornings", "weekday_afternoons"],
        interests: ["cat_socialization", "cleaning", "administrative"],
        experience: "I'm retired and looking for meaningful ways to spend my time. I have three cats at home.",
        message: "I can commit to a regular weekly schedule and am happy to help with whatever is needed."
      },
      {
        user_id: "00000000-0000-0000-0000-000000000005", // Placeholder for user ID
        name: "Morgan Davis",
        email: "morgan.davis@example.com",
        phone: "(555) 567-8901",
        address: "202 Elm Street",
        city: "Denver",
        state: "CO",
        zip_code: "80201",
        availability: ["weekend_mornings", "weekend_afternoons", "weekend_evenings"],
        interests: ["dog_walking", "training", "events"],
        experience: "I'm a certified dog trainer with 5 years of experience.",
        message: "I'd like to volunteer my professional skills to help improve adoptability through basic training."
      },
      {
        user_id: "00000000-0000-0000-0000-000000000006", // Placeholder for user ID
        name: "Jamie Wilson",
        email: "jamie.wilson@example.com",
        phone: "(555) 678-9012",
        address: "303 Birch Boulevard",
        city: "Chicago",
        state: "IL",
        zip_code: "60601",
        availability: ["weekday_evenings", "weekend_afternoons"],
        interests: ["small_animal_care", "cleaning", "foster_program"],
        experience: "I've kept small pets like hamsters and guinea pigs for years.",
        message: "I'm especially interested in helping with the care of small animals that often get overlooked."
      },
      {
        user_id: "00000000-0000-0000-0000-000000000007", // Placeholder for user ID
        name: "Riley Miller",
        email: "riley.miller@example.com",
        phone: "(555) 789-0123",
        address: "404 Spruce Circle",
        city: "Boston",
        state: "MA",
        zip_code: "02101",
        availability: ["weekday_afternoons", "weekday_evenings"],
        interests: ["cat_socialization", "dog_walking", "administrative"],
        experience: "I've volunteered at multiple animal shelters over the past 7 years.",
        message: "I recently moved to the area and am looking to continue my volunteer work with animals."
      },
      {
        user_id: "00000000-0000-0000-0000-000000000008", // Placeholder for user ID
        name: "Avery Thomas",
        email: "avery.thomas@example.com",
        phone: "(555) 890-1234",
        address: "505 Aspen Road",
        city: "Miami",
        state: "FL",
        zip_code: "33101",
        availability: ["weekday_mornings", "weekend_mornings"],
        interests: ["events", "fundraising", "transport"],
        experience: "I have experience in event planning and fundraising for nonprofits.",
        message: "I'd like to help organize fundraising events to support the shelter's work."
      },
      {
        user_id: "00000000-0000-0000-0000-000000000009", // Placeholder for user ID
        name: "Quinn Johnson",
        email: "quinn.johnson@example.com",
        phone: "(555) 901-2345",
        address: "606 Redwood Drive",
        city: "New York",
        state: "NY",
        zip_code: "10001",
        availability: ["weekend_afternoons", "weekend_evenings"],
        interests: ["dog_walking", "foster_program", "social_media"],
        experience: "I work in social media marketing and have two rescue dogs.",
        message: "I'd like to help improve the shelter's social media presence to increase adoptions."
      },
      {
        user_id: "00000000-0000-0000-0000-000000000010", // Placeholder for user ID
        name: "Drew Martinez",
        email: "drew.martinez@example.com",
        phone: "(555) 012-3456",
        address: "707 Sequoia Street",
        city: "Los Angeles",
        state: "CA",
        zip_code: "90001",
        availability: ["weekday_evenings", "weekend_mornings", "weekend_afternoons"],
        interests: ["dog_walking", "training", "events", "transport"],
        experience: "I've been a pet sitter for 5 years and have experience with many different animals.",
        message: "I have a reliable vehicle and am happy to help with transport to vet appointments or events."
      }
    ];

    // Note: We're not actually inserting the volunteering data as it requires valid auth user IDs
    console.log("Mock volunteering data created but not inserted - requires valid auth user IDs");

    // Mock adoption application data
    const adoptionApplicationData = [
      {
        user_id: "00000000-0000-0000-0000-000000000001", // Placeholder for user ID
        pet_id: petIds[0],
        address: "123 Main Street",
        city: "Portland",
        state: "OR",
        zip_code: "97201",
        contact_phone: "(555) 123-4567",
        housing_type: "House with yard",
        has_yard: true,
        experience: "Have had dogs for 15 years, currently have one senior dog",
        other_pets: "One 10-year-old Labrador Retriever",
        status: "pending"
      },
      {
        user_id: "00000000-0000-0000-0000-000000000002", // Placeholder for user ID
        pet_id: petIds[1],
        address: "456 Oak Avenue",
        city: "Seattle",
        state: "WA",
        zip_code: "98101",
        contact_phone: "(555) 234-5678",
        housing_type: "Apartment",
        has_yard: false,
        experience: "First-time pet owner but have done extensive research",
        other_pets: "None",
        status: "pending"
      },
      {
        user_id: "00000000-0000-0000-0000-000000000003", // Placeholder for user ID
        pet_id: petIds[2],
        address: "789 Elm Street",
        city: "San Francisco",
        state: "CA",
        zip_code: "94102",
        contact_phone: "(555) 345-6789",
        housing_type: "House with yard",
        has_yard: true,
        experience: "Have owned multiple dogs and cats throughout my life",
        other_pets: "Two cats, ages 3 and 5",
        status: "approved",
        approval_date: new Date().toISOString()
      },
      {
        user_id: "00000000-0000-0000-0000-000000000004", // Placeholder for user ID
        pet_id: petIds[3],
        address: "101 Pine Street",
        city: "Austin",
        state: "TX",
        zip_code: "78701",
        contact_phone: "(555) 456-7890",
        housing_type: "Townhouse",
        has_yard: false,
        experience: "Grew up with dogs, this would be my first as an adult",
        other_pets: "None",
        status: "pending"
      },
      {
        user_id: "00000000-0000-0000-0000-000000000005", // Placeholder for user ID
        pet_id: petIds[4],
        address: "202 Maple Drive",
        city: "Denver",
        state: "CO",
        zip_code: "80201",
        contact_phone: "(555) 567-8901",
        housing_type: "House with yard",
        has_yard: true,
        experience: "Have had cats for over 10 years",
        other_pets: "One 7-year-old cat",
        status: "rejected",
        rejection_reason: "Pet not suitable for homes with existing cats"
      },
      {
        user_id: "00000000-0000-0000-0000-000000000006", // Placeholder for user ID
        pet_id: petIds[5],
        address: "303 Cedar Lane",
        city: "Chicago",
        state: "IL",
        zip_code: "60601",
        contact_phone: "(555) 678-9012",
        housing_type: "Apartment",
        has_yard: false,
        experience: "Previously owned a Bulldog for 10 years",
        other_pets: "None",
        status: "pending"
      },
      {
        user_id: "00000000-0000-0000-0000-000000000007", // Placeholder for user ID
        pet_id: petIds[6],
        address: "404 Birch Boulevard",
        city: "Boston",
        state: "MA",
        zip_code: "02101",
        contact_phone: "(555) 789-0123",
        housing_type: "House with yard",
        has_yard: true,
        experience: "Professional dog trainer with 15 years experience",
        other_pets: "Two well-trained dogs",
        status: "approved",
        approval_date: new Date().toISOString()
      },
      {
        user_id: "00000000-0000-0000-0000-000000000008", // Placeholder for user ID
        pet_id: petIds[7],
        address: "505 Spruce Circle",
        city: "Miami",
        state: "FL",
        zip_code: "33101",
        contact_phone: "(555) 890-1234",
        housing_type: "Condo",
        has_yard: false,
        experience: "First-time cat owner",
        other_pets: "None",
        status: "pending"
      },
      {
        user_id: "00000000-0000-0000-0000-000000000009", // Placeholder for user ID
        pet_id: petIds[8],
        address: "606 Redwood Drive",
        city: "New York",
        state: "NY",
        zip_code: "10001",
        contact_phone: "(555) 901-2345",
        housing_type: "House with yard",
        has_yard: true,
        experience: "Have owned Border Collies before and understand their exercise needs",
        other_pets: "None",
        status: "pending"
      },
      {
        user_id: "00000000-0000-0000-0000-000000000010", // Placeholder for user ID
        pet_id: petIds[9],
        address: "707 Aspen Road",
        city: "Los Angeles",
        state: "CA",
        zip_code: "90001",
        contact_phone: "(555) 012-3456",
        housing_type: "House with yard",
        has_yard: true,
        experience: "Have had cats for over 20 years",
        other_pets: "Two cats, ages 8 and 10",
        status: "rejected",
        rejection_reason: "Another applicant was selected"
      }
    ];

    // Note: We're not actually inserting the adoption applications as they require valid auth user IDs
    console.log("Mock adoption application data created but not inserted - requires valid auth user IDs");

    // Mock donations data
    const donationData = [
      {
        donation_id: 1,
        first_name: "James",
        last_name: "Wilson",
        email: "james.wilson@example.com",
        amount: 50.00,
        frequency: "One-time",
        message: "Thank you for all the wonderful work you do for animals!"
      },
      {
        donation_id: 2,
        first_name: "Sophia",
        last_name: "Brown",
        email: "sophia.brown@example.com",
        amount: 100.00,
        frequency: "Monthly",
        message: "In memory of my beloved dog Max"
      },
      {
        donation_id: 3,
        first_name: "William",
        last_name: "Davis",
        email: "william.davis@example.com",
        amount: 25.00,
        frequency: "One-time",
        message: null
      },
      {
        donation_id: 4,
        first_name: "Olivia",
        last_name: "Miller",
        email: "olivia.miller@example.com",
        amount: 200.00,
        frequency: "One-time",
        message: "To help with medical expenses for the shelter animals"
      },
      {
        donation_id: 5,
        first_name: "Benjamin",
        last_name: "Moore",
        email: "benjamin.moore@example.com",
        amount: 75.00,
        frequency: "Monthly",
        message: "Happy to support your important work!"
      },
      {
        donation_id: 6,
        first_name: "Emily",
        last_name: "Johnson",
        email: "emily.johnson@example.com",
        amount: 150.00,
        frequency: "One-time",
        message: "For the special needs animals"
      },
      {
        donation_id: 7,
        first_name: "Noah",
        last_name: "Taylor",
        email: "noah.taylor@example.com",
        amount: 50.00,
        frequency: "Monthly",
        message: null
      },
      {
        donation_id: 8,
        first_name: "Ava",
        last_name: "Thomas",
        email: "ava.thomas@example.com",
        amount: 300.00,
        frequency: "One-time",
        message: "In celebration of adopting my cat Whiskers from you 5 years ago"
      },
      {
        donation_id: 9,
        first_name: "Michael",
        last_name: "Anderson",
        email: "michael.anderson@example.com",
        amount: 100.00,
        frequency: "One-time",
        message: "To help with food and supplies"
      },
      {
        donation_id: 10,
        first_name: "Emma",
        last_name: "Wilson",
        email: "emma.wilson@example.com",
        amount: 500.00,
        frequency: "One-time",
        message: "Please use this where it's needed most"
      }
    ];

    // Insert donation data
    const { error: donationError } = await supabase
      .from("donations")
      .insert(donationData);
    
    if (donationError) {
      console.error("Error inserting donation data:", donationError);
    } else {
      console.log("Successfully inserted donation data");
    }

    console.log("Mock data insertion completed!");
    return { success: true };

  } catch (error) {
    console.error("Error inserting mock data:", error);
    return { success: false, error };
  }
};
