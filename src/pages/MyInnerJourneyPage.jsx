import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, ArrowRight, ArrowLeft, Heart, Brush, Sun, Waves, Users, Home, Trees as Tree, Droplets, Clock, Star, Coffee, Wind, Leaf, MapPin, Calendar, Tent, Palmtree, Mountain, Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { experienceCategories } from '@/lib/journeyData';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';

const journeySteps = [
  {
    id: 'welcome',
    title: 'Un voyage sur mesure pour votre âme',
    question: 'Et si aujourd’hui, tu offrais à ton âme un voyage sur mesure ?',
  },
  {
    id: 'intention',
    title: 'Choix de l’intention',
    question: 'Aujourd’hui, qu’aimerais-tu offrir à ton corps, ton cœur, ton esprit ?',
    options: [
      { value: 'detente', label: 'Détente', icon: Waves },
      { value: 'guerison', label: 'Guérison', icon: Heart },
      { value: 'creativite', label: 'Créativité', icon: Brush },
      { value: 'connexion', label: 'Connexion', icon: Users },
      { value: 'transformation', label: 'Transformation', icon: Sun },
    ],
  },
  {
    id: 'experience',
    title: 'Type d’expériences',
  },
  {
    id: 'duration',
    title: 'Durée du voyage',
    question: 'Combien de temps souhaites-tu dédier à cette expérience ?',
    options: [
        { value: 'demi-journee', label: 'Une demi-journée', icon: Sun },
        { value: 'journee', label: 'Une journée complète', icon: Star },
        { value: 'mini-retraite', label: '1 à 2 jours (mini-retraite)', icon: Calendar },
    ]
  },
  {
    id: 'location',
    title: 'Lieu d\'ambiance',
    question: 'Dans quelle ambiance souhaites-tu vivre cette expérience ?',
    options: [
        { value: 'plage', label: 'Plage', icon: Palmtree },
        { value: 'foret', label: 'Forêt', icon: Tree },
        { value: 'espace-sacre', label: 'Espace sacré', icon: Sparkles },
        { value: 'atelier-creatif', label: 'Atelier créatif', icon: Paintbrush },
        { value: 'salle-cosy', label: 'Salle cosy', icon: Coffee },
    ]
  }
];

const intentions = {
  detente: { label: 'Détente', icon: Waves, categories: ['soin_energetique', 'voyage_sensoriel', 'connexion_nature', 'nettoyage_purification', 'danses_songes'] },
  guerison: { label: 'Guérison', icon: Heart, categories: ['soin_energetique', 'nettoyage_purification', 'meditation_rituels', 'connexion_nature', 'histoires_sagesses', 'portes_conscience'] },
  creativite: { label: 'Créativité', icon: Brush, categories: ['creation_ame', 'danses_songes', 'voyage_sensoriel', 'couronne_lumiere'] },
  connexion: { label: 'Connexion', icon: Users, categories: ['connexion_nature', 'histoires_sagesses', 'meditation_rituels', 'portes_conscience'] },
  transformation: { label: 'Transformation', icon: Sun, categories: ['portes_conscience', 'meditation_rituels', 'soin_energetique', 'nettoyage_purification', 'danses_songes'] }
};

const WelcomeStep = ({ onNext }) => {
    const step = journeySteps.find(s => s.id === 'welcome');
    return (
        <motion.div key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full text-center">
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 aura-text font-['Dancing_Script']">{step.title}</h2>
                <p className="text-2xl md:text-3xl text-foreground/80 mb-12 leading-relaxed max-w-2xl mx-auto">{step.question}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Button onClick={onNext} size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-xl rounded-full shadow-lg energy-pulse">
                    Je compose ma journée <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Link to="/quiz">
                    <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-secondary px-8 py-4 text-xl rounded-full w-full md:w-auto">
                        Je me laisse guider <Sparkles className="w-5 h-5 ml-2" />
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
};

const StepWithOptions = ({ step, onSelect, selectedValue }) => (
    <motion.div key={step.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="w-full">
        <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 aura-text font-['Dancing_Script']">{step.title}</h2>
            <p className="text-xl text-foreground/80">{step.question}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {step.options.map((option) => {
                const Icon = option.icon;
                return (
                    <button key={option.value} onClick={() => onSelect(option.value)} className={cn("crystal-card rounded-2xl p-6 text-center group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2", selectedValue === option.value ? "border-primary ring-2 ring-primary" : "border-transparent")}>
                        <Icon className="w-16 h-16 mx-auto mb-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-xl font-semibold text-foreground">{option.label}</span>
                    </button>
                );
            })}
        </div>
    </motion.div>
);

const IntentionStep = ({ onSelect }) => {
    const step = journeySteps.find(s => s.id === 'intention');
    return (
        <motion.div key={step.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="w-full">
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 aura-text font-['Dancing_Script']">{step.title}</h2>
                <p className="text-xl text-foreground/80">{step.question}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {step.options.map((option) => {
                    const Icon = option.icon;
                    return (
                        <button key={option.value} onClick={() => onSelect(option.value)} className="crystal-card rounded-2xl p-6 text-center group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                            <Icon className="w-16 h-16 mx-auto mb-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                            <span className="text-xl font-semibold text-foreground">{option.label}</span>
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
};

const ExperienceStep = ({ intention, selectedExperiences, onExperienceChange }) => {
    const step = journeySteps.find(s => s.id === 'experience');
    const currentIntention = intentions[intention];
    const [openCategory, setOpenCategory] = useState(null);

    if (!currentIntention) return <div>Veuillez d'abord choisir une intention.</div>;

    const filteredCategories = experienceCategories.filter(cat => currentIntention.categories.includes(cat.id));

    const handleCategoryToggle = (categoryId) => setOpenCategory(openCategory === categoryId ? null : categoryId);

    return (
        <motion.div key={step.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="w-full">
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 aura-text font-['Dancing_Script']">{step.title}</h2>
                <div className="flex justify-center items-center gap-4">
                    <currentIntention.icon className="w-8 h-8 text-primary" />
                    <p className="text-xl text-foreground/80">Pour votre intention de <span className="font-bold text-primary">{currentIntention.label.toLowerCase()}</span>, quelle forme prendra votre expérience ?</p>
                </div>
            </div>
            <div className="space-y-4 mb-10">
                {filteredCategories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedExperiences && selectedExperiences[category.id];
                    const isOpen = openCategory === category.id;
                    return (
                        <div key={category.id} className="crystal-card rounded-2xl p-4 transition-all duration-300">
                            <button type="button" onClick={() => handleCategoryToggle(category.id)} className={cn("w-full flex justify-between items-center text-left", isSelected ? "text-primary" : "")}>
                                <div className="flex items-center gap-4">
                                    <Icon className="w-8 h-8" />
                                    <span className="text-xl font-semibold">{category.title}</span>
                                </div>
                                <ChevronDown className={cn("w-6 h-6 transition-transform", isOpen && "rotate-180")} />
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }} exit={{ height: 0, opacity: 0, marginTop: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-primary/20">
                                            {category.subcategories.map((subcategory) => (
                                                <div key={subcategory.id} className="flex items-center space-x-3">
                                                    <Checkbox id={`${category.id}-${subcategory.id}`} checked={isSelected && isSelected.includes(subcategory.id)} onCheckedChange={(checked) => onExperienceChange(category.id, subcategory.id, checked)} />
                                                    <Label htmlFor={`${category.id}-${subcategory.id}`} className="text-base cursor-pointer">{subcategory.label}</Label>
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
        </motion.div>
    );
};

const MyInnerJourneyPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStepIndex < journeySteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      navigate('/mon-voyage-interieur/resultats', { state: { formData } });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleIntentionSelect = (intention) => {
    setFormData({ ...formData, intention, experience: {} }); // Reset experiences when intention changes
    handleNext();
  };

  const handleOptionSelect = (key, value) => {
    const updatedFormData = { ...formData, [key]: value };
    setFormData(updatedFormData);

    if (currentStepIndex < journeySteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      navigate('/mon-voyage-interieur/resultats', { state: { formData: updatedFormData } });
    }
  };
  
  const handleExperienceChange = (categoryId, subcategoryId, checked) => {
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

  const renderStep = () => {
    const step = journeySteps[currentStepIndex];
    switch (step.id) {
      case 'welcome':
        return <WelcomeStep onNext={handleNext} />;
      case 'intention':
        return <IntentionStep onSelect={handleIntentionSelect} />;
      case 'experience':
        return <ExperienceStep intention={formData.intention} selectedExperiences={formData.experience} onExperienceChange={handleExperienceChange} />;
      case 'duration':
        return <StepWithOptions step={step} onSelect={(value) => handleOptionSelect('duration', value)} selectedValue={formData.duration} />;
      case 'location':
        return <StepWithOptions step={step} onSelect={(value) => handleOptionSelect('location', value)} selectedValue={formData.location} />;
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    const stepId = journeySteps[currentStepIndex].id;
    if (stepId === 'experience' && (!formData.experience || Object.keys(formData.experience).length === 0)) {
        return true;
    }
    return false;
  };

  return (
    <div className="pt-24 pb-12 min-h-screen flex flex-col items-center justify-center mystical-gradient">
      <Helmet>
        <title>Mon Voyage Intérieur - Terra Nova</title>
        <meta name="description" content="Composez votre journée holistique personnalisée. Choisissez vos intentions, expériences et lieux pour un parcours sur mesure." />
      </Helmet>

      <div className="crystal-card rounded-3xl p-8 md:p-12 w-full max-w-6xl mx-auto flex flex-col flex-grow">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        
        {journeySteps[currentStepIndex].id !== 'welcome' && (
            <div className="mt-auto pt-10">
                <div className="flex justify-between items-center">
                    <Button onClick={handleBack} variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-secondary">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Précédent
                    </Button>
                    <Button onClick={handleNext} size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white" disabled={isNextDisabled()}>
                        {currentStepIndex === journeySteps.length - 1 ? 'Voir les résultats' : 'Suivant'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyInnerJourneyPage;