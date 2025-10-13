import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Helmet } from 'react-helmet';
    import { Shield, UserPlus, ArrowRight } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
    import { Label } from '@/components/ui/label';

    const RegistrationTypePage = () => {
      const [userType, setUserType] = useState(null);
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleContinue = () => {
        if (!userType) {
          toast({
            variant: "destructive",
            title: "Sélection requise",
            description: "Veuillez sélectionner votre statut pour continuer.",
          });
          return;
        }

        if (userType === 'guardian') {
          toast({
            title: "Bienvenue, Gardienne ✨",
            description: "Vous êtes redirigée vers le formulaire d'inscription.",
          });
          navigate('/inscription-formulaire');
        } else if (userType === 'new') {
          toast({
            title: "🚧 Fonctionnalité en cours de développement",
            description: "Le paiement n'est pas encore actif. Vous serez redirigé(e) vers le formulaire. Demandez l'intégration de Stripe pour activer cette fonction ! 🚀",
            duration: 8000
          });
          // In a real scenario, this would redirect to a Stripe checkout page.
          // For now, we simulate success and redirect.
          navigate('/inscription-formulaire', { state: { fromPayment: true } });
        }
      };

      return (
        <div className="pt-24 min-h-screen flex items-center justify-center mystical-gradient">
          <Helmet>
            <title>Statut d'Inscription - Réseau Holistique de Guadeloupe</title>
            <meta name="description" content="Choisissez votre statut pour rejoindre le Réseau Holistique de Guadeloupe." />
          </Helmet>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="crystal-card rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center"
          >
            <UserPlus className="w-16 h-16 mx-auto mb-6 text-primary floating-animation" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 aura-text font-['Dancing_Script']">
              Inscription au Réseau Holistique
            </h1>
            <p className="text-lg text-foreground/80 mb-6">
              Bienvenue dans ce cercle sacré dédié aux âmes-médecines, praticien·ne·s et gardiennes du vivant.
            </p>

            <div className="text-left bg-background/30 p-6 rounded-xl border border-primary/20 shadow-inner mb-8">
              <h2 className="font-bold text-primary mb-2">Important :</h2>
              <ul className="list-disc list-inside space-y-2 text-foreground/90">
                <li>L’inscription est <strong>gratuite</strong> pour les membres du cercle des gardiennes, reconnues et engagées dans la Charte Vibratoire du réseau.</li>
                <li>Pour les nouveaux thérapeutes ou praticiens <strong>hors cercle</strong>, une participation financière est requise afin de valider l’inscription.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold aura-text font-['Dancing_Script']">Veuillez sélectionner votre statut :</h2>
              <RadioGroup value={userType} onValueChange={setUserType} className="flex flex-col md:flex-row gap-6 justify-center">
                <motion.div whileHover={{ y: -5 }} className="flex-1">
                  <RadioGroupItem value="guardian" id="guardian" className="sr-only" />
                  <Label htmlFor="guardian" className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all ${userType === 'guardian' ? 'border-primary bg-primary/10 shadow-lg' : 'border-input'}`}>
                    <Shield className="w-10 h-10 mb-3 text-primary" />
                    <span className="font-bold text-lg">Membre reconnue du cercle des gardiennes</span>
                    <span className="text-sm text-foreground/70">(Inscription gratuite)</span>
                  </Label>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="flex-1">
                  <RadioGroupItem value="new" id="new" className="sr-only" />
                  <Label htmlFor="new" className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all ${userType === 'new' ? 'border-primary bg-primary/10 shadow-lg' : 'border-input'}`}>
                    <UserPlus className="w-10 h-10 mb-3 text-primary" />
                    <span className="font-bold text-lg">Nouveau thérapeute/praticien</span>
                    <span className="text-sm text-foreground/70">(Paiement requis)</span>
                  </Label>
                </motion.div>
              </RadioGroup>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!userType}
              size="lg"
              className="w-full mt-10 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 text-xl rounded-full shadow-lg energy-pulse"
            >
              Valider et Continuer
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      );
    };

    export default RegistrationTypePage;