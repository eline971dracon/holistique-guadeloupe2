import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Palette, Heart, Image as ImageIcon, Mail, Phone, MapPin, Sparkles, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const guadeloupeCommunes = [
  "Les Abymes", "Anse-Bertrand", "Baie-Mahault", "Baillif", "Basse-Terre",
  "Bouillante", "Capesterre-Belle-Eau", "Capesterre-de-Marie-Galante",
  "Deshaies", "La Désirade", "Le Gosier", "Gourbeyre", "Grand-Bourg",
  "Lamentin", "Morne-à-l'Eau", "Le Moule", "Petit-Bourg", "Petit-Canal",
  "Pointe-à-Pitre", "Pointe-Noire", "Port-Louis", "Saint-Claude",
  "Saint-François", "Saint-Louis", "Sainte-Anne", "Sainte-Rose",
  "Terre-de-Bas", "Terre-de-Haut", "Trois-Rivières", "Vieux-Fort", "Vieux-Habitants"
];

const CreatorRegistrationPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    commune: '',
    artType: '',
    description: '',
    inspiration: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.commune || !formData.artType) {
      toast({
        title: 'Informations manquantes',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Inscription envoyée !',
        description: 'Nous examinerons votre candidature et vous contacterons très prochainement.',
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen mystical-gradient">
      <Helmet>
        <title>Inscription Créateur / Artiste - Terra Nova</title>
        <meta name="description" content="Rejoignez l'annuaire des créateurs et artistes de Terra Nova" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Palette className="w-16 h-16 mx-auto mb-4 text-purple-500" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 aura-text font-['Dancing_Script']">
            Inscription Créateur / Artiste
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Partagez votre art et vos créations avec notre communauté
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="crystal-card rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold aura-text flex items-center gap-2">
                <User className="w-6 h-6 text-purple-500" />
                Informations Personnelles
              </h2>

              <div>
                <Label htmlFor="name" className="text-lg mb-2">
                  Nom & Prénom *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Votre nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 text-lg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-lg mb-2">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-lg mb-2">
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0590 XX XX XX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-12 text-lg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="commune" className="text-lg mb-2">
                  Commune *
                </Label>
                <Select value={formData.commune} onValueChange={(value) => handleSelectChange('commune', value)}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Sélectionnez votre commune" />
                  </SelectTrigger>
                  <SelectContent>
                    {guadeloupeCommunes.map((commune) => (
                      <SelectItem key={commune} value={commune}>
                        {commune}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold aura-text flex items-center gap-2">
                <Palette className="w-6 h-6 text-purple-500" />
                Votre Art
              </h2>

              <div>
                <Label htmlFor="artType" className="text-lg mb-2">
                  Type d'Art / Création *
                </Label>
                <Input
                  id="artType"
                  name="artType"
                  type="text"
                  placeholder="Ex: Peinture, Sculpture, Photographie, Art textile..."
                  value={formData.artType}
                  onChange={handleChange}
                  required
                  className="h-12 text-lg"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-lg mb-2">
                  Description de votre Démarche Artistique
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez votre style, vos techniques, ce qui caractérise vos créations..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="text-lg resize-none"
                />
              </div>

              <div>
                <Label htmlFor="inspiration" className="text-lg mb-2">
                  Sources d'Inspiration
                </Label>
                <Textarea
                  id="inspiration"
                  name="inspiration"
                  placeholder="Qu'est-ce qui inspire vos créations ? Nature, spiritualité, émotions..."
                  value={formData.inspiration}
                  onChange={handleChange}
                  rows={4}
                  className="text-lg resize-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold aura-text flex items-center gap-2">
                <Heart className="w-6 h-6 text-purple-500" />
                Message Additionnel
              </h2>

              <div>
                <Label htmlFor="message" className="text-lg mb-2">
                  Message (optionnel)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Partagez toute information complémentaire qui pourrait nous aider à mieux présenter votre travail..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="text-lg resize-none"
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white text-xl py-6 rounded-full shadow-lg energy-pulse"
              >
                <Send className="w-6 h-6 mr-2" />
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon inscription'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatorRegistrationPage;
