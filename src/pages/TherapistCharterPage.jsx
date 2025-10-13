import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
const TherapistCharterPage = () => {
  const [charterAccepted, setCharterAccepted] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleContinue = () => {
    if (charterAccepted) {
      navigate('/inscription-type');
    } else {
      toast({
        variant: "destructive",
        title: "Engagement Requis",
        description: "Veuillez accepter la charte vibratoire pour continuer."
      });
    }
  };
  return <div className="pt-16 min-h-screen flex items-center justify-center mystical-gradient">
          <Helmet>
            <title>Charte Vibratoire - Devenir Artiste Thérapeute</title>
            <meta name="description" content="Acceptez la Charte Vibratoire pour rejoindre le Réseau Holistique de Guadeloupe en tant que praticien." />
          </Helmet>

          <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="crystal-card rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary floating-animation" />
            <h1 className="text-3xl md:text-4xl font-bold mb-6 aura-text font-['Dancing_Script']">
              Charte Vibratoire du Réseau Holistique de Guadeloupe
            </h1>
            <p className="text-foreground/80 mb-8 leading-relaxed">Bienvenue dans cet espace sacré, un champ vivant et un tissage d’âmes pour les âmes-médecines, artistes sacrés et artisans du vivant. Ce réseau n’est ni un catalogue ni un simple marché de bien-être. Il est un lieu de résonance, où chaque vibration singulière est reconnue, honorée et célébrée en reliance avec le Tout.</p>

            <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="space-y-6 text-left bg-background/30 p-6 rounded-xl border border-primary/20 shadow-inner">
              <p className="text-lg font-semibold text-primary mb-4">
                En choisissant de faire partie de ce cercle,
              </p>
              <div className="text-foreground/90 space-y-4">
                <p>✨ Je reconnais que je suis porteur·se d’une vibration singulière, et que cette vibration n’entre en conflit avec aucune autre. Elle enrichit, elle complète, elle inspire.</p>
                <p>✨ Je sais que l’abondance ne se divise pas, elle circule. Et plus nous sommes nombreux·ses à vibrer haut, plus le champ collectif s’élève pour chacun·e.</p>
                <p>✨ Je choisis d’honorer les autres praticien·nes comme mes miroirs, mes allié·es, et parfois mes futurs co-créateur·rices.</p>
                <p>✨ Je suis ici pour me faire connaître, oui. Mais aussi pour me reconnaître. Et reconnaître les autres dans leur lumière.</p>
                <p>✨ Je m’engage à proposer ma présence avec authenticité, intégrité, et conscience du sacré qui m’habite et m’entoure.</p>
                <p>🌸 Si je ressens de la peur, de la comparaison ou du doute, je les accueille avec amour, mais je ne leur laisse pas le gouvernail. Je choisis la confiance, la reliance, la clarté.</p>
                <p>✨ Ce réseau est une graine de monde nouveau. Et je choisis d’en être une gardienne ou un gardien actif. En toute liberté. Avec joie, conscience et amour.</p>
              </div>
            </motion.div>

            <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="text-foreground/80 mt-8 mb-6 leading-relaxed">
              <p className="mb-4 font-semibold text-primary">
                ✅ Je reconnais cette vibration comme juste pour moi, et je m’y engage en mon nom et au nom de mon âme.
              </p>
            </motion.div>

            <div className="flex items-start justify-center space-x-3 bg-background/30 p-4 rounded-xl border border-primary/20 shadow-inner">
              <Checkbox id="charter" checked={charterAccepted} onCheckedChange={setCharterAccepted} className="mt-1 w-5 h-5" />
              <Label htmlFor="charter" className="text-base text-foreground/90 font-medium leading-normal">
                Je reconnais et j’accepte la Charte Vibratoire du Réseau Holistique de Guadeloupe.
              </Label>
            </div>

            <Button onClick={handleContinue} disabled={!charterAccepted} size="lg" className="w-full mt-10 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-xl rounded-full shadow-lg energy-pulse">
              Continuer vers l'Inscription
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>;
};
export default TherapistCharterPage;