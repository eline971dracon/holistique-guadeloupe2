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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 aura-text font-['Dancing_Script']">
              Votre Voyage Intérieur
            </h1>
            <p className="text-xl text-foreground/80">
              Voici le parcours holistique que vous avez composé
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="crystal-card rounded-2xl p-6 border-2 border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                {IntentionIcon && <IntentionIcon className={`w-8 h-8 ${intentionInfo.color}`} />}
                <h3 className="text-2xl font-semibold">Intention</h3>
              </div>
              <p className="text-lg">{intentionInfo?.label}</p>
            </div>

            <div className="crystal-card rounded-2xl p-6 border-2 border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-semibold">Durée</h3>
              </div>
              <p className="text-lg">{durationLabels[formData.duration] || 'Non spécifiée'}</p>
            </div>

            <div className="crystal-card rounded-2xl p-6 border-2 border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-semibold">Lieu</h3>
              </div>
              <p className="text-lg font-bold text-primary text-xl">{locationLabels[formData.location] || 'Non spécifié'}</p>
            </div>
          </div>

          {selectedExperiences.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 aura-text font-['Dancing_Script']">
                Expériences sélectionnées
              </h2>
              {selectedExperiences.length > 5 && (
                <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    <strong>Note :</strong> Vous avez sélectionné {selectedExperiences.length} expériences. Pour une journée optimale, nous vous recommandons de limiter à 5 expériences maximum.
                  </p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                {selectedExperiences.slice(0, 5).map((exp, index) => {
                  const CategoryIcon = exp.categoryIcon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="crystal-card rounded-xl p-4 flex items-start gap-3"
                    >
                      <div className="flex-shrink-0">
                        <CategoryIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary/80 text-sm">{exp.categoryTitle}</p>
                        <p className="text-base">{exp.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {selectedExperiences.length > 5 && (
                <p className="mt-4 text-sm text-foreground/60 text-center">
                  Les 5 premières expériences seront priorisées dans votre voyage
                </p>
              )}
            </div>
          )}

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
