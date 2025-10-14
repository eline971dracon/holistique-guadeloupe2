import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, MapPin, Palette, Hammer, Sparkles, Mail, Phone, Brush, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';

const categoriesConfig = {
  "Peinture": { icon: Palette, label: "Peinture" },
  "Sculpture": { icon: Hammer, label: "Sculpture" },
  "Bijoux": { icon: Sparkles, label: "Bijoux" },
  "Tissage": { icon: Brush, label: "Tissage" },
  "Poterie": { icon: Palette, label: "Poterie" }
};

const CreationsDirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('id, name, email, phone, commune, art_type, description, profile_photo_url, art_photos, inspiration, message')
        .eq('is_approved', true);

      if (error) {
        console.error('Error fetching creators:', error);
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Impossible de charger les créateurs'
        });
        setIsLoading(false);
        return;
      }

      const formattedCreators = data.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        commune: c.commune,
        craft: c.art_type,
        category: c.art_type,
        description: c.description || '',
        image: (c.art_photos && c.art_photos.length > 0) ? c.art_photos[0] : (c.profile_photo_url || '/placeholder-art.jpg'),
        inspiration: c.inspiration || '',
        message: c.message || ''
      }));

      setCreators(formattedCreators);
      setIsLoading(false);
    };

    fetchCreators();
  }, [toast]);

  const filteredCreators = useMemo(() => {
    return creators.filter(creator => {
      const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           creator.craft.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           creator.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || creator.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, creators]);

  const viewCreatorProfile = (creatorId) => {
    navigate(`/createur/${creatorId}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Annuaire des Créations - Artisans Holistiques Guadeloupe</title>
        <meta name="description" content="Découvrez notre annuaire d'artisans et créateurs holistiques en Guadeloupe. Trouvez des créations uniques et inspirées." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mb-6 border-2 border-primary text-primary hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="aura-text font-['Dancing_Script']">
                Annuaire des Créations
              </span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Plongez dans un univers où la matière prend âme. Chaque création est une porte, une histoire, une vibration. Laissez-vous toucher par l'art qui guérit.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background/50 backdrop-blur-sm border-b border-border/20 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une création, un artisan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:col-span-2">
              <Button onClick={() => setSelectedCategory('')} variant={selectedCategory === '' ? 'default' : 'outline'} className="flex-shrink-0">Toutes</Button>
              {Object.entries(categoriesConfig).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <Button key={key} onClick={() => setSelectedCategory(key)} variant={selectedCategory === key ? 'default' : 'outline'} className="flex-shrink-0">
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
              <p className="mt-4 text-lg text-foreground/80">Chargement des créations...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-lg text-foreground/80">
                  {filteredCreators.length} création{filteredCreators.length > 1 ? 's' : ''} trouvée{filteredCreators.length > 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCreators.map((creator, index) => {
              return (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                  className="therapy-card rounded-3xl p-6 relative overflow-hidden flex flex-col"
                >
                  <img
                    className="w-full h-48 object-cover rounded-2xl shadow-lg mb-4"
                    alt={`Création par ${creator.name}`}
                    src={creator.image}
                    loading="lazy" />

                  <div className="flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold mb-1">
                      <span className="aura-text font-['Dancing_Script']">
                        {creator.name}
                      </span>
                    </h3>
                    <p className="font-semibold text-primary mb-3">{creator.craft}</p>
                    <p className="text-foreground/80 leading-relaxed text-sm flex-grow mb-4">
                      {creator.description}
                    </p>
                    <div className="flex items-center text-foreground/80 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{creator.commune}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-3">
                    <Button
                      onClick={() => viewCreatorProfile(creator.id)}
                      className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-4 py-2 rounded-full"
                    >
                      Voir le profil
                    </Button>
                    <Button
                      onClick={() => window.location.href = `mailto:${creator.email || ''}`}
                      variant="outline"
                      className="w-full border-2 border-primary text-primary hover:bg-secondary rounded-full"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contacter
                    </Button>
                  </div>
                </motion.div>
              );
                })}
              </div>

              {filteredCreators.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-card to-background flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground/80 mb-4">
                Aucune création trouvée
              </h3>
              <p className="text-muted-foreground mb-6">
                L'inspiration est partout. Essayez de modifier vos critères de recherche.
              </p>
              <Button
                onClick={clearFilters}
                className="bg-gradient-to-r from-element-bois to-element-eau text-white px-6 py-3 rounded-full"
              >
                Voir toutes les créations
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

export default CreationsDirectoryPage;