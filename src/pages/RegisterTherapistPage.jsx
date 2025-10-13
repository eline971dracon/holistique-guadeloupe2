import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Type, Image as ImageIcon, Droplets, Mountain, Sun, Wind, Star as StarIcon, UserCheck, Compass, MessageSquare, ChevronDown, Check, Clock, Home, Leaf, Palmtree, Tent, Paintbrush, Coffee, Waves, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { experienceCategories } from '@/lib/journeyData';
import { addTherapist } from '@/lib/therapists';


const guadeloupeCommunes = [
  "Les Abymes", "Anse-Bertrand", "Baie-Mahault", "Baillif", "Basse-Terre",
  "Bouillante", "Capesterre-Belle-Eau", "Capesterre-de-Marie-Galante",
  "Deshaies", "La Désirade", "Le Gosier", "Gourbeyre", "Grand-Bourg",
  "Lamentin", "Morne-à-l'Eau", "Le Moule", "Petit-Bourg", "Petit-Canal",
  "Pointe-à-Pitre", "Pointe-Noire", "Port-Louis", "Saint-Claude",
  "Saint-François", "Saint-Louis", "Sainte-Anne", "Sainte-Rose",
  "Terre-de-Bas", "Terre-de-Haut", "Trois-Rivières", "Vieux-Fort", "Vieux-Habitants"
];

const elements = [
  { id: 'Terre', name: 'Terre', icon: Mountain, description: 'Racine, corps, stabilité' },
  { id: 'Feu', name: 'Feu', icon: Sun, description: 'Émotion, puissance, transformation' },
  { id: 'Eau', name: 'Eau', icon: Droplets, description: 'Sensibilité, créativité, intuition' },
  { id: 'Air', name: 'Air', icon: Wind, description: 'Clarté, parole, connaissance' },
  { id: 'Éther', name: 'Éther', icon: StarIcon, description: 'Spiritualité, guidance, mystère' },
];

const intentions = [
    { value: 'detente', label: 'Détente', icon: Waves },
    { value: 'guerison', label: 'Guérison', icon: Heart },
    { value: 'creativite', label: 'Créativité', icon: Paintbrush },
    { value: 'connexion', label: 'Connexion', icon: Users },
    { value: 'transformation', label: 'Transformation', icon: Sun },
];

const durations = [
    { value: 'demi-journee', label: 'Une demi-journée', icon: Sun },
    { value: 'journee', label: 'Une journée complète', icon: StarIcon },
    { value: 'mini-retraite', label: '1 à 2 jours (mini-retraite)', icon: Calendar },
];

const locations = [
    { value: 'plage', label: 'Plage', icon: Palmtree },
    { value: 'foret', label: 'Forêt', icon: Leaf },
    { value: 'espace-sacre', label: 'Espace sacré', icon: Sparkles },
    { value: 'atelier-creatif', label: 'Atelier créatif', icon: Paintbrush },
    { value: 'salle-cosy', label: 'Salle cosy', icon: Coffee },
];


const RegisterTherapistPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState('identity');
  const [formData, setFormData] = useState({
    name: '',
    commune: '',
    relianceDirecte: '',
    presenceInspirante: '',
    vibrationalPhrase: '',
    mission: '',
    approach: '',
    messageBienvenue: '',
    mantra: '',
    portraitPhoto: null,
    artPhoto: null,
    elements: [],
    experiences: {},
    intentions: [],
    durations: [],
    locations: [],
  });

  const handleSectionToggle = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleMultiCheckboxChange = (field, value, checked) => {
    setFormData(prev => {
        const currentValues = prev[field] || [];
        if (checked) {
            return { ...prev, [field]: [...currentValues, value] };
        } else {
            return { ...prev, [field]: currentValues.filter(v => v !== value) };
        }
    });
  };

  const handleExperienceChange = (categoryId, subcategoryId, checked) => {
    const currentExperiences = formData.experiences || {};
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

    setFormData({ ...formData, experiences: newExperiences });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, [name]: reader.result }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleElementChange = (elementId) => {
    setFormData(prev => {
      const newElements = prev.elements.includes(elementId)
        ? prev.elements.filter(id => id !== elementId)
        : [...prev.elements, elementId];
      return { ...prev, elements: newElements.slice(0, 2) };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.portraitPhoto || !formData.artPhoto) {
        toast({ variant: "destructive", title: "Photos manquantes", description: "Veuillez télécharger une photo portrait et une photo d'art." });
        return;
    }
    if (Object.keys(formData.experiences).length === 0) {
      toast({ variant: "destructive", title: "Champ manquant", description: "Veuillez sélectionner au moins une pratique." });
      return;
    }
    if (formData.elements.length === 0) {
      toast({ variant: "destructive", title: "Élément manquant", description: "Veuillez sélectionner au moins un élément dominant." });
      return;
    }

    const newTherapist = addTherapist(formData);

    toast({
      title: "🌺 Fiche Créée !",
      description: "Votre fiche vibratoire rayonne maintenant dans l'annuaire.",
    });
    
    navigate('/annuaire');
  };

  const Section = ({ id, title, icon: Icon, children }) => (
    <div className="crystal-card rounded-2xl p-4 transition-all duration-300">
        <button type="button" onClick={() => handleSectionToggle(id)} className="w-full flex justify-between items-center text-left">
            <div className="flex items-center gap-4">
                <Icon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold font-['Dancing_Script'] aura-text">{title}</h2>
            </div>
            <ChevronDown className={cn("w-6 h-6 transition-transform", openSection === id && "rotate-180")} />
        </button>
        <AnimatePresence>
            {openSection === id && (
            <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }} exit={{ height: 0, opacity: 0, marginTop: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="pt-4 border-t border-primary/20 space-y-8">
                    {children}
                </div>
            </motion.div>
            )}
        </AnimatePresence>
    </div>
  );

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Fiche Vibratoire - Thérapies Holistiques Guadeloupe</title>
        <meta name="description" content="Créez votre fiche vibratoire, partagez votre médecine sacrée et rejoignez notre communauté de thérapeutes en Guadeloupe." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="aura-text font-['Dancing_Script']">Ta médecine sacrée</span>
            </h1>
            <p className="text-xl text-foreground/80 mt-4">(C'est ici que l'âme vibre)</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <Section id="identity" title="Identité & Connexion" icon={UserCheck}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="name" className="font-semibold text-lg">Nom d'Âme*</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="commune" className="font-semibold text-lg">Terre d'Ancrage*</Label>
                        <Select onValueChange={(value) => handleSelectChange('commune', value)} value={formData.commune}>
                            <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                            <SelectContent>{guadeloupeCommunes.sort().map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="relianceDirecte" className="font-semibold text-lg">Reliance directe (téléphone)*</Label>
                        <Input id="relianceDirecte" name="relianceDirecte" type="tel" value={formData.relianceDirecte} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="presenceInspirante" className="font-semibold text-lg">Présence inspirante (lien)</Label>
                        <Input id="presenceInspirante" name="presenceInspirante" value={formData.presenceInspirante} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <Label htmlFor="portraitPhoto" className="font-semibold text-lg">Photo portrait*</Label>
                        <Input id="portraitPhoto" name="portraitPhoto" type="file" accept="image/*" onChange={handleFileChange} required />
                        {formData.portraitPhoto && <img src={formData.portraitPhoto} alt="Aperçu portrait" className="mt-2 rounded-lg w-32 h-32 object-cover"/>}
                    </div>
                    <div>
                        <Label htmlFor="artPhoto" className="font-semibold text-lg">Photo d'art*</Label>
                        <Input id="artPhoto" name="artPhoto" type="file" accept="image/*" onChange={handleFileChange} required />
                        {formData.artPhoto && <img src={formData.artPhoto} alt="Aperçu art" className="mt-2 rounded-lg w-32 h-32 object-cover"/>}
                    </div>
                </div>
            </Section>

            <Section id="vibration" title="Vibration & Essence" icon={Sparkles}>
                <div className="space-y-6">
                    <div>
                        <Label className="font-semibold text-lg">Mon alignement (1 ou 2 éléments)*</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
                        {elements.map(el => (
                            <label key={el.id} className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${formData.elements.includes(el.id) ? 'border-primary bg-primary/10' : 'border-input'}`}>
                                <input type="checkbox" className="hidden" checked={formData.elements.includes(el.id)} onChange={() => handleElementChange(el.id)} />
                                <el.icon className="w-7 h-7 mb-2" />
                                <span className="font-semibold text-sm">{el.name}</span>
                            </label>
                        ))}
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="vibrationalPhrase" className="font-semibold text-lg">Ma phrase d'appel*</Label>
                        <p className="text-sm text-foreground/70 italic">Une phrase courte qui capte ton essence.</p>
                        <Textarea id="vibrationalPhrase" name="vibrationalPhrase" value={formData.vibrationalPhrase} onChange={handleChange} rows={2} required />
                    </div>
                    <div>
                        <Label htmlFor="mission" className="font-semibold text-lg">Ma mission de cœur*</Label>
                        <p className="text-sm text-foreground/70 italic">Ce qui t'anime, ce que tu souhaites apporter au monde.</p>
                        <Textarea id="mission" name="mission" value={formData.mission} onChange={handleChange} rows={3} required />
                    </div>
                </div>
            </Section>
            
            <Section id="practices" title="Mes Pratiques & Expériences" icon={StarIcon}>
                <p className="text-base text-foreground/80 italic">Sélectionnez toutes les expériences que vous proposez. C'est le cœur de votre fiche !</p>
                <div className="space-y-4">
                    {experienceCategories.map((category) => {
                        const Icon = category.icon;
                        const isSelected = formData.experiences && formData.experiences[category.id];
                        return (
                            <div key={category.id} className="bg-background/30 rounded-lg p-4">
                               <div className="flex items-center gap-3 mb-3">
                                   <Icon className="w-6 h-6 text-primary" />
                                   <h3 className="text-lg font-semibold">{category.title}</h3>
                               </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                {category.subcategories.map((subcategory) => (
                                    <div key={subcategory.id} className="flex items-center space-x-3">
                                        <Checkbox id={`${category.id}-${subcategory.id}`} checked={isSelected && isSelected.includes(subcategory.id)} onCheckedChange={(checked) => handleExperienceChange(category.id, subcategory.id, checked)} />
                                        <Label htmlFor={`${category.id}-${subcategory.id}`} className="text-base cursor-pointer">{subcategory.label}</Label>
                                    </div>
                                ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Section>

             <Section id="modalities" title="Modalités de mes propositions" icon={Compass}>
                <div className="space-y-6">
                    <div>
                        <Label className="font-semibold text-lg">Quelles intentions vos pratiques nourrissent-elles ?</Label>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                           {intentions.map(item => (
                               <div key={item.value} className="flex items-center space-x-3">
                                   <Checkbox id={`intention-${item.value}`} checked={formData.intentions.includes(item.value)} onCheckedChange={(checked) => handleMultiCheckboxChange('intentions', item.value, checked)} />
                                   <Label htmlFor={`intention-${item.value}`} className="text-base cursor-pointer flex items-center gap-2"><item.icon className="w-5 h-5"/>{item.label}</Label>
                               </div>
                           ))}
                        </div>
                    </div>
                     <div>
                        <Label className="font-semibold text-lg">Sur quelle durée se déroulent vos expériences ?</Label>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                           {durations.map(item => (
                               <div key={item.value} className="flex items-center space-x-3">
                                   <Checkbox id={`duration-${item.value}`} checked={formData.durations.includes(item.value)} onCheckedChange={(checked) => handleMultiCheckboxChange('durations', item.value, checked)} />
                                   <Label htmlFor={`duration-${item.value}`} className="text-base cursor-pointer flex items-center gap-2"><item.icon className="w-5 h-5"/>{item.label}</Label>
                               </div>
                           ))}
                        </div>
                    </div>
                     <div>
                        <Label className="font-semibold text-lg">Dans quel type de lieu pratiquez-vous ?</Label>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                           {locations.map(item => (
                               <div key={item.value} className="flex items-center space-x-3">
                                   <Checkbox id={`location-${item.value}`} checked={formData.locations.includes(item.value)} onCheckedChange={(checked) => handleMultiCheckboxChange('locations', item.value, checked)} />
                                   <Label htmlFor={`location-${item.value}`} className="text-base cursor-pointer flex items-center gap-2"><item.icon className="w-5 h-5"/>{item.label}</Label>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="approach" title="Mon Approche & Mon Message" icon={MessageSquare}>
                 <div className="space-y-6">
                    <div>
                        <Label htmlFor="approach" className="font-semibold text-lg">Mon approche*</Label>
                        <p className="text-sm text-foreground/70 italic">Comment décrirais-tu ta manière de travailler, ta "patte" ?</p>
                        <Textarea id="approach" name="approach" value={formData.approach} onChange={handleChange} rows={3} required />
                    </div>
                    <div>
                        <Label htmlFor="messageBienvenue" className="font-semibold text-lg">Un message pour toi*</Label>
                        <p className="text-sm text-foreground/70 italic">Un message d'accueil pour la personne qui découvrira ta fiche.</p>
                        <Textarea id="messageBienvenue" name="messageBienvenue" value={formData.messageBienvenue} onChange={handleChange} rows={2} required />
                    </div>
                    <div>
                        <Label htmlFor="mantra" className="font-semibold text-lg">Mon mantra</Label>
                         <p className="text-sm text-foreground/70 italic">Une phrase qui te guide (facultatif).</p>
                        <Input id="mantra" name="mantra" value={formData.mantra} onChange={handleChange} />
                    </div>
                </div>
            </Section>

            <div className="text-center pt-8 border-t border-primary/20">
              <Button type="submit" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Je fais rayonner ma médecine 🌺
              </Button>
            </div>
            
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default RegisterTherapistPage;