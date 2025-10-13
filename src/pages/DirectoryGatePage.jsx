import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const DirectoryGatePage = () => {
  const [charterAccepted, setCharterAccepted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (charterAccepted) {
      navigate('/annuaire');
    } else {
      toast({
        variant: "destructive",
        title: "Engagement Requis",
        description: "Veuillez accepter la charte vibratoire pour continuer."
      });
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center mystical-gradient">
      <Helmet>
        <title>Charte Vibratoire - Réseau Holistique</title>
        <meta name="description" content="Découvrez et acceptez la Charte Vibratoire du Réseau Holistique de Guadeloupe pour accéder à l'annuaire des praticiens." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="crystal-card rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto"
      >
        <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary floating-animation" />
        <h1 className="text-3xl md:text-4xl font-bold mb-6 aura-text font-['Dancing_Script']">
          Charte Vibratoire du Réseau Holistique de Guadeloupe
        </h1>
        <p className="text-foreground/80 mb-8 leading-relaxed">
          Bienvenue dans cet espace sacré.<br /><br />
          Ce réseau n’est ni un catalogue, ni un simple marché de bien-être.<br />
          Il est un lieu de résonance profonde, où chaque vibration singulière est reconnue, honorée et célébrée en reliance avec le Tout.<br />
          C’est un sanctuaire vivant, tissé de présences, de chants silencieux et d’énergies en mouvement.<br />
          Chaque praticien est une étoile dans cette constellation unique.<br />
          Tu ne les rencontres pas par hasard : une loi subtile d’attraction œuvre déjà en toi.<br />
          Laisse ton regard flotter, laisse ton cœur écouter…<br />
          La vibration qui résonne avec ton âme se révélera d’elle-même, telle une clé qui retrouve sa serrure.<br />
          Ici, tout est rencontre sacrée.<br />
          Prends ton temps, avance en conscience, et laisse la résonance guider tes pas.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-foreground/80 mt-8 mb-6 leading-relaxed"
        >
          <p className="mb-4">
            Pour continuer ton accès à l'annuaire sacré, merci de confirmer ton accord et ton engagement envers cette Charte Vibratoire.
          </p>
        </motion.div>

        <div className="flex items-start justify-center space-x-3 bg-background/30 p-4 rounded-xl border border-primary/20 shadow-inner">
          <Checkbox id="charter" checked={charterAccepted} onCheckedChange={setCharterAccepted} className="mt-1 w-5 h-5" />
          <Label htmlFor="charter" className="text-base text-foreground/90 font-medium leading-normal">
            Je reconnais et j’accepte la Charte Vibratoire du Réseau Holistique de Guadeloupe.
          </Label>
        </div>

        <Button onClick={handleContinue} disabled={!charterAccepted} size="lg" className="w-full mt-10 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-xl rounded-full shadow-lg energy-pulse">
          Entrer dans l'Annuaire Sacré
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};

export default DirectoryGatePage;