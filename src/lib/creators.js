const initialCreators = [
    { 
      id: 1, 
      name: "Atelier Lumina", 
      craft: "Peinture Vibratoire & Talismans",
      description: "Canalise les énergies de la nature guadeloupéenne pour créer des œuvres qui élèvent l'âme et harmonisent les lieux de vie.", 
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1948&auto=format&fit=crop", 
      commune: "Sainte-Rose",
      contact: "atelier.lumina@email.com",
      featured: true,
      category: "Peinture"
    },
    { 
      id: 2, 
      name: "Terre & Esprit", 
      craft: "Poterie & Céramique Sacrée",
      description: "Façonne l'argile locale en pièces uniques, porteuses d'intention et de l'esprit des volcans et des rivières de l'île.", 
      image: "https://images.unsplash.com/photo-1565034893982-598150a04297?q=80&w=1974&auto=format&fit=crop", 
      commune: "Trois-Rivières",
      contact: "@terre.esprit",
      featured: false,
      category: "Poterie"
    },
    { 
      id: 3, 
      name: "Fils d'Or", 
      craft: "Tissage & Créations Textibles",
      description: "Tisse des mandalas et des pièces murales en macramé en y intégrant des fibres végétales locales, des graines et des minéraux.", 
      image: "https://images.unsplash.com/photo-1626825488437-b43b67bce1b4?q=80&w=1974&auto=format&fit=crop", 
      commune: "Le Moule",
      contact: "Non communiqué",
      featured: false,
      category: "Tissage"
    },
    { 
      id: 4, 
      name: "Mélodie Végétale", 
      craft: "Bijoux Botaniques & Ornements",
      description: "Crée des bijoux éphémères et durables à partir de fleurs, de feuilles et de graines, capturant la beauté fugace de la flore.", 
      image: "https://images.unsplash.com/photo-1611652033933-913711993922?q=80&w=1974&auto=format&fit=crop", 
      commune: "Deshaies",
      contact: "0590 XX XX XX",
      featured: true,
      category: "Bijoux"
    },
    {
      id: 5,
      name: "Bois Ancestral",
      craft: "Sculpture sur Bois & Objets Rituels",
      description: "Travaille les bois flottés et les essences locales pour donner vie à des sculptures intuitives et des objets de rituels connectés aux ancêtres.",
      image: "https://images.unsplash.com/photo-1595053910376-7b0a701a5d6a?q=80&w=1974&auto=format&fit=crop",
      commune: "Goyave",
      contact: "bois.ancestral@email.com",
      featured: false,
      category: "Sculpture"
    }
];

function getStoredCreators() {
    try {
        const data = localStorage.getItem('creators');
        if (!data) {
            localStorage.setItem('creators', JSON.stringify(initialCreators));
            return initialCreators;
        }
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading creators from localStorage:", error);
        return initialCreators;
    }
}

export function getAllCreators() {
    return getStoredCreators();
}