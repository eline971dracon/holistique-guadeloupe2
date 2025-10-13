import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { experienceCategories } from '@/lib/journeyData';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Heart, Brush, Sun, Waves, Users } from 'lucide-react';

const intentions = {
  detente: {
    label: 'Détente',
    icon: Waves,
    categories: ['soin_energetique', 'voyage_sensoriel', 'connexion_nature', 'nettoyage_purification', 'danses_songes']
  },
  guerison: {
    label: 'Guérison',
    icon: Heart,
    categories: ['soin_energetique', 'nettoyage_purification', 'meditation_rituels', 'connexion_nature', 'histoires_sagesses', 'portes_conscience']
  },
  creativite: {
    label: 'Créativité',
    icon: Brush,
    categories: ['creation_ame', 'danses_songes', 'voyage_sensoriel', 'couronne_lumiere']
  },
  connexion: {
    label: 'Connexion',
    icon: Users,
    categories: ['connexion_nature', 'histoires_sagesses', 'meditation_rituels', 'portes_conscience']
  },
  transformation: {
    label: 'Transformation',
    icon: Sun,
    categories: ['portes_conscience', 'meditation_rituels', 'soin_energetique', 'nettoyage_purification', 'danses_songes']
  }
};

const ExperiencePage = () => {
  const { intention } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ intention, experience: {} });
  const [openCategory, setOpenCategory] = useState(null);

  const currentIntention = intentions[intention];
  if (!currentIntention) {
    return <div>Intention non valide</div>; 
  }

  const filteredCategories = experienceCategories.filter(cat => currentIntention.categories.includes(cat.id));

  const handleCategoryToggle = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const handleSubcategoryChange = (categoryId, subcategoryId, checked) => {
    const currentExperiences = formData.experience || {};
    const currentSubcategories = currentExperiences[categoryId] || [];

    let newSubcategories;
    if (checked) {
      newSubcategories = [...currentSubcategories, subcategoryId];
    } else {
      newSubcategories = currentSubcategories.filter((id) => id !== subcategoryId);
    }

    const newExperiences = { ...currentExperiences };
    if (newSubcategories.length > 0) {
      newExperiences[categoryId] = newSubcategories;
    } else {
      delete newExperiences[categoryId];
    }

    setFormData({ ...formData, experience: newExperiences });
  };
  
  const handleBack = () => {
    navigate('/mon-voyage-interieur');
  };

  const handleNext = () => {
    // This feature isn't implemented yet. For now, it will just show a toast notification.
    // In the future, this would proceed to the next step of the journey planner.
    console.log("Form data to be submitted:", formData);
  };


  return (
    <div className="pt-24 pb-12 min-h-screen flex flex-col items-center justify-center mystical-gradient">
      <Helmet>
        <title>Type d'expérience pour {currentIntention.label} - Terra Nova</title>
        <meta name="description" content={`Choisissez votre type d'expérience pour l'intention : ${currentIntention.label}.`} />
      </Helmet>

      <div className="crystal-card rounded-3xl p-8 md:p-12 w-full max-w-6xl mx-auto flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 aura-text font-['Dancing_Script']">
              Type d’expériences
            </h2>
            <div className="flex justify-center items-center gap-4">
                <currentIntention.icon className="w-8 h-8 text-primary" />
                <p className="text-xl text-foreground/80">Pour votre intention de <span className="font-bold text-primary">{currentIntention.label.toLowerCase()}</span>, quelle forme prendra votre expérience ?</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-10">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              const isSelected = formData.experience && formData.experience[category.id];
              const isOpen = openCategory === category.id;

              return (
                <div key={category.id} className="crystal-card rounded-2xl p-4 transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => handleCategoryToggle(category.id)}
                    className={cn(
                      "w-full flex justify-between items-center text-left",
                      isSelected ? "text-primary" : ""
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="w-8 h-8" />
                      <span className="text-xl font-semibold">{category.title}</span>
                    </div>
                    <ChevronDown className={cn("w-6 h-6 transition-transform", isOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-primary/20">
                          {category.subcategories.map((subcategory) => (
                            <div key={subcategory.id} className="flex items-center space-x-3">
                              <Checkbox
                                id={`${category.id}-${subcategory.id}`}
                                checked={isSelected && isSelected.includes(subcategory.id)}
                                onCheckedChange={(checked) => handleSubcategoryChange(category.id, subcategory.id, checked)}
                              />
                              <Label htmlFor={`${category.id}-${subcategory.id}`} className="text-base cursor-pointer">
                                {subcategory.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          
            <div className="mt-auto pt-10">
                <div className="flex justify-between items-center">
                    <Button onClick={handleBack} variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-secondary">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Précédent
                    </Button>
                    <Button onClick={handleNext} size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                        🚧 Prochaine étape bientôt !
                    </Button>
                </div>
            </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ExperiencePage;