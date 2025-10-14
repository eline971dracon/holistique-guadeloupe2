import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Palette, Mail, Phone, Globe, MapPin, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const CreatorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching creator:', error);
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Impossible de charger le profil'
        });
        navigate('/annuaire-creations');
        return;
      }

      if (!data) {
        navigate('/annuaire-creations');
        return;
      }

      setCreator(data);
    };

    fetchCreator();
  }, [id, navigate, toast]);

  const handleContact = () => {
    if (creator.email) {
      window.location.href = `mailto:${creator.email}`;
    } else {
      toast({
        title: 'Contact',
        description: 'Aucune adresse email disponible pour ce créateur.'
      });
    }
  };

  if (!creator) {
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
        <title>{creator.name} - Créateur Artistique - Terra Nova</title>
        <meta name="description" content={`Découvrez le travail créatif de ${creator.name}, ${creator.art_type} en Guadeloupe`} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          onClick={() => navigate('/annuaire-creations')}
          variant="outline"
          className="mb-6 border-2 border-primary text-primary hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'annuaire
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="crystal-card rounded-3xl p-6 sticky top-24">
              {creator.portfolio_url && (
                <img
                  src={creator.portfolio_url}
                  alt={creator.name}
                  className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
                />
              )}

              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2 aura-text font-['Dancing_Script']">
                  {creator.name}
                </h1>
                <p className="text-xl text-primary font-semibold mb-4">
                  {creator.art_type}
                </p>

                <div className="flex items-center justify-center gap-2 text-foreground/70 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{creator.commune}</span>
                </div>
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

                {creator.phone && (
                  <Button
                    onClick={() => window.location.href = `tel:${creator.phone}`}
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
            {creator.description && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Démarche Artistique</h2>
                </div>
                <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                  {creator.description}
                </p>
              </div>
            )}

            {creator.inspiration && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Sources d'Inspiration</h2>
                </div>
                <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                  {creator.inspiration}
                </p>
              </div>
            )}

            {creator.message && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Message</h2>
                </div>
                <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                  {creator.message}
                </p>
              </div>
            )}

            <div className="crystal-card rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-8 h-8 text-purple-500" />
                <h2 className="text-2xl font-bold aura-text">Informations de Contact</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Email</p>
                    <a
                      href={`mailto:${creator.email}`}
                      className="text-lg text-primary hover:underline break-all"
                    >
                      {creator.email}
                    </a>
                  </div>
                </div>

                {creator.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-foreground/70 mb-1">Téléphone</p>
                      <a
                        href={`tel:${creator.phone}`}
                        className="text-lg text-primary hover:underline"
                      >
                        {creator.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Localisation</p>
                    <p className="text-lg">{creator.commune}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="crystal-card rounded-3xl p-8 bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-2 border-purple-500/20">
              <div className="text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-2xl font-bold mb-3 aura-text">Envie de découvrir ce travail créatif ?</h3>
                <p className="text-foreground/80 mb-6">
                  Contactez {creator.name} pour en savoir plus sur ses créations et ses projets artistiques.
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

export default CreatorProfile;
