import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Heart, Waves, Sparkles, Droplets } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ElineHeroSection from '@/components/eline/ElineHeroSection';
import ElineServicesSection from '@/components/eline/ElineServicesSection';
import ElineAboutSection from '@/components/eline/ElineAboutSection';
import ElineContactSection from '@/components/eline/ElineContactSection';
import { supabase } from '@/lib/customSupabaseClient';

const iconMap = {
  'rituel_dome_eau_terre': Droplets,
  'rituel_reharmonisation': Heart,
  'rituel_terre_vagues_feu': Waves,
  'rituel_roots_renaissance': Sparkles
};

const ElinePage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services_content')
          .select('*')
          .order('id');

        if (error) throw error;

        const formattedServices = data.map(service => ({
          id: service.service_key.replace(/_/g, '-'),
          icon: iconMap[service.service_key] || Heart,
          title: service.title,
          description: service.description,
          duration: service.duration,
          price: service.price
        }));

        setServices(formattedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (location.hash === '#services-section' && !isLoading) {
      setTimeout(() => {
        const element = document.getElementById('services-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location, isLoading]);

  const elineData = {
    name: "Éline",
    image: "/unnamed.png",
    mantra: "L'eau se souvient de tout, ton corps aussi.",
    stats: {
      location: "Pointe-à-Pitre, Nature ou Capesterre Belle Eau"
    },
    contactInfo: {
      phone: "0590 XX XX XX",
      email: "eline.dracon@therapie-gp.com"
    },
    services: services,
    aboutImage: "/moi 2.jpg"
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

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