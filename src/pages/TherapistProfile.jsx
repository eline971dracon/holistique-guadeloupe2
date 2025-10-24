import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Star, Heart, Phone, Globe, MapPin, Calendar, Sun, Wind, Droplets, Mountain, Star as StarIcon, Edit, Instagram, Facebook, Mail, Palette, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { experienceCategories } from '@/lib/journeyData';

const elementConfig = {
  "Terre": {
    icon: Mountain,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    symbol: "🜃",
    fullName: "Terre - 🜃"
  },
  "Feu": {
    icon: Sun,
    color: "text-red-600",
    bgColor: "bg-red-100",
    symbol: "🜂",
    fullName: "Feu - 🜂"
  },
  "Eau": {
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    symbol: "🜄",
    fullName: "Eau - 🜄"
  },
  "Air": {
    icon: Wind,
    color: "text-sky-600",
    bgColor: "bg-sky-100",
    symbol: "🜁",
    fullName: "Air - 🜁"
  },
  "Éther": {
    icon: StarIcon,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    symbol: "✦",
    fullName: "Éther - ✦"
  },
  "default": {
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    symbol: "♡",
    fullName: "Autre"
  }
};

const TherapistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [therapist, setTherapist] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

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

      setTherapist(data);

      const sessionUserType = sessionStorage.getItem('userType');
      const sessionUserId = sessionStorage.getItem('userId');
      const localUserType = localStorage.getItem('userType');
      const localUserId = localStorage.getItem('loggedInUserId');

      if ((sessionUserType === 'therapist' && sessionUserId === id) ||
          (localUserType === 'therapist' && localUserId === id)) {
        setIsOwner(true);
      }
    };

    fetchTherapist();
  }, [id, navigate, toast]);

  const handleContact = () => {
    if (therapist.phone) {
      toast({
        title: 'Numéro de téléphone',
        description: therapist.phone,
        duration: 10000
      });
    } else {
      toast({
        title: 'Contact',
        description: 'Aucun numéro de téléphone disponible pour ce thérapeute.'
      });
    }
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
      <div className="pt-16 min-h-screen flex items-center justify-center mystical-gradient">
        <div className="text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-xl">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen mystical-gradient">
      <Helmet>
        <title>{therapist.name} - Thérapeute Holistique - Terra Nova</title>
        <meta name="description" content={`Découvrez ${therapist.name}, thérapeute holistique en Guadeloupe`} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => navigate('/annuaire')}
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'annuaire
          </Button>
          {isOwner && (
            <Button
              onClick={() => navigate('/mon-compte/modifier-profil')}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Modifier ma fiche
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="crystal-card rounded-3xl p-6 sticky top-24">
              {(therapist.profile_photo_url || therapist.portrait_photo_url) && (
                <img
                  src={therapist.profile_photo_url || therapist.portrait_photo_url}
                  alt={therapist.name}
                  className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
                />
              )}

              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-4 aura-text font-['Dancing_Script']">
                  {therapist.name}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                  {therapist.elements && therapist.elements.map(el => {
                    const ElemIcon = elementConfig[el]?.icon || elementConfig.default.icon;
                    const config = elementConfig[el] || elementConfig.default;
                    return (
                      <div
                        key={el}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${config.bgColor} ${config.color}`}
                      >
                        <span className="text-lg">{config.symbol}</span>
                        <span>{el}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center gap-2 text-foreground/70 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{therapist.commune}</span>
                </div>

                {(therapist.social_links?.instagram || therapist.social_links?.facebook || therapist.social_links?.website) && (
                  <div className="flex justify-center gap-3 mb-4 pt-2 border-t border-border/50">
                    {therapist.social_links?.instagram && (
                      <a
                        href={therapist.social_links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 transition-all transform hover:scale-110"
                        title="Instagram"
                      >
                        <Instagram className="w-6 h-6 text-purple-600" />
                      </a>
                    )}
                    {therapist.social_links?.facebook && (
                      <a
                        href={therapist.social_links.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/40 hover:to-blue-600/40 transition-all transform hover:scale-110"
                        title="Facebook"
                      >
                        <Facebook className="w-6 h-6 text-blue-600" />
                      </a>
                    )}
                    {therapist.social_links?.website && (
                      <a
                        href={therapist.social_links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 hover:from-green-500/40 hover:to-teal-500/40 transition-all transform hover:scale-110"
                        title="Site Web"
                      >
                        <Globe className="w-6 h-6 text-green-600" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleContact}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white rounded-full"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contacter
                </Button>

                {therapist.phone && (
                  <Button
                    onClick={() => window.location.href = `tel:${therapist.phone}`}
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-primary text-primary hover:bg-secondary rounded-full"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Appeler
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {therapist.practice_photos && therapist.practice_photos.length > 0 && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Mon Univers</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {therapist.practice_photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Pratique ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => window.open(photo, '_blank')}
                    />
                  ))}
                </div>
              </div>
            )}

            {therapist.vibrational_phrase && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Phrase Vibratoire</h2>
                </div>
                <p className="text-lg text-foreground/90 leading-relaxed italic">
                  "{therapist.vibrational_phrase}"
                </p>
              </div>
            )}

            {therapist.mission && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Ma Mission de Cœur</h2>
                </div>
                <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                  {therapist.mission}
                </p>
              </div>
            )}

            {therapist.experiences && Object.keys(therapist.experiences).length > 0 && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Mes Pratiques</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(therapist.experiences).map(([categoryId, subcategories]) => {
                    const category = experienceCategories.find(c => c.id === categoryId);
                    if (!category) return null;
                    const Icon = category.icon;
                    return (
                      <div key={categoryId} className="rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-6 h-6 text-primary" />
                          <h3 className="text-lg font-semibold aura-text">{category.title}</h3>
                        </div>
                        <ul className="space-y-2">
                          {subcategories.map(subcategoryId => (
                            <li key={subcategoryId} className="flex items-start text-slate-100 text-base font-medium">
                              <Heart className="w-4 h-4 mr-2 text-teal-500 flex-shrink-0 mt-1" />
                              <span>{getSubcategoryLabel(categoryId, subcategoryId)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                {therapist.other_practice && (
                  <div className="mt-6 rounded-xl p-4">
                    <p className="text-slate-100 text-base font-medium">{therapist.other_practice}</p>
                  </div>
                )}
              </div>
            )}

            {therapist.approach && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Mon Approche</h2>
                </div>
                <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                  {therapist.approach}
                </p>
              </div>
            )}

            {therapist.availability_days && therapist.availability_days.length > 0 && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Disponibilités</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {therapist.availability_days.map((day, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-medium"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(therapist.social_links?.instagram || therapist.social_links?.facebook || therapist.social_links?.website) && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Informations de Contact</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-foreground/70 mb-3">Réseaux Sociaux</p>
                    <div className="flex gap-3 flex-wrap">
                      {therapist.social_links?.instagram && (
                        <a
                          href={therapist.social_links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 transition-all text-purple-600 hover:text-purple-700"
                          title="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                          <span className="text-sm font-medium">Instagram</span>
                        </a>
                      )}
                      {therapist.social_links?.facebook && (
                        <a
                          href={therapist.social_links.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/40 hover:to-blue-600/40 transition-all text-blue-600 hover:text-blue-700"
                          title="Facebook"
                        >
                          <Facebook className="w-5 h-5" />
                          <span className="text-sm font-medium">Facebook</span>
                        </a>
                      )}
                      {therapist.social_links?.website && (
                        <a
                          href={therapist.social_links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 hover:from-green-500/40 hover:to-teal-500/40 transition-all text-green-600 hover:text-green-700"
                          title="Site Web"
                        >
                          <Globe className="w-5 h-5" />
                          <span className="text-sm font-medium">Site Web</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="crystal-card rounded-3xl p-8 bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-2 border-purple-500/20">
              <div className="text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-2xl font-bold mb-3 aura-text">Envie de découvrir cette pratique ?</h3>
                <p className="text-foreground/80 mb-6">
                  Contactez {therapist.name} pour en savoir plus sur ses pratiques et réserver une séance.
                </p>
                <Button
                  onClick={handleContact}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-8 py-6 rounded-full text-lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Prendre contact
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
