import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { KeyRound, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
const TherapistGatePage = () => {
  const [step, setStep] = useState(1);
  const [engagementAccepted, setEngagementAccepted] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleContinueToPassword = () => {
    if (engagementAccepted) {
      setStep(2);
    }
  };
  const handlePasswordSubmit = e => {
    e.preventDefault();
    if (password === 'Sirius2025') {
      setError('');
      navigate('/inscription-therapeute');
    } else {
      setError('Cette clé n\'ouvre pas la porte. Êtes-vous sûr(e) d\'être au bon endroit ?');
    }
  };
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut'
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  };
  return <div className="pt-16 min-h-screen flex items-center justify-center mystical-gradient">
      <Helmet>
        <title>SAS D'ENTRÉE – Rejoindre l'Aventure Terra Nova</title>
        <meta name="description" content="Porte d'entrée pour les praticiens, artistes et accompagnants souhaitant rejoindre la plateforme Terra Nova." />
      </Helmet>

      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.5
    }} className="crystal-card rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">
        <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary floating-animation" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 aura-text font-['Dancing_Script']">SAS D'ENTRÉE</h1>
        <p className="text-foreground/80 mb-8 leading-relaxed">Cet espace s'ouvre uniquement pour celles et ceux qui souhaitent offrir leur art, leur médecine ou leur vibration au monde à travers Terra Nova. Avant d'aller plus loin, prenez un instant. Ressentez si cette clé vous correspond.</p>

        <AnimatePresence mode="wait">
          {step === 1 && <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
              <h2 className="text-2xl font-bold font-['Dancing_Script'] aura-text">Étape 1 – Engagement</h2>
              <div className="flex items-start justify-center space-x-3 bg-background/30 p-4 rounded-xl border border-primary/20 shadow-inner">
                <Checkbox id="engagement" checked={engagementAccepted} onCheckedChange={setEngagementAccepted} className="mt-1 w-5 h-5" />
                <Label htmlFor="engagement" className="text-base text-foreground/90 font-medium leading-normal text-left">
                  Je confirme être praticien(ne), artiste ou accompagnant(e) et je souhaite proposer mes services sur la plateforme.
                </Label>
              </div>
              <Button onClick={handleContinueToPassword} disabled={!engagementAccepted} size="lg" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-xl rounded-full shadow-lg energy-pulse">
                Continuer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>}

          {step === 2 && <motion.form key="step2" onSubmit={handlePasswordSubmit} variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
              <h2 className="text-2xl font-bold font-['Dancing_Script'] aura-text">Étape 2 – Clé d'accès</h2>
              <div className="space-y-4">
                <Label htmlFor="password" className="text-lg text-foreground/90">
                  Pour franchir le seuil, entrez le mot de passe vibratoire transmis aux gardiens :
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                  <Input id="password" type="password" value={password} onChange={e => {
                setPassword(e.target.value);
                setError('');
              }} placeholder="Mot de passe vibratoire" className="pl-10 text-center" required />
                </div>
                {error && <motion.p initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="text-red-400 text-sm">
                    {error}
                  </motion.p>}
              </div>
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 text-xl rounded-full shadow-lg energy-pulse">
                Franchir le seuil
                <KeyRound className="w-5 h-5 ml-2" />
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="default" className="w-full border-2 border-primary text-primary hover:bg-secondary rounded-full px-8 py-4 text-lg">
                  Je n'ai pas encore la clé
                </Button>
              </Link>
            </motion.form>}
        </AnimatePresence>
      </motion.div>
    </div>;
};
export default TherapistGatePage;
