import React from 'react';
import { Helmet } from 'react-helmet';
import { Heart, Waves, Sparkles, Droplets } from 'lucide-react';
import ElineHeroSection from '@/components/eline/ElineHeroSection';
import ElineServicesSection from '@/components/eline/ElineServicesSection';
import ElineAboutSection from '@/components/eline/ElineAboutSection';
import ElineContactSection from '@/components/eline/ElineContactSection';

const ElinePage = () => {
  const elineData = {
    name: "Éline",
    image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/edc3b0d882ea62edde7b49eef530a893.jpg",
    mantra: "L'eau se souvient de tout, ton corps aussi.",
    stats: {
      location: "Pointe-à-Pitre, Nature ou Capesterre Belle Eau"
    },
    contactInfo: {
      phone: "0590 XX XX XX",
      email: "eline.dracon@therapie-gp.com"
    },
    services: [
      {
        id: "rituel-dome-eau-terre",
        icon: Droplets,
        title: "Rituel du Dôme Le trône de l'Eau et de la Terre",
        description: "Enracinement et lâcher prise.",
        duration: "60 minutes",
        price: "111 €"
      },
      {
        id: "rituel-reharmonisation",
        icon: Heart,
        title: "Rituel Réharmonisation",
        description: "Soin massage d'entretien vibratoire",
        duration: "75 min",
        price: "111€",
        image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/746eb9998a27453610070f44ba9cfe74.jpg"
      },
      {
        id: "rituel-terre-vagues",
        icon: Waves,
        title: "Rituel entre Terre, Vagues et Feu",
        description: "Rituel sensoriel au cœur des éléments",
        duration: "120 minutes", 
        price: "222€"
      },
      {
        id: "rituel-terre-feu",
        icon: Sparkles,
        title: "Rituel Roots Renaissance",
        description: "Rituel de transmutation, d’ancrage et de renaissance.",
        duration: "Demi-journée",
        price: "333€"
      }
    ],
    aboutImage: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/131e7588c8e62709cefcef4ce33640bd.jpg"
  };

  return (
    <div className="pt-16">
      <Helmet>
        <title>{elineData.name} - Thérapeute Holistique Guadeloupe - Terra Nova</title>
        <meta name="description" content={`Découvrez ${elineData.name}, maître en massage énergétique et somatique en Guadeloupe. Spécialiste en libération énergétique et bien-être holistique.`} />
      </Helmet>

      <ElineHeroSection 
        name={elineData.name} 
        image={elineData.image} 
        mantra={elineData.mantra}
        stats={elineData.stats}
        contactInfo={elineData.contactInfo}
      />
      <ElineServicesSection services={elineData.services} />
      <ElineAboutSection 
        image={elineData.aboutImage} 
      />
      <ElineContactSection />
    </div>
  );
};

export default ElinePage;