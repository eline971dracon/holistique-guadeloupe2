import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Image as ImageIcon, Droplets, Mountain, Sun, Wind, Star as StarIcon, User, Phone, Mail, MapPin, MessageSquare, Compass, Leaf, Waves, Brush, Users, Calendar, Palmtree, Trees, Coffee, Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { experienceCategories } from '@/lib/journeyData';
import { supabase } from '@/lib/customSupabaseClient';

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

const RegisterTherapistPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    commune: '',
    relianceDirecte: '',
    presenceInspirante: '',
    vibrationalPhrase: '',
    mission: '',
    approach: '',
    messageBienvenue: '',
    mantra: '',
    profilePhoto: null,
    practicePhotos: [null, null, null, null],
    elements: [],
    experiences: {},
    intentions: [],
    durations: [],
    locations: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, isProfile = false, index = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isProfile) {
          setFormData(prev => ({ ...prev, profilePhoto: reader.result }));
        } else if (index !== null) {
          setFormData(prev => {
            const newPracticePhotos = [...prev.practicePhotos];
            newPracticePhotos[index] = reader.result;
            return { ...prev, practicePhotos: newPracticePhotos };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePracticePhoto = (index) => {
    setFormData(prev => {
      const newPracticePhotos = [...prev.practicePhotos];
      newPracticePhotos[index] = null;
      return { ...prev, practicePhotos: newPracticePhotos };
    });
  };

  const handleElementChange = (elementId) => {
    setFormData(prev => {
      const newElements = prev.elements.includes(elementId)
        ? prev.elements.filter(id => id !== elementId)
        : [...prev.elements, elementId];
      return { ...prev, elements: newElements.slice(0, 2) };
    });
  };

  const handleIntentionChange = (intentionValue) => {
    setFormData(prev => {
      const newIntentions = prev.intentions.includes(intentionValue)
        ? prev.intentions.filter(i => i !== intentionValue)
        : [...prev.intentions, intentionValue];
      return { ...prev, intentions: newIntentions };
    });
  };

  const handleDurationChange = (durationValue) => {
    setFormData(prev => {
      const newDurations = prev.durations.includes(durationValue)
        ? prev.durations.filter(d => d !== durationValue)
        : [...prev.durations, durationValue];
      return { ...prev, durations: newDurations };
    });
  };

  const handleLocationChange = (locationValue) => {
    setFormData(prev => {
      const newLocations = prev.locations.includes(locationValue)
        ? prev.locations.filter(l => l !== locationValue)
        : [...prev.locations, locationValue];
      return { ...prev, locations: newLocations };
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.commune) {
      toast({
        variant: "destructive",
        title: "Champs obligatoires manquants",
        description: "Veuillez remplir au moins le nom, l'email et la commune."
      });
      return;
    }

    const uploadedPracticePhotos = formData.practicePhotos.filter(photo => photo !== null);
    if (uploadedPracticePhotos.length < 1) {
      toast({
        variant: "destructive",
        title: "Photos manquantes",
        description: "Veuillez ajouter au moins 1 photo de votre pratique ou espace de soin."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('therapists')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          commune: formData.commune,
          reliance_directe: formData.relianceDirecte,
          presence_inspirante: formData.presenceInspirante,
          vibrational_phrase: formData.vibrationalPhrase,
          mission: formData.mission,
          approach: formData.approach,
          message_bienvenue: formData.messageBienvenue,
          mantra: formData.mantra,
          profile_photo_url: formData.profilePhoto,
          practice_photos: uploadedPracticePhotos,
          elements: formData.elements,
          experiences: formData.experiences,
          intentions: formData.intentions,
          durations: formData.durations,
          locations: formData.locations,
          is_approved: true
        }])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Fiche créée avec succès !",
        description: "Votre fiche vibratoire rayonne maintenant dans l'annuaire.",
      });

      setTimeout(() => {
        navigate('/annuaire');
      }, 1500);
    } catch (error) {
      console.error('Error submitting therapist:', error);

      let errorMessage = error.message || "Une erreur est survenue. Veuillez réessayer.";

      if (error.message && error.message.includes('duplicate key') && error.message.includes('email')) {
        errorMessage = "Cet email est déjà utilisé. Si c'est votre fiche, connectez-vous pour la modifier ou utilisez un autre email.";
      }

      toast({
        variant: "destructive",
        title: "Erreur lors de l'enregistrement",
        description: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen mystical-gradient">
      <Helmet>
        <title>Inscription Thérapeute - Terra Nova</title>
        <meta name="description" content="Créez votre fiche thérapeute et rejoignez notre communauté holistique" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Heart className="w-16 h-16 mx-auto mb-4 text-rose-500" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 aura-text font-['Dancing_Script']">
            Ta Médecine Sacrée
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            C'est ici que l'âme vibre
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
                <User className="w-6 h-6 text-rose-500" />
                Identité Vibratoire
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

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="relianceDirecte" className="text-lg mb-2">
                    Reliance Directe
                  </Label>
                  <Input
                    id="relianceDirecte"
                    name="relianceDirecte"
                    type="text"
                    placeholder="Téléphone ou autre"
                    value={formData.relianceDirecte}
                    onChange={handleChange}
                    className="h-12 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="presenceInspirante" className="text-lg mb-2">
                    Présence Inspirante
                  </Label>
                  <Input
                    id="presenceInspirante"
                    name="presenceInspirante"
                    type="text"
                    placeholder="Site web, réseaux..."
                    value={formData.presenceInspirante}
                    onChange={handleChange}
                    className="h-12 text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold aura-text flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-rose-500" />
                Photos de votre Pratique
              </h2>

              <div>
                <Label className="text-lg mb-3 block">
                  Photo de Profil (optionnel)
                </Label>
                <div className="grid gap-4">
                  {formData.profilePhoto ? (
                    <div className="relative">
                      <img
                        src={formData.profilePhoto}
                        alt="Aperçu profil"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, profilePhoto: null }))}
                        className="absolute top-2 right-2"
                      >
                        Retirer
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, true)}
                        className="hidden"
                        id="profile-photo"
                      />
                      <label htmlFor="profile-photo" className="cursor-pointer">
                        <ImageIcon className="w-12 h-12 mx-auto mb-3 text-foreground/40" />
                        <p className="text-foreground/70">Cliquez pour ajouter votre photo</p>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-lg mb-3 block">
                  Photos de votre Pratique ou Espace de Soin * (minimum 1)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.practicePhotos.map((photo, index) => (
                    <div key={index} className="relative">
                      {photo ? (
                        <div className="relative group">
                          <img
                            src={photo}
                            alt={`Pratique ${index + 1}`}
                            className="w-full h-48 object-cover rounded-xl"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removePracticePhoto(index)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-border rounded-xl h-48 flex flex-col items-center justify-center hover:border-primary transition-colors cursor-pointer">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, false, index)}
                            className="hidden"
                            id={`practice-photo-${index}`}
                          />
                          <label htmlFor={`practice-photo-${index}`} className="cursor-pointer text-center p-4">
                            <ImageIcon className="w-8 h-8 mx-auto mb-2 text-foreground/40" />
                            <p className="text-sm text-foreground/70">Photo {index + 1}</p>
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-foreground/60 mt-2">
                  {formData.practicePhotos.filter(p => p !== null).length} photo(s) ajoutée(s) (minimum 1 requis)
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold aura-text flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-rose-500" />
                Essence & Éléments
              </h2>

              <div>
                <Label className="text-lg mb-3 block">
                  Éléments Dominants (2 max)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {elements.map((element) => {
                    const Icon = element.icon;
                    const isSelected = formData.elements.includes(element.id);
                    return (
                      <div
                        key={element.id}
                        onClick={() => handleElementChange(element.id)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-foreground/60'}`} />
                        <p className="font-semibold text-sm">{element.name}</p>
                        <p className="text-xs text-foreground/60 mt-1">{element.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label htmlFor="vibrationalPhrase" className="text-lg mb-2">
                  Phrase Vibratoire
                </Label>
                <Input
                  id="vibrationalPhrase"
                  name="vibrationalPhrase"
                  type="text"
                  placeholder="Une phrase qui résume votre essence..."
                  value={formData.vibrationalPhrase}
                  onChange={handleChange}
                  className="h-12 text-lg"
                />
              </div>

              <div>
                <Label htmlFor="mantra" className="text-lg mb-2">
                  Mantra
                </Label>
                <Input
                  id="mantra"
                  name="mantra"
                  type="text"
                  placeholder="Votre mantra personnel..."
                  value={formData.mantra}
                  onChange={handleChange}
                  className="h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold aura-text flex items-center gap-2">
                <Compass className="w-6 h-6 text-rose-500" />
                Voyage Intérieur - Mes Offres (optionnel)
              </h2>
              <p className="text-foreground/70">Si vous souhaitez faire partie du parcours "Voyage Intérieur", précisez vos offres :</p>

              <div>
                <Label className="text-lg mb-3 block">
                  Intentions proposées
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: 'detente', label: 'Détente', icon: Waves },
                    { value: 'guerison', label: 'Guérison', icon: Heart },
                    { value: 'creativite', label: 'Créativité', icon: Brush },
                    { value: 'connexion', label: 'Connexion', icon: Users },
                    { value: 'transformation', label: 'Transformation', icon: Sun }
                  ].map((intention) => {
                    const Icon = intention.icon;
                    const isSelected = formData.intentions.includes(intention.value);
                    return (
                      <div
                        key={intention.value}
                        onClick={() => handleIntentionChange(intention.value)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-foreground/60'}`} />
                        <p className="font-semibold text-sm">{intention.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label className="text-lg mb-3 block">
                  Durées proposées
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'demi-journee', label: 'Demi-journée', icon: Sun },
                    { value: 'journee', label: 'Journée complète', icon: StarIcon },
                    { value: 'mini-retraite', label: '1-2 jours (mini-retraite)', icon: Calendar }
                  ].map((duration) => {
                    const Icon = duration.icon;
                    const isSelected = formData.durations.includes(duration.value);
                    return (
                      <div
                        key={duration.value}
                        onClick={() => handleDurationChange(duration.value)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-foreground/60'}`} />
                        <p className="font-semibold text-sm">{duration.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label className="text-lg mb-3 block">
                  Lieux / Ambiances proposés
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: 'plage', label: 'Plage', icon: Palmtree },
                    { value: 'foret', label: 'Forêt', icon: Trees },
                    { value: 'espace-sacre', label: 'Espace sacré', icon: Sparkles },
                    { value: 'atelier-creatif', label: 'Atelier créatif', icon: Paintbrush },
                    { value: 'salle-cosy', label: 'Salle cosy', icon: Coffee }
                  ].map((location) => {
                    const Icon = location.icon;
                    const isSelected = formData.locations.includes(location.value);
                    return (
                      <div
                        key={location.value}
                        onClick={() => handleLocationChange(location.value)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-foreground/60'}`} />
                        <p className="font-semibold text-sm">{location.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold aura-text flex items-center gap-2">
                <Leaf className="w-6 h-6 text-rose-500" />
                Mes Pratiques
              </h2>

              {experienceCategories.map((category) => {
                const Icon = category.icon;
                const selectedSubcategories = formData.experiences[category.id] || [];

                return (
                  <div key={category.id} className="border border-border/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${category.id}-${subcategory.id}`}
                            checked={selectedSubcategories.includes(subcategory.id)}
                            onCheckedChange={(checked) =>
                              handleExperienceChange(category.id, subcategory.id, checked)
                            }
                          />
                          <Label
                            htmlFor={`${category.id}-${subcategory.id}`}
                            className="cursor-pointer text-base"
                          >
                            {subcategory.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold aura-text flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-rose-500" />
                Messages & Approche
              </h2>

              <div>
                <Label htmlFor="mission" className="text-lg mb-2">
                  Mission de Cœur
                </Label>
                <Textarea
                  id="mission"
                  name="mission"
                  placeholder="Quelle est votre mission profonde ?"
                  value={formData.mission}
                  onChange={handleChange}
                  rows={4}
                  className="text-lg resize-none"
                />
              </div>

              <div>
                <Label htmlFor="approach" className="text-lg mb-2">
                  Approche Thérapeutique
                </Label>
                <Textarea
                  id="approach"
                  name="approach"
                  placeholder="Comment accompagnez-vous vos clients ?"
                  value={formData.approach}
                  onChange={handleChange}
                  rows={4}
                  className="text-lg resize-none"
                />
              </div>

              <div>
                <Label htmlFor="messageBienvenue" className="text-lg mb-2">
                  Message de Bienvenue
                </Label>
                <Textarea
                  id="messageBienvenue"
                  name="messageBienvenue"
                  placeholder="Un message d'accueil chaleureux pour vos futurs clients..."
                  value={formData.messageBienvenue}
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
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xl py-6 rounded-full shadow-lg energy-pulse"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                {isSubmitting ? 'Envoi en cours...' : 'Je fais rayonner ma médecine'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterTherapistPage;
