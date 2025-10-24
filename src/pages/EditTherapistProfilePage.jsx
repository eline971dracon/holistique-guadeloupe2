import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Sparkles, Heart, Image as ImageIcon, Droplets, Mountain, Sun, Wind, Star as StarIcon, UserCheck, Compass, MessageSquare, Save, ChevronDown, X, Instagram, Facebook, Globe, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { experienceCategories } from '@/lib/journeyData';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/customSupabaseClient';
import { CommuneCombobox } from '@/components/CommuneCombobox';

const elements = [
  { id: 'Terre', name: 'Terre', icon: Mountain, description: 'Racine, corps, stabilité' },
  { id: 'Feu', name: 'Feu', icon: Sun, description: 'Émotion, puissance, transformation' },
  { id: 'Eau', name: 'Eau', icon: Droplets, description: 'Sensibilité, créativité, intuition' },
  { id: 'Air', name: 'Air', icon: Wind, description: 'Clarté, parole, connaissance' },
  { id: 'Éther', name: 'Éther', icon: StarIcon, description: 'Spiritualité, guidance, mystère' },
];

const EditTherapistProfilePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(null);
  const [formData, setFormData] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    const loadTherapistData = async () => {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      if (!loggedInUserId) {
        toast({ variant: "destructive", title: "Accès non autorisé", description: "Vous devez être connecté pour modifier un profil." });
        navigate('/');
        return;
      }

      try {
        const { data: therapistData, error } = await supabase
          .from('therapists')
          .select('*')
          .eq('id', loggedInUserId)
          .maybeSingle();

        if (error) throw error;

        if (therapistData) {
          setTherapist(therapistData);
          setFormData({
            name: therapistData.name || '',
            surnom: therapistData.surnom || '',
            email: therapistData.email || '',
            commune: therapistData.commune || '',
            phone: therapistData.phone || '',
            instagram: therapistData.instagram || '',
            facebook: therapistData.facebook || '',
            website: therapistData.website || '',
            vibrationalPhrase: therapistData.vibrational_phrase || '',
            mission: therapistData.mission || '',
            approach: therapistData.approach || '',
            messageBienvenue: therapistData.message_bienvenue || '',
            experiences: therapistData.experiences || {},
            elements: therapistData.elements || [],
            otherPractice: therapistData.other_practice || '',
            intentions: therapistData.intentions || [],
            durations: therapistData.durations || [],
            locations: therapistData.locations || [],
            availabilityDays: therapistData.availability_days || [],
            profilePhoto: therapistData.profile_photo_url || null,
            practicePhotos: [
              therapistData.practice_photo_1_url || null,
              therapistData.practice_photo_2_url || null,
              therapistData.practice_photo_3_url || null,
              therapistData.practice_photo_4_url || null,
            ],
          });
        } else {
          toast({ variant: "destructive", title: "Profil non trouvé", description: "Impossible de charger les données du profil." });
          navigate('/annuaire');
        }
      } catch (error) {
        console.error('Error loading therapist:', error);
        toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger les données du profil." });
        navigate('/annuaire');
      }
    };

    loadTherapistData();
  }, [navigate, toast]);

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

  const handleCategoryToggle = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
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

  const handleElementChange = (elementId) => {
    setFormData(prev => {
      const newElements = prev.elements.includes(elementId)
        ? prev.elements.filter(id => id !== elementId)
        : [...prev.elements, elementId];
      return { ...prev, elements: newElements.slice(0, 3) };
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

  const handleAvailabilityDayChange = (day) => {
    setFormData(prev => {
      const newDays = prev.availabilityDays.includes(day)
        ? prev.availabilityDays.filter(d => d !== day)
        : [...prev.availabilityDays, day];
      return { ...prev, availabilityDays: newDays };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('therapists')
        .update({
          name: formData.name,
          surnom: formData.surnom,
          email: formData.email,
          commune: formData.commune,
          phone: formData.phone,
          instagram: formData.instagram,
          facebook: formData.facebook,
          website: formData.website,
          vibrational_phrase: formData.vibrationalPhrase,
          mission: formData.mission,
          approach: formData.approach,
          message_bienvenue: formData.messageBienvenue,
          experiences: formData.experiences,
          elements: formData.elements,
          other_practice: formData.otherPractice,
          intentions: formData.intentions,
          durations: formData.durations,
          locations: formData.locations,
          availability_days: formData.availabilityDays,
          profile_photo_url: formData.profilePhoto,
          practice_photo_1_url: formData.practicePhotos[0],
          practice_photo_2_url: formData.practicePhotos[1],
          practice_photo_3_url: formData.practicePhotos[2],
          practice_photo_4_url: formData.practicePhotos[3],
        })
        .eq('id', therapist.id);

      if (error) throw error;

      toast({
        title: "✨ Profil Mis à Jour !",
        description: "Votre fiche vibratoire a été mise à jour avec succès.",
      });
      navigate(`/therapeute/${therapist.id}`);
    } catch (error) {
      console.error('Error updating therapist:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications.",
      });
    }
  };

  if (!formData) {
    return <div className="pt-24 min-h-screen flex items-center justify-center">Chargement de votre espace...</div>;
  }

  const SectionTitle = ({ icon: Icon, children }) => (
    <div className="flex items-center text-2xl font-bold font-['Dancing_Script'] aura-text">
        <Icon className="w-6 h-6 mr-3 text-primary" />
        {children}
    </div>
  );

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Modifier ma Fiche - {therapist?.name}</title>
        <meta name="description" content="Modifiez votre fiche vibratoire sur le Réseau Holistique de Guadeloupe." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="aura-text font-['Dancing_Script']">Modifier ma médecine sacrée</span>
            </h1>
            <p className="text-xl text-foreground/80 mt-4">Faites rayonner votre nouvelle vibration, {therapist?.name}.</p>
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
            className="crystal-card rounded-3xl p-8 md:p-12 space-y-12"
          >
            <div className="space-y-8">
              <SectionTitle icon={ImageIcon}>Photos</SectionTitle>

              <div className="space-y-2">
                <Label className="font-['Dancing_Script'] aura-text text-2xl">Photo de Profil</Label>
                <div className="flex items-center gap-4">
                  {formData.profilePhoto && (
                    <img src={formData.profilePhoto} alt="Profil" className="w-24 h-24 object-cover rounded-full" />
                  )}
                  <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, true)} />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="font-['Dancing_Script'] aura-text text-2xl">Photos de ma pratique (jusqu'à 4)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {formData.practicePhotos.map((photo, index) => (
                    <div key={index} className="relative">
                      {photo ? (
                        <div className="relative">
                          <img src={photo} alt={`Pratique ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => removePracticePhoto(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50">
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, false, index)}
                          />
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-['Dancing_Script'] aura-text text-3xl">Nom d'Âme *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surnom" className="font-['Dancing_Script'] aura-text text-3xl">Surnom</Label>
                <Input id="surnom" name="surnom" value={formData.surnom} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-['Dancing_Script'] aura-text text-3xl flex items-center gap-2">
                  <Mail className="w-5 h-5" />Email *
                </Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-['Dancing_Script'] aura-text text-3xl flex items-center gap-2">
                  <Phone className="w-5 h-5" />Téléphone
                </Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label className="font-['Dancing_Script'] aura-text text-3xl flex items-center gap-2">
                  <MapPin className="w-5 h-5" />Terre d'Ancrage *
                </Label>
                <CommuneCombobox value={formData.commune} onChange={(value) => handleSelectChange('commune', value)} />
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle icon={Globe}>Présences numériques</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />Instagram
                  </Label>
                  <Input id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@votre_compte" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center gap-2">
                    <Facebook className="w-4 h-4" />Facebook
                  </Label>
                  <Input id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />Site Web
                  </Label>
                  <Input id="website" name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle icon={Sparkles}>Mon alignement (3 éléments max)</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {elements.map(el => (
                  <label key={el.id} className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.elements.includes(el.id) ? 'border-primary bg-primary/10' : 'border-input'}`}>
                    <input type="checkbox" className="hidden" checked={formData.elements.includes(el.id)} onChange={() => handleElementChange(el.id)} />
                    <el.icon className="w-8 h-8 mb-2" />
                    <span className="font-semibold">{el.name}</span>
                    <span className="text-xs text-center text-muted-foreground mt-1">({el.description})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <SectionTitle icon={Heart}>Ma phrase d'appel / Mantra *</SectionTitle>
              <Textarea id="vibrationalPhrase" name="vibrationalPhrase" value={formData.vibrationalPhrase} onChange={handleChange} rows={2} required />
            </div>

            <div className="space-y-2">
              <SectionTitle icon={Compass}>Ma mission de cœur *</SectionTitle>
              <Textarea id="mission" name="mission" value={formData.mission} onChange={handleChange} rows={3} required />
            </div>

            <div className="space-y-4">
              <SectionTitle icon={StarIcon}>Mes pratiques</SectionTitle>
              <div className="space-y-4">
                {experienceCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = formData.experiences && formData.experiences[category.id];
                  const isOpen = openCategory === category.id;

                  return (
                    <div key={category.id} className="crystal-card rounded-2xl p-4 transition-all duration-300">
                      <button type="button" onClick={() => handleCategoryToggle(category.id)} className={cn("w-full flex justify-between items-center text-left", isSelected ? "text-primary" : "" )}>
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
                                  <Checkbox id={`${category.id}-${subcategory.id}`} checked={isSelected && isSelected.includes(subcategory.id)} onCheckedChange={(checked) => handleExperienceChange(category.id, subcategory.id, checked)} />
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherPractice" className="font-['Dancing_Script'] aura-text text-2xl">Autre pratique non listée</Label>
              <Input id="otherPractice" name="otherPractice" value={formData.otherPractice} onChange={handleChange} placeholder="Précisez ici..." />
            </div>

            <div className="space-y-4">
              <SectionTitle icon={Heart}>Intentions que j'accompagne</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Se libérer', 'Se reconnecter', 'Se transformer', 'S\'épanouir', 'Guérir'].map(intention => (
                  <label key={intention} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox checked={formData.intentions.includes(intention)} onCheckedChange={() => handleIntentionChange(intention)} />
                    <span>{intention}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle icon={Calendar}>Durées de séances proposées</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['30 min', '1h', '1h30', '2h+'].map(duration => (
                  <label key={duration} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox checked={formData.durations.includes(duration)} onCheckedChange={() => handleDurationChange(duration)} />
                    <span>{duration}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle icon={MapPin}>Où je pratique</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Cabinet', 'À domicile', 'En ligne'].map(location => (
                  <label key={location} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox checked={formData.locations.includes(location)} onCheckedChange={() => handleLocationChange(location)} />
                    <span>{location}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle icon={Calendar}>Mes disponibilités</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(day => (
                  <label key={day} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox checked={formData.availabilityDays.includes(day)} onCheckedChange={() => handleAvailabilityDayChange(day)} />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <SectionTitle icon={UserCheck}>Mon approche *</SectionTitle>
              <Textarea id="approach" name="approach" value={formData.approach} onChange={handleChange} rows={3} required />
            </div>

            <div className="space-y-2">
              <SectionTitle icon={MessageSquare}>Un message pour toi *</SectionTitle>
              <Textarea id="messageBienvenue" name="messageBienvenue" value={formData.messageBienvenue} onChange={handleChange} rows={2} required />
            </div>

            <div className="text-center pt-8 border-t border-primary/20">
              <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Save className="w-5 h-5 mr-3" />
                Enregistrer mes vibrations
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default EditTherapistProfilePage;
