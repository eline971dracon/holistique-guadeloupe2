import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Star, Heart, Phone, Globe, MapPin, Calendar, Sun, Wind, Droplets, Mountain, Star as StarIcon, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { experienceCategories } from '@/lib/journeyData';

const elementConfig = {
  "Terre": { icon: Mountain, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  "Feu": { icon: Sun, color: "text-red-600", bgColor: "bg-red-100" },
  "Eau": { icon: Droplets, color: "text-blue-600", bgColor: "bg-blue-100" },
  "Air": { icon: Wind, color: "text-sky-600", bgColor: "bg-sky-100" },
  "Éther": { icon: StarIcon, color: "text-purple-600", bgColor: "bg-purple-100" },
  "default": { icon: Heart, color: "text-pink-600", bgColor: "bg-pink-100" }
};

const TherapistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    const fetchTherapist = async () => {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching therapist:', error);
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Impossible de charger le profil'
        });
        navigate('/annuaire');
        return;
      }

      if (!data) {
        navigate('/annuaire');
        return;
      }

      const formattedTherapist = {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        commune: data.commune,
        relianceDirecte: data.reliance_directe || '',
        presenceInspirante: data.presence_inspirante || '',
        vibrationalPhrase: data.vibrational_phrase || '',
        mission: data.mission || '',
        approach: data.approach || '',
        messageBienvenue: data.message_bienvenue || '',
        mantra: data.mantra || '',
        image: data.portrait_photo_url || '/placeholder-therapist.jpg',
        artPhoto: data.art_photo_url || '',
        elements: data.elements || [],
        experiences: data.experiences || {},
        intentions: data.intentions || [],
        durations: data.durations || [],
        locations: data.locations || [],
        rating: 0
      };

      setTherapist(formattedTherapist);
    };

    fetchTherapist();
  }, [id, navigate, toast]);
  
  const handleManageProfile = () => {
    localStorage.setItem('loggedInUserId', therapist.id);
    toast({
      title: `Bienvenue, ${therapist.name} !`,
      description: "Vous êtes maintenant connecté(e) et pouvez gérer votre fiche.",
    });
    navigate('/mon-compte/modifier-profil');
  };

  const getSubcategoryLabel = (categoryId, subcategoryId) => {
    const category = experienceCategories.find(c => c.id === categoryId);
    if (category) {
      const subcategoryObj = category.subcategories.find(sc => sc.id === subcategoryId);
      return subcategoryObj ? subcategoryObj.label : subcategoryId;
    }
    return subcategoryId;
  };

  if (!therapist) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Helmet>
        <title>{therapist.name} - Thérapeute Holistique Guadeloupe</title>
        <meta name="description" content={`${therapist.name}, praticien·ne en Guadeloupe. ${therapist.vibrationalPhrase}`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <Link to="/annuaire">
          <Button variant="outline" className="border-2 border-slate-300 text-slate-600 hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'annuaire
          </Button>
        </Link>
        <Button onClick={handleManageProfile} variant="secondary">
          <Edit className="w-4 h-4 mr-2" />
          Gérer ma fiche
        </Button>
      </div>

      <section className="mystical-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="aura-text font-['Dancing_Script']">
                  {therapist.name}
                </span>
              </h1>

              <div className="flex flex-wrap gap-2">
                {therapist.elements.map(el => {
                  const ElemIcon = elementConfig[el]?.icon || elementConfig.default.icon;
                  return (
                    <div key={el} className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${elementConfig[el]?.bgColor} ${elementConfig[el]?.color}`}>
                      <ElemIcon className="w-4 h-4" /> {el}
                    </div>
                  );
                })}
              </div>

              <p className="text-lg text-white leading-relaxed italic">
                "{therapist.vibrationalPhrase}"
              </p>

              {therapist.mantra && (
                <p className="text-xl text-white font-semibold">
                  Mantra: "{therapist.mantra}"
                </p>
              )}


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-white">
                  <Star className="w-5 h-5 text-amber-400" />
                  <span>{therapist.rating > 0 ? `${therapist.rating}/5` : 'Nouveau membre'}</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  <span>Terre d'Ancrage: {therapist.commune}</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span>Reliance directe: {therapist.relianceDirecte}</span>
                </div>
                {therapist.presenceInspirante && (
                  <div className="flex items-center space-x-3 text-white">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <span>Présence inspirante: {therapist.presenceInspirante}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => toast({ title: "🚧 Bientôt disponible !" })}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-full energy-pulse"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Réserver une Séance
                </Button>
                
                <Button 
                  onClick={() => toast({ title: "🚧 Bientôt disponible !" })}
                  variant="outline" 
                  className="border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-full"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contacter
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-3xl blur-3xl floating-animation"></div>
              <img  
                className="relative w-full h-96 lg:h-full object-cover rounded-3xl shadow-2xl chakra-glow" 
                alt={`${therapist.name}, thérapeute holistique`}
               src={therapist.image} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="aura-text font-['Dancing_Script']">
                    Ma Mission de Cœur
                </span>
                </h2>
                {therapist.mission && (
                    <p className="text-xl text-foreground max-w-3xl mx-auto">
                        {therapist.mission}
                    </p>
                )}
            </motion.div>
            
            {therapist.experiences && Object.keys(therapist.experiences).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
                    <span className="aura-text font-['Dancing_Script']">Mes Pratiques</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.entries(therapist.experiences).map(([categoryId, subcategories]) => {
                    const category = experienceCategories.find(c => c.id === categoryId);
                    if (!category) return null;
                    const Icon = category.icon;
                    return (
                      <div key={categoryId} className="crystal-card rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Icon className="w-8 h-8 text-primary" />
                            <h3 className="text-2xl font-semibold font-['Dancing_Script'] aura-text">{category.title}</h3>
                        </div>
                        <ul className="space-y-2 list-inside">
                          {subcategories.map(subcategoryId => (
                            <li key={subcategoryId} className="flex items-center text-foreground">
                                <Heart className="w-4 h-4 mr-3 text-emerald-400 flex-shrink-0" />
                                {getSubcategoryLabel(categoryId, subcategoryId)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {therapist.approach && (
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center"
              >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="aura-text font-['Dancing_Script']">
                      Mon Approche
                  </span>
                  </h2>
                  <p className="text-xl text-foreground max-w-3xl mx-auto">
                      {therapist.approach}
                  </p>
              </motion.div>
            )}

            {therapist.messageBienvenue && (
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center"
              >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="aura-text font-['Dancing_Script']">
                      Un Message Pour Toi
                  </span>
                  </h2>
                  <p className="text-xl text-foreground max-w-3xl mx-auto">
                      "{therapist.messageBienvenue}"
                  </p>
              </motion.div>
            )}
        </div>
      </section>

    </div>
  );
};

export default TherapistProfile;