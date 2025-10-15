import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, MapPin, Star, Heart, Phone, Feather, Zap, Waves, Leaf, BrainCircuit, Moon, Shield, Gem, Brush, Instagram, Facebook, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';

const needsConfig = {
  "réconfort": { icon: Feather, label: "Réconfort", elements: ["Terre"] },
  "énergie": { icon: Zap, label: "Énergie", elements: ["Feu"] },
  "libération": { icon: Waves, label: "Libération", elements: ["Eau"] },
  "ancrage": { icon: Leaf, label: "Ancrage", elements: ["Terre"] },
  "paix": { icon: BrainCircuit, label: "Paix", elements: ["Air"] },
  "féminin": { icon: Moon, label: "Féminin Sacré", elements: ["Eau", "Ether"] },
  "transformation": { icon: Shield, label: "Transformation", elements: ["Feu"] },
  "potentiel": { icon: Gem, label: "Potentiel", elements: ["Ether"] },
  "découverte": { icon: Search, label: "Découverte", elements: [] },
};

const DirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const initialNeed = new URLSearchParams(location.search).get('besoin') || '';
  const [selectedNeed, setSelectedNeed] = useState(initialNeed);
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTherapists = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('therapists')
        .select('id, name, commune, vibrational_phrase, profile_photo_url, portrait_photo_url, practice_photos, elements, experiences, social_links')
        .eq('is_approved', true);

      if (error) {
        console.error('Error fetching therapists:', error);
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Impossible de charger les thérapeutes'
        });
        setIsLoading(false);
        return;
      }

      const formattedTherapists = data.map(t => ({
        id: t.id,
        name: t.name,
        commune: t.commune,
        vibrationalPhrase: t.vibrational_phrase || '',
        image: (t.practice_photos && t.practice_photos.length > 0) ? t.practice_photos[0] : (t.profile_photo_url || t.portrait_photo_url || ''),
        elements: t.elements || [],
        experiences: t.experiences || {},
        socialLinks: t.social_links || {},
        rating: 0
      }));

      setTherapists(formattedTherapists);
      setIsLoading(false);
    };

    fetchTherapists();
  }, []);

  useEffect(() => {
    const needParam = new URLSearchParams(location.search).get('besoin');
    if (needParam) {
      setSelectedNeed(needParam);
    }
  }, [location.search]);

  const filteredTherapists = useMemo(() => {
    return therapists.filter(therapist => {
      const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           therapist.vibrationalPhrase.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesNeed = !selectedNeed;
      if (selectedNeed && needsConfig[selectedNeed]) {
        const needElements = needsConfig[selectedNeed].elements;
        if (needElements.length === 0) {
          matchesNeed = true;
        } else {
          matchesNeed = therapist.elements && therapist.elements.some(element => needElements.includes(element));
        }
      }
      
      return matchesSearch && matchesNeed;
    });
  }, [searchTerm, selectedNeed, therapists]);

  const contactTherapist = (therapist) => {
    toast({
      title: `🌟 Connexion avec ${therapist.name}`,
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀"
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedNeed('');
  };

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Annuaire des Thérapeutes - Thérapies Holistiques Guadeloupe</title>
        <meta name="description" content="Découvrez notre annuaire complet des thérapeutes holistiques en Guadeloupe. Trouvez votre praticien idéal par spécialité et localisation." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="aura-text font-['Dancing_Script']">
                Annuaire des Thérapeutes
              </span>
            </h1>
             <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Explorez un réseau d'âmes-médecines, d'artistes sacrés et d'artisans du vivant. Chaque praticien est une étoile, laissez votre cœur vous guider vers la vibration qui résonne avec vous.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background/50 backdrop-blur-sm border-b border-border/20 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-1 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un thérapeute..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                />
              </div>
              <Button 
                onClick={() => navigate('/annuaire-creations')}
                variant="outline"
                className="w-full text-left justify-start pl-10 pr-4 py-3 h-auto rounded-xl border border-input bg-background hover:bg-accent/10 transition-all duration-300 relative"
              >
                <Brush className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                Rechercher une création
              </Button>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:col-span-2">
              <Button onClick={() => setSelectedNeed('')} variant={selectedNeed === '' ? 'default' : 'outline'} className="flex-shrink-0">Tous</Button>
              {Object.entries(needsConfig).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <Button key={key} onClick={() => setSelectedNeed(key)} variant={selectedNeed === key ? 'default' : 'outline'} className="flex-shrink-0">
                    <Icon className={`w-4 h-4 mr-2`} />
                    {config.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-lg text-foreground/80">Chargement des thérapeutes...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-lg text-foreground/80">
                  {filteredTherapists.length} thérapeute{filteredTherapists.length > 1 ? 's' : ''} trouvé{filteredTherapists.length > 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredTherapists.map((therapist, index) => {
              return (
                <motion.div
                  key={therapist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                  className="therapy-card rounded-3xl p-6 relative overflow-hidden flex flex-col"
                >
                  {therapist.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Vedette
                    </div>
                  )}

                  <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative">
                      <img
                        className="w-full h-48 md:h-full object-cover rounded-2xl shadow-lg"
                        alt={`${therapist.name}, thérapeute holistique`}
                        src={therapist.image}
                        loading="lazy" />
                    </div>

                    <div className="md:col-span-2 space-y-4 flex flex-col">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-2">
                          <span className="aura-text font-['Dancing_Script']">
                            {therapist.name}
                          </span>
                        </h3>
                        <p className="text-foreground/80 leading-relaxed italic mb-3">
                          "{therapist.vibrationalPhrase}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-foreground/80">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{therapist.commune}</span>
                        </div>
                        <div className="flex items-center text-foreground/80">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="ml-1 font-semibold">{therapist.rating > 0 ? therapist.rating : 'N/A'}</span>
                        </div>
                      </div>

                      {(therapist.socialLinks?.instagram || therapist.socialLinks?.facebook || therapist.socialLinks?.website) && (
                        <div className="flex justify-start gap-3 pt-3 border-t border-border/50">
                          {therapist.socialLinks?.instagram && (
                            <a
                              href={therapist.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
                              title="Instagram"
                            >
                              <Instagram className="w-5 h-5 text-purple-600" />
                            </a>
                          )}
                          {therapist.socialLinks?.facebook && (
                            <a
                              href={therapist.socialLinks.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 transition-all"
                              title="Facebook"
                            >
                              <Facebook className="w-5 h-5 text-blue-600" />
                            </a>
                          )}
                          {therapist.socialLinks?.website && (
                            <a
                              href={therapist.socialLinks.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 hover:from-green-500/30 hover:to-teal-500/30 transition-all"
                              title="Site Web"
                            >
                              <Globe className="w-5 h-5 text-green-600" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => contactTherapist(therapist)}
                      className="bg-gradient-to-r from-element-bois to-element-eau hover:from-element-bois/90 hover:to-element-eau/90 text-white px-4 py-2 rounded-full flex-1"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contacter
                    </Button>
                    <Link to={`/therapeute/${therapist.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="border-2 border-primary text-primary hover:bg-secondary w-full px-4 py-2 rounded-full"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Voir le profil
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
                })}
              </div>

              {filteredTherapists.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-card to-background flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground/80 mb-4">
                Aucun thérapeute trouvé
              </h3>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos critères de recherche ou effacez les filtres.
              </p>
              <Button
                onClick={clearFilters}
                className="bg-gradient-to-r from-element-bois to-element-eau text-white px-6 py-3 rounded-full"
              >
                Voir tous les thérapeutes
              </Button>
            </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default DirectoryPage;