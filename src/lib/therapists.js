const initialTherapists = [
    { 
      id: 1, 
      name: "Éline", 
      vibrationalPhrase: "Je t'aide à renouer avec la mémoire de ton corps et l'intelligence de l'eau.", 
      image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/31d0e86a-732d-4c00-87e3-8bc851042c67/63be44ae937c11b4281137e9f223f814.jpg", 
      elements: ['Eau', 'Éther'], 
      commune: "Pointe-à-Pitre", 
      rating: 5.0, 
      featured: true, 
      relianceDirecte: "0590 XX XX XX",
      presenceInspirante: "WhatsApp",
      experiences: {
        "soin_energetique": ["massage_intuitif", "harmonisation_energetique"],
        "nettoyage_purification": ["reconnexion_eau", "nettoyage_vibratoire"],
      },
      approach: "Mon approche est douce et intuitive, je vous guide à écouter les messages de votre corps à travers l'élément Eau.",
      mantra: "L'eau se souvient de tout, ton corps aussi.",
      mission: "Ma mission est d'accompagner chaque femme à se reconnecter à sa puissance cyclique et à l'intelligence de son corps, pour qu'elle puisse naviguer sa vie avec plus de fluidité et de confiance.",
      messageBienvenue: "Bienvenue à toi, âme sensible. Je t'invite à plonger dans tes profondeurs avec douceur."
    },
    { 
      id: 2, 
      name: "Maya Soleil", 
      vibrationalPhrase: "Je t'accompagne pour transformer tes ombres en lumière et réveiller ton feu sacré.", 
      image: "https://images.unsplash.com/photo-1686224614035-f85bd58180d0", 
      elements: ['Feu', 'Air'], 
      commune: "Basse-Terre", 
      rating: 4.9, 
      featured: false, 
      relianceDirecte: "Non communiqué",
      presenceInspirante: "@mayasoleil",
      experiences: {
        "soin_energetique": ["soin_sonore"],
        "danses_songes": ["danse_intuitive", "danse_medecine"]
      },
      approach: "J'utilise le mouvement et l'énergie pour libérer ce qui est bloqué et réveiller votre puissance intérieure.",
      mantra: "Ta puissance est une danse, laisse-la s'exprimer.",
      mission: "Je suis ici pour te rappeler que tu es le soleil. Ma mission est d'attiser ta flamme intérieure pour que tu rayonnes sans peur.",
      messageBienvenue: "Que ta flamme intérieure s'éveille ! Ensemble, transformons ce qui doit l'être."
    },
    { 
      id: 3, 
      name: "Léo Gaïa", 
      vibrationalPhrase: "Je te guide pour t'ancrer dans la Terre et y puiser ta force créatrice.", 
      image: "https://images.unsplash.com/photo-1595872018818-97555653a011", 
      elements: ['Terre', 'Feu'], 
      commune: "Le Gosier", 
      rating: 4.8, 
      featured: false, 
      relianceDirecte: "Non communiqué",
      presenceInspirante: "leo.gaia@email.com",
      experiences: {
        "creation_ame": ["artisanat_sacre"],
        "histoires_sagesses": ["cercle_conte"],
      },
      approach: "À travers la création manuelle et le partage, je vous aide à vous reconnecter à la Terre et à votre propre stabilité.",
      mantra: "Tes mains savent ce que ton âme a à dire.",
      mission: "Aider chacun à retrouver son ancrage et à sentir qu'il a sa place sur cette Terre, en créant avec ses mains et son coeur.",
      messageBienvenue: "La Terre t'attend. Viens te déposer et sentir tes racines grandir."
    },
    { 
      id: 4, 
      name: "Clara Céleste", 
      vibrationalPhrase: "Par le souffle et la parole, je t'aide à clarifier ton esprit et à t'ouvrir à ta guidance intérieure.", 
      image: "https://images.unsplash.com/photo-1595872018818-97555653a011", 
      elements: ['Air', 'Éther'], 
      commune: "Saint-François", 
      rating: 4.9, 
      featured: false, 
      relianceDirecte: "0590 XX XX XX",
      presenceInspirante: "Non communiqué",
      experiences: {
        "meditation_rituels": ["meditation_guidee"],
        "histoires_sagesses": ["enseignement_oral"]
      },
      approach: "Ma pratique est centrée sur la clarté mentale. J'utilise la méditation et des enseignements pour vous aider à trouver vos propres réponses.",
      mantra: "Chaque respiration est une réponse.",
      mission: "Je suis un canal pour la clarté. Ma mission est de t'aider à apaiser le bruit mental pour que tu puisses entendre la voix de ton âme.",
      messageBienvenue: "Laisse tes pensées s'envoler et la clarté t'inonder. Je suis là pour t'écouter."
    },
    { 
        id: 5, 
        name: "Iris Divina", 
        vibrationalPhrase: "Dans le silence, je t'ouvre les portes du cosmos intérieur.", 
        image: "https://images.unsplash.com/photo-1595872018818-97555653a011", 
        elements: ['Éther', 'Eau'], 
        commune: "Sainte-Anne", 
        rating: 5.0, 
        featured: false, 
        relianceDirecte: "Non communiqué",
        presenceInspirante: "calendly.com/iris",
        experiences: {
            "meditation_rituels": ["rituel_passage"],
            "voyage_sensoriel": ["bain_sonore_sensoriel"]
        },
        approach: "Je crée des espaces sacrés où, par le son et le rituel, vous pouvez voyager à l'intérieur de vous-même et vous connecter au mystère.",
        mantra: "Le plus grand des voyages est intérieur.",
        mission: "T'ouvrir à l'invisible, au grand mystère qui vit en toi et autour de toi. Ma mission est de te guider dans ton voyage intérieur.",
        messageBienvenue: "Le mystère t'appelle. Es-tu prêt·e à écouter les murmures de ton âme ?"
      },
];
  
function getStoredTherapists() {
    try {
        const data = localStorage.getItem('therapists');
        if (!data) {
            // Initialize if not present
            localStorage.setItem('therapists', JSON.stringify(initialTherapists));
            return initialTherapists;
        }
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading therapists from localStorage:", error);
        return initialTherapists; // Fallback to initial data
    }
}

function saveTherapists(therapists) {
    try {
        localStorage.setItem('therapists', JSON.stringify(therapists));
    } catch (error) {
        console.error("Error saving therapists to localStorage:", error);
    }
}

export function addTherapist(formData) {
    const therapists = getStoredTherapists();
    const newTherapist = {
        id: Date.now(),
        name: formData.name || "Nouveau Thérapeute",
        vibrationalPhrase: formData.vibrationalPhrase,
        image: formData.portraitPhoto || "https://images.unsplash.com/photo-1595872018818-97555653a011",
        artImage: formData.artPhoto,
        elements: formData.elements,
        commune: formData.commune || "Guadeloupe",
        rating: 0,
        featured: false,
        relianceDirecte: formData.relianceDirecte || "Non spécifié",
        presenceInspirante: formData.presenceInspirante || "Non spécifié",
        experiences: formData.experiences || {},
        approach: formData.approach || "",
        mantra: formData.mantra || "",
        mission: formData.mission || "",
        messageBienvenue: formData.messageBienvenue || "",
        intentions: formData.intentions || [],
        durations: formData.durations || [],
        locations: formData.locations || [],
    };
    const updatedTherapists = [...therapists, newTherapist];
    saveTherapists(updatedTherapists);
    return newTherapist;
}

export function getAllTherapists() {
    return getStoredTherapists();
}
  
export function getTherapistById(id) {
    const allTherapists = getAllTherapists();
    // Use '==' to allow matching string and number IDs
    return allTherapists.find(therapist => therapist.id == id);
}

export function updateTherapist(id, updatedData) {
    let therapists = getAllTherapists();
    const index = therapists.findIndex(t => t.id == id);
    if (index !== -1) {
        therapists[index] = { 
            ...therapists[index], 
            ...updatedData,
            image: updatedData.portraitPhoto || therapists[index].image
        };
        saveTherapists(therapists);
    }
}