import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Calendar, Sparkles, Heart, Brush, Users, Sun, Waves, User, Mail, Phone, Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { experienceCategories } from '@/lib/journeyData';

const durationLabels = {
  'demi-journee': 'Une demi-journée',
  'journee': 'Une journée complète',
  'mini-retraite': '1 à 2 jours (mini-retraite)',
};

const locationLabels = {
  'plage': 'Plage',
  'foret': 'Forêt',
  'espace-sacre': 'Espace sacré',
  'atelier-creatif': 'Atelier créatif',
  'salle-cosy': 'Salle cosy',
};

const intentionConfig = {
  detente: { label: 'Détente', icon: Waves, color: 'text-blue-500' },
  guerison: { label: 'Guérison', icon: Heart, color: 'text-rose-500' },
  creativite: { label: 'Créativité', icon: Brush, color: 'text-purple-500' },
  connexion: { label: 'Connexion', icon: Users, color: 'text-green-500' },
  transformation: { label: 'Transformation', icon: Sun, color: 'text-amber-500' },
};

const JourneyResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!location.state || !location.state.formData) {
      navigate('/mon-voyage-interieur');
      return;
    }

    const { formData } = location.state;
    console.log('Form Data:', formData);
    const experiences = [];

    if (formData.experience) {
      Object.entries(formData.experience).forEach(([categoryId, subcategoryIds]) => {
        const category = experienceCategories.find(cat => cat.id === categoryId);
        if (category) {
          subcategoryIds.forEach(subId => {
            const subcategory = category.subcategories.find(sub => sub.id === subId);
            if (subcategory) {
              experiences.push({
                categoryTitle: category.title,
                categoryIcon: category.icon,
                label: subcategory.label,
              });
            }
          });
        }
      });
    }

    setSelectedExperiences(experiences);
  }, [location.state, navigate]);

  if (!location.state || !location.state.formData) {
    return null;
  }

  const { formData } = location.state;
  const intentionInfo = intentionConfig[formData.intention];
  const IntentionIcon = intentionInfo?.icon;

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactForm.name || !contactForm.email) {
      toast({
        title: 'Informations manquantes',
        description: 'Veuillez remplir au moins votre nom et email.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    const journeyDetails = `
Voyage Intérieur:
- Intention: ${intentionInfo?.label}
- Durée: ${durationLabels[formData.duration]}
- Lieu: ${locationLabels[formData.location] || 'Non spécifié'}
- Expériences: ${selectedExperiences.map(exp => `${exp.categoryTitle} - ${exp.label}`).join(', ')}
`;

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          message: contactForm.message,
          journeyDetails: journeyDetails,
          type: 'journey'
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      toast({
        title: 'Demande envoyée !',
        description: 'Nous vous contacterons très prochainement pour finaliser votre voyage.'
      });

      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
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
        <title>Votre Voyage Intérieur - Résultats - Terra Nova</title>
        <meta name="description" content="Découvrez votre voyage holistique personnalisé avec Terra Nova" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        <Link to="/mon-voyage-interieur">
          <Button variant="outline" className="mb-6 border-2 border-primary text-primary hover:bg-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Recommencer
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="crystal-card rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Dancing_Script']">
              <span className="text-emerald-500">Votre</span>{' '}
              <span className="text-teal-500">Voyage</span>{' '}
              <span className="text-rose-500">Intérieur</span>
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/90 font-light">
              Récapitulatif de votre parcours personnalisé
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <div className="crystal-card rounded-2xl p-8 border-l-4 border-teal-500">
              <div className="flex items-center gap-3 mb-4">
                <Waves className="w-10 h-10 text-teal-500" />
                <h3 className="text-3xl font-bold">Intention</h3>
              </div>
              <p className="text-xl text-foreground/80">{intentionInfo?.label}</p>
            </div>

            <div className="crystal-card rounded-2xl p-8 border-l-4 border-emerald-500">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-10 h-10 text-emerald-500" />
                <h3 className="text-3xl font-bold">Expériences Choisies</h3>
              </div>
              {selectedExperiences.length > 0 ? (
                <div className="space-y-4">
                  {selectedExperiences.slice(0, 5).map((exp, index) => {
                    const CategoryIcon = exp.categoryIcon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-2 border-emerald-500/30 pl-6"
                      >
                        <div className="flex items-start gap-3">
                          <CategoryIcon className="w-6 h-6 text-emerald-500 mt-1" />
                          <div>
                            <p className="font-semibold text-lg">{exp.categoryTitle}</p>
                            <p className="text-emerald-600">• {exp.label}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-foreground/60">Aucune expérience sélectionnée</p>
              )}
              {selectedExperiences.length > 5 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    Vous avez sélectionné {selectedExperiences.length} expériences. Les 5 premières seront priorisées.
                  </p>
                </div>
              )}
            </div>

            <div className="crystal-card rounded-2xl p-8 border-l-4 border-amber-500">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-10 h-10 text-amber-500" />
                <h3 className="text-3xl font-bold">Durée</h3>
              </div>
              <p className="text-xl text-foreground/80">{durationLabels[formData.duration] || 'Non spécifiée'}</p>
            </div>

            <div className="crystal-card rounded-2xl p-8 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-10 h-10 text-purple-500" />
                <h3 className="text-3xl font-bold">Lieu</h3>
              </div>
              <p className="text-xl text-foreground/80">{locationLabels[formData.location] || 'Non spécifié'}</p>
            </div>
          </div>


          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Dancing_Script']">
                <span className="text-emerald-500">Finalisons</span>{' '}
                <span className="text-teal-500">Votre</span>{' '}
                <span className="text-rose-500">Voyage</span>
              </h2>
              <p className="text-lg text-foreground/80">
                Nous allons maintenant composer une ébauche personnalisée de votre journée sacrée. Laissez-nous vos coordonnées pour que nous puissions vous recontacter avec votre parcours sur mesure.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 text-lg mb-2">
                  <User className="w-5 h-5" />
                  Nom & Prénom *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Votre nom complet"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required
                  className="h-14 text-lg"
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 text-lg mb-2">
                  <Mail className="w-5 h-5" />
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                  className="h-14 text-lg"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 text-lg mb-2">
                  <Phone className="w-5 h-5" />
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0590 XX XX XX"
                  value={contactForm.phone}
                  onChange={handleContactChange}
                  className="h-14 text-lg"
                />
              </div>

              <div>
                <Label htmlFor="message" className="flex items-center gap-2 text-lg mb-2">
                  <Heart className="w-5 h-5" />
                  Message (optionnel)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Partagez-nous vos attentes particulières ou toute information qui pourrait nous aider à personnaliser votre expérience..."
                  value={contactForm.message}
                  onChange={handleContactChange}
                  rows={5}
                  className="text-lg resize-none"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xl py-6 rounded-full shadow-lg energy-pulse"
                >
                  <Send className="w-6 h-6 mr-2" />
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyResultsPage;
