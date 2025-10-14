import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Heart, Palette, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const RegistrationTypePage = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const correctPassword = 'SIRIUS 2025';

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsUnlocked(true);
      toast({
        title: 'Accès autorisé',
        description: 'Bienvenue dans l\'espace d\'inscription',
      });
    } else {
      toast({
        title: 'Mot de passe incorrect',
        description: 'Veuillez vérifier votre mot de passe vibratoire',
        variant: 'destructive',
      });
    }
  };

  const handleTypeSelection = (type) => {
    if (type === 'therapist') {
      navigate('/inscription-therapeute');
    } else if (type === 'creator') {
      navigate('/inscription-artiste');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="pt-24 pb-12 min-h-screen flex items-center justify-center mystical-gradient">
        <Helmet>
          <title>Inscription - Espace Protégé - Terra Nova</title>
          <meta name="description" content="Accédez à l'espace d'inscription sécurisé" />
        </Helmet>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="crystal-card rounded-3xl p-8 md:p-12 max-w-md w-full mx-4"
        >
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 aura-text font-['Dancing_Script']">
              Espace Protégé
            </h1>
            <p className="text-foreground/80">
              Entrez le mot de passe vibratoire pour accéder à l'inscription
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password" className="text-lg mb-2 block">
                Mot de passe vibratoire
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe vibratoire"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 text-lg text-center pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg py-6 rounded-full shadow-lg energy-pulse"
            >
              Déverrouiller
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 min-h-screen mystical-gradient">
      <Helmet>
        <title>Choisir votre type d'inscription - Terra Nova</title>
        <meta name="description" content="Inscrivez-vous en tant que thérapeute ou créateur" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 aura-text font-['Dancing_Script']">
            Bienvenue dans l'Espace d'Inscription
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Choisissez le type d'inscription qui correspond à votre activité holistique
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="crystal-card rounded-3xl p-8 md:p-10 text-center hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            onClick={() => handleTypeSelection('therapist')}
          >
            <Heart className="w-20 h-20 mx-auto mb-6 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-3xl font-bold mb-4 aura-text font-['Dancing_Script']">
              Thérapeute Holistique
            </h2>
            <p className="text-foreground/80 mb-8 leading-relaxed">
              Inscrivez-vous dans l'annuaire des thérapeutes pour partager vos pratiques de soins énergétiques, méditation, rituels et accompagnements holistiques
            </p>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-lg py-6 rounded-full shadow-lg"
            >
              S'inscrire comme Thérapeute
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="crystal-card rounded-3xl p-8 md:p-10 text-center hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            onClick={() => handleTypeSelection('creator')}
          >
            <Palette className="w-20 h-20 mx-auto mb-6 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-3xl font-bold mb-4 aura-text font-['Dancing_Script']">
              Créateur / Artiste
            </h2>
            <p className="text-foreground/80 mb-8 leading-relaxed">
              Rejoignez l'annuaire des créateurs pour présenter vos créations artistiques, ateliers créatifs et expressions de l'âme
            </p>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white text-lg py-6 rounded-full shadow-lg"
            >
              S'inscrire comme Créateur
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationTypePage;
