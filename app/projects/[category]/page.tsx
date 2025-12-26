import ProjectListing, { ProjectItem } from "@/Components/projects/ProjectListing";
import { notFound } from "next/navigation";

// Dummy Data Generator based on Category
const getProjects = (category: string): { title: string; description: string; projects: ProjectItem[] } | null => {
  const dummyImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200"
  ];

  const commonDesc = "Creating an aura of sophisticated luxury, we selected the finest natural stones to complement the architectural vision. The interplay of light and texture brings a unique character to every corner.";

  if (category === "residential") {
    return {
      title: "Residential Projects",
      description: "Transforming homes into sanctuaries of elegance with our premium natural stones. From luxurious kitchen countertops to serene bathroom vanities.",
      projects: [
        { 
          id: "1", 
          title: "Villa Serenity", 
          location: "Beverly Hills, USA", 
          stoneUsed: "Absolute Black Granite", 
          image: dummyImages[0],
          gallery: [dummyImages[0], dummyImages[1], dummyImages[2]],
          description: "A modern masterpiece tucked in the hills. We used Absolute Black Granite for the kitchen islands to create a bold contrast against the warm wood interiors."
        },
        { 
          id: "2", 
          title: "Modern Loft", 
          location: "New York, USA", 
          stoneUsed: "Classic White Marble", 
          image: dummyImages[1],
          gallery: [dummyImages[1], dummyImages[3], dummyImages[4]],
          description: "In the heart of NYC, this loft demanded brightness. Classic White Marble flooring reflects the natural light, making the space feel expansive and airy."
        },
        { id: "3", title: "Coastal Retreat", location: "Sydney, Australia", stoneUsed: "Sandstone Cladding", image: dummyImages[2], gallery: [dummyImages[2], dummyImages[5], dummyImages[0]], description: "Ideally located by the ocean, the Sandstone Cladding offers durability against salt air while blending seamlessly with the beach landscape." },
        { id: "4", title: "Urban Apartment", location: "London, UK", stoneUsed: "Quartzite Countertops", image: dummyImages[3], gallery: [dummyImages[3], dummyImages[1], dummyImages[2]], description: commonDesc },
        { id: "1a", title: "Hilltop Manor", location: "Aspen, USA", stoneUsed: "Slate Roofing", image: dummyImages[4], gallery: [dummyImages[4], dummyImages[0], dummyImages[3]], description: commonDesc },
        { id: "2a", title: "City Penthouse", location: "Chicago, USA", stoneUsed: "Marble Floyd", image: dummyImages[5], gallery: [dummyImages[5], dummyImages[2], dummyImages[1]], description: commonDesc },
        { id: "3a", title: "Beach House", location: "Miami, USA", stoneUsed: "Limestone Paving", image: dummyImages[0], gallery: [dummyImages[0], dummyImages[4], dummyImages[5]], description: commonDesc },
        { id: "4a", title: "Country Cottage", location: "Cotswolds, UK", stoneUsed: "Sandstone Wall", image: dummyImages[1], gallery: [dummyImages[1], dummyImages[3], dummyImages[2]], description: commonDesc },
        { id: "1b", title: "Desert Oasis", location: "Dubai, UAE", stoneUsed: "Travertine", image: dummyImages[2], gallery: [dummyImages[2], dummyImages[5], dummyImages[0]], description: commonDesc },
        { id: "2b", title: "Mountain Lodge", location: "Swiss Alps", stoneUsed: "Granite Hearth", image: dummyImages[3], gallery: [dummyImages[3], dummyImages[1], dummyImages[4]], description: commonDesc },
        { id: "3b", title: "Garden Villa", location: "Tuscany, Italy", stoneUsed: "Terra Cotta", image: dummyImages[4], gallery: [dummyImages[4], dummyImages[0], dummyImages[5]], description: commonDesc },
        { id: "4b", title: "Lake House", location: "Ontario, Canada", stoneUsed: "River Stone", image: dummyImages[5], gallery: [dummyImages[5], dummyImages[2], dummyImages[3]], description: commonDesc },
      ]
    };
  } else if (category === "commercial") {
    return {
      title: "Commercial Projects",
      description: "Elevating business spaces with durable and sophisticated stone solutions. Perfect for hotels, corporate offices, and retail boutiques.",
      projects: [
        { id: "5", title: "Grand Hyatt Lobby", location: "Dubai, UAE", stoneUsed: "Italian Marble Flooring", image: dummyImages[4], gallery: [dummyImages[4], dummyImages[0], dummyImages[1]], description: "For the grand lobby, Italian Marble was the only choice to convey opulence. The vein matching was executed to perfection." },
        { id: "6", title: "Tech Park Plaza", location: "Bangalore, India", stoneUsed: "Granite Pavers", image: dummyImages[5], gallery: [dummyImages[5], dummyImages[2], dummyImages[3]], description: "High foot traffic required the durability of Granite Pavers. We created a geometric pattern that guides visitors through the campus." },
        { id: "7", title: "Luxury Mall Facade", location: "Singapore", stoneUsed: "Limestone Cladding", image: dummyImages[0], gallery: [dummyImages[0], dummyImages[4], dummyImages[5]], description: commonDesc },
        { id: "5a", title: "Hotel Entrance", location: "Tokyo, Japan", stoneUsed: "Black Granite", image: dummyImages[1], gallery: [dummyImages[1], dummyImages[3], dummyImages[2]], description: commonDesc },
        { id: "6a", title: "Corporate HQ", location: "Frankfurt, Germany", stoneUsed: "Sandstone Facade", image: dummyImages[2], gallery: [dummyImages[2], dummyImages[5], dummyImages[0]], description: commonDesc },
        { id: "7a", title: " Boutique Store", location: "Paris, France", stoneUsed: "Marble Counter", image: dummyImages[3], gallery: [dummyImages[3], dummyImages[1], dummyImages[4]], description: commonDesc },
        { id: "5b", title: "Resort Walkway", location: "Bali, Indonesia", stoneUsed: "Lava Stone", image: dummyImages[4], gallery: [dummyImages[4], dummyImages[0], dummyImages[5]], description: commonDesc },
        { id: "6b", title: "Office Atrium", location: "Seattle, USA", stoneUsed: "Slate Floor", image: dummyImages[5], gallery: [dummyImages[5], dummyImages[2], dummyImages[3]], description: commonDesc },
        { id: "7b", title: "Museum Exterior", location: "Doha, Qatar", stoneUsed: "Limestone", image: dummyImages[0], gallery: [dummyImages[0], dummyImages[4], dummyImages[1]], description: commonDesc },
        { id: "5c", title: "Airport Lounge", location: "London, UK", stoneUsed: "Quartzite", image: dummyImages[1], gallery: [dummyImages[1], dummyImages[3], dummyImages[2]], description: commonDesc },
        { id: "6c", title: "Bank Interior", location: "Zurich, Switzerland", stoneUsed: "Marble Cladding", image: dummyImages[2], gallery: [dummyImages[2], dummyImages[5], dummyImages[0]], description: commonDesc },
        { id: "7c", title: "Shopping Center", location: "Madrid, Spain", stoneUsed: "Granite Tile", image: dummyImages[3], gallery: [dummyImages[3], dummyImages[1], dummyImages[4]], description: commonDesc },
      ]
    };
  } else if (category === "international") {
    return {
      title: "International Installations",
      description: "Our global footprint of excellence. Exporting premium Indian stones to landmark projects around the world.",
      projects: [
        { id: "8", title: "Royal Palace", location: "Riyadh, Saudi Arabia", stoneUsed: "Sandstone & Granite", image: dummyImages[1], gallery: [dummyImages[1], dummyImages[2], dummyImages[3]], description: "A project of royal proportions. We supplied custom-cut Sandstone and Granite for the palace exteriors, ensuring consistency in color and texture." },
        { id: "9", title: "Opera House Walkway", location: "Vienna, Austria", stoneUsed: "Porphyry Stone", image: dummyImages[2], gallery: [dummyImages[2], dummyImages[4], dummyImages[5]], description: commonDesc },
        { id: "10", title: "Skyline Tower", location: "Toronto, Canada", stoneUsed: "Slate Cladding", image: dummyImages[3], gallery: [dummyImages[3], dummyImages[0], dummyImages[1]], description: commonDesc },
        { id: "11", title: "Resort Infinity Pool", location: "Maldives", stoneUsed: "Sukabumi Stone", image: dummyImages[4], gallery: [dummyImages[4], dummyImages[2], dummyImages[5]], description: commonDesc },
         { id: "8a", title: "Embassy Garden", location: "Washington DC, USA", stoneUsed: "Sandstone", image: dummyImages[5], gallery: [dummyImages[5], dummyImages[1], dummyImages[3]], description: commonDesc },
        { id: "9a", title: "Public Square", location: "Melbourne, Australia", stoneUsed: "Bluestone", image: dummyImages[0], gallery: [dummyImages[0], dummyImages[4], dummyImages[2]], description: commonDesc },
        { id: "10a", title: "University Library", location: "Oxford, UK", stoneUsed: "Limestone", image: dummyImages[1], gallery: [dummyImages[1], dummyImages[3], dummyImages[5]], description: commonDesc },
        { id: "11a", title: "Luxury Hotel", location: "Macau", stoneUsed: "Marble", image: dummyImages[2], gallery: [dummyImages[2], dummyImages[0], dummyImages[4]], description: commonDesc },
        { id: "8b", title: "Private Estate", location: "Cap Ferrat, France", stoneUsed: "Limestone", image: dummyImages[3], gallery: [dummyImages[3], dummyImages[1], dummyImages[5]], description: commonDesc },
        { id: "9b", title: "Corporate Tower", location: "Hong Kong", stoneUsed: "Granite", image: dummyImages[4], gallery: [dummyImages[4], dummyImages[2], dummyImages[0]], description: commonDesc },
        { id: "10b", title: "Waterfront Park", location: "Cape Town, SA", stoneUsed: "Sandstone", image: dummyImages[5], gallery: [dummyImages[5], dummyImages[3], dummyImages[1]], description: commonDesc },
        { id: "11b", title: "Historical Restoration", location: "Rome, Italy", stoneUsed: "Travertine", image: dummyImages[0], gallery: [dummyImages[0], dummyImages[4], dummyImages[2]], description: commonDesc },
      ]
    };
  }

  return null;
};

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function ProjectsPage({ params }: PageProps) {
  const { category } = await params;
  const data = getProjects(category);

  if (!data) {
    notFound();
  }

  return (
    <ProjectListing 
      title={data.title} 
      description={data.description} 
      projects={data.projects} 
    />
  );
}
