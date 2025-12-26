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

  if (category === "residential") {
    return {
      title: "Residential Projects",
      description: "Transforming homes into sanctuaries of elegance with our premium natural stones. From luxurious kitchen countertops to serene bathroom vanities.",
      projects: [
        { id: "1", title: "Villa Serenity", location: "Beverly Hills, USA", stoneUsed: "Absolute Black Granite", image: dummyImages[0] },
        { id: "2", title: "Modern Loft", location: "New York, USA", stoneUsed: "Classic White Marble", image: dummyImages[1] },
        { id: "3", title: "Coastal Retreat", location: "Sydney, Australia", stoneUsed: "Sandstone Cladding", image: dummyImages[2] },
        { id: "4", title: "Urban Apartment", location: "London, UK", stoneUsed: "Quartzite Countertops", image: dummyImages[3] },
        { id: "1a", title: "Hilltop Manor", location: "Aspen, USA", stoneUsed: "Slate Roofing", image: dummyImages[4] },
        { id: "2a", title: "City Penthouse", location: "Chicago, USA", stoneUsed: "Marble Floyd", image: dummyImages[5] },
        { id: "3a", title: "Beach House", location: "Miami, USA", stoneUsed: "Limestone Paving", image: dummyImages[0] },
        { id: "4a", title: "Country Cottage", location: "Cotswolds, UK", stoneUsed: "Sandstone Wall", image: dummyImages[1] },
        { id: "1b", title: "Desert Oasis", location: "Dubai, UAE", stoneUsed: "Travertine", image: dummyImages[2] },
        { id: "2b", title: "Mountain Lodge", location: "Swiss Alps", stoneUsed: "Granite Hearth", image: dummyImages[3] },
        { id: "3b", title: "Garden Villa", location: "Tuscany, Italy", stoneUsed: "Terra Cotta", image: dummyImages[4] },
        { id: "4b", title: "Lake House", location: "Ontario, Canada", stoneUsed: "River Stone", image: dummyImages[5] },
      ]
    };
  } else if (category === "commercial") {
    return {
      title: "Commercial Projects",
      description: "Elevating business spaces with durable and sophisticated stone solutions. Perfect for hotels, corporate offices, and retail boutiques.",
      projects: [
        { id: "5", title: "Grand Hyatt Lobby", location: "Dubai, UAE", stoneUsed: "Italian Marble Flooring", image: dummyImages[4] },
        { id: "6", title: "Tech Park Plaza", location: "Bangalore, India", stoneUsed: "Granite Pavers", image: dummyImages[5] },
        { id: "7", title: "Luxury Mall Facade", location: "Singapore", stoneUsed: "Limestone Cladding", image: dummyImages[0] },
        { id: "5a", title: "Hotel Entrance", location: "Tokyo, Japan", stoneUsed: "Black Granite", image: dummyImages[1] },
        { id: "6a", title: "Corporate HQ", location: "Frankfurt, Germany", stoneUsed: "Sandstone Facade", image: dummyImages[2] },
        { id: "7a", title: " Boutique Store", location: "Paris, France", stoneUsed: "Marble Counter", image: dummyImages[3] },
        { id: "5b", title: "Resort Walkway", location: "Bali, Indonesia", stoneUsed: "Lava Stone", image: dummyImages[4] },
        { id: "6b", title: "Office Atrium", location: "Seattle, USA", stoneUsed: "Slate Floor", image: dummyImages[5] },
        { id: "7b", title: "Museum Exterior", location: "Doha, Qatar", stoneUsed: "Limestone", image: dummyImages[0] },
        { id: "5c", title: "Airport Lounge", location: "London, UK", stoneUsed: "Quartzite", image: dummyImages[1] },
        { id: "6c", title: "Bank Interior", location: "Zurich, Switzerland", stoneUsed: "Marble Cladding", image: dummyImages[2] },
        { id: "7c", title: "Shopping Center", location: "Madrid, Spain", stoneUsed: "Granite Tile", image: dummyImages[3] },
      ]
    };
  } else if (category === "international") {
    return {
      title: "International Installations",
      description: "Our global footprint of excellence. Exporting premium Indian stones to landmark projects around the world.",
      projects: [
        { id: "8", title: "Royal Palace", location: "Riyadh, Saudi Arabia", stoneUsed: "Sandstone & Granite", image: dummyImages[1] },
        { id: "9", title: "Opera House Walkway", location: "Vienna, Austria", stoneUsed: "Porphyry Stone", image: dummyImages[2] },
        { id: "10", title: "Skyline Tower", location: "Toronto, Canada", stoneUsed: "Slate Cladding", image: dummyImages[3] },
        { id: "11", title: "Resort Infinity Pool", location: "Maldives", stoneUsed: "Sukabumi Stone", image: dummyImages[4] },
         { id: "8a", title: "Embassy Garden", location: "Washington DC, USA", stoneUsed: "Sandstone", image: dummyImages[5] },
        { id: "9a", title: "Public Square", location: "Melbourne, Australia", stoneUsed: "Bluestone", image: dummyImages[0] },
        { id: "10a", title: "University Library", location: "Oxford, UK", stoneUsed: "Limestone", image: dummyImages[1] },
        { id: "11a", title: "Luxury Hotel", location: "Macau", stoneUsed: "Marble", image: dummyImages[2] },
        { id: "8b", title: "Private Estate", location: "Cap Ferrat, France", stoneUsed: "Limestone", image: dummyImages[3] },
        { id: "9b", title: "Corporate Tower", location: "Hong Kong", stoneUsed: "Granite", image: dummyImages[4] },
        { id: "10b", title: "Waterfront Park", location: "Cape Town, SA", stoneUsed: "Sandstone", image: dummyImages[5] },
        { id: "11b", title: "Historical Restoration", location: "Rome, Italy", stoneUsed: "Travertine", image: dummyImages[0] },
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
