import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Palette, Mail, Phone, Globe, MapPin, Sparkles, Heart, Instagram, Facebook, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const CreatorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [creator, setCreator] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

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

      const sessionUserType = sessionStorage.getItem('userType');
      const sessionUserId = sessionStorage.getItem('userId');
      const localUserType = localStorage.getItem('userType');
      const localUserId = localStorage.getItem('loggedInUserId');

      if ((sessionUserType === 'creator' && sessionUserId === id) ||
          (localUserType === 'creator' && localUserId === id)) {
        setIsOwner(true);
      }
    };

    fetchCreator();
  }, [id, navigate, toast]);

  const handleContact = () => {
    if (creator.phone) {
      toast({
        title: 'Numéro de téléphone',
        description: creator.phone,
        duration: 10000
      });
    } else {
      toast({
        title: 'Contact',
        description: 'Aucun numéro de téléphone disponible pour ce créateur.'
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
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => navigate('/annuaire-creations')}
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'annuaire
          </Button>
          {isOwner && (
            <Button
              onClick={() => navigate('/mon-compte/modifier-profil-createur')}
              className="bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700"
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
              {creator.profile_photo_url && (
                <img
                  src={creator.profile_photo_url}
                  alt={creator.name}
                  className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
                />
              )}

              <div className="text-center mb-6">
                {creator.artist_name && (
                  <h1 className="text-3xl font-bold mb-2 aura-text font-['Dancing_Script']">
                    {creator.artist_name}
                  </h1>
                )}
                <p className="text-xl text-primary font-semibold mb-2">
                  {creator.art_type}
                </p>
                {creator.artist_name && (
                  <p className="text-sm text-foreground/60 mb-4">({creator.name})</p>
                )}
                {!creator.artist_name && (
                  <h1 className="text-3xl font-bold mb-4 aura-text font-['Dancing_Script']">
                    {creator.name}
                  </h1>
                )}

                <div className="flex items-center justify-center gap-2 text-foreground/70 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{creator.commune}</span>
                </div>

                {(creator.social_links?.instagram || creator.social_links?.facebook || creator.social_links?.website) && (
                  <div className="flex justify-center gap-3 mb-4 pt-2 border-t border-border/50">
                    {creator.social_links?.instagram && (
                      <a
                        href={creator.social_links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 transition-all transform hover:scale-110"
                        title="Instagram"
                      >
                        <Instagram className="w-6 h-6 text-purple-600" />
                      </a>
                    )}
                    {creator.social_links?.facebook && (
                      <a
                        href={creator.social_links.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/40 hover:to-blue-600/40 transition-all transform hover:scale-110"
                        title="Facebook"
                      >
                        <Facebook className="w-6 h-6 text-blue-600" />
                      </a>
                    )}
                    {creator.social_links?.website && (
                      <a
                        href={creator.social_links.website}
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
            {creator.art_photos && creator.art_photos.length > 0 && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Galerie de Créations</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {creator.art_photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Création ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => window.open(photo, '_blank')}
                    />
                  ))}
                </div>
              </div>
            )}

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

            {(creator.social_links?.instagram || creator.social_links?.facebook || creator.social_links?.website) && (
              <div className="crystal-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold aura-text">Informations de Contact</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-foreground/70 mb-3">Réseaux Sociaux</p>
                    <div className="flex gap-3">
                      {creator.social_links?.instagram && (
                        <a
                          href={creator.social_links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 transition-all text-purple-600 hover:text-purple-700"
                          title="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                          <span className="text-sm font-medium">Instagram</span>
                        </a>
                      )}
                      {creator.social_links?.facebook && (
                        <a
                          href={creator.social_links.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/40 hover:to-blue-600/40 transition-all text-blue-600 hover:text-blue-700"
                          title="Facebook"
                        >
                          <Facebook className="w-5 h-5" />
                          <span className="text-sm font-medium">Facebook</span>
                        </a>
                      )}
                      {creator.social_links?.website && (
                        <a
                          href={creator.social_links.website}
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
