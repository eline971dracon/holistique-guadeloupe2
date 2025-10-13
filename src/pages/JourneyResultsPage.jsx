import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Calendar, Sparkles, Heart, Brush, Users, Sun, Waves, User, Mail, Phone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
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


          <div className="crystal-card rounded-2xl p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/30">
            <div className="text-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-8 py-4 rounded-full shadow-lg energy-pulse">
                  <Check className="w-5 h-5 mr-2" />
                  Valider ma demande
                </Button>
              </Link>
              <p className="text-sm text-foreground/60 mt-4">
                Vous serez redirigé vers notre formulaire de contact
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-foreground/60 text-sm">
              Besoin d'aide ? Contactez-nous directement au{' '}
              <a href="tel:+590690123456" className="text-primary hover:underline">
                +590 690 12 34 56
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyResultsPage;
