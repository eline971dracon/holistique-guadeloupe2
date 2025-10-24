import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Sparkles, Heart, Palette, Save, Image as ImageIcon, X, Instagram, Facebook, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/customSupabaseClient';
import { CommuneCombobox } from '@/components/CommuneCombobox';

const artTypes = [
  'Peinture', 'Sculpture', 'Photographie', 'Artisanat', 'Bijouterie',
  'Céramique', 'Textile', 'Art numérique', 'Illustration', 'Autre'
];

const EditCreatorProfilePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const loadCreatorData = async () => {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      const userType = localStorage.getItem('userType');

      if (!loggedInUserId || userType !== 'creator') {
        toast({ variant: "destructive", title: "Accès non autorisé", description: "Vous devez être connecté en tant que créateur." });
        navigate('/');
        return;
      }

      try {
        const { data: creatorData, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', loggedInUserId)
          .maybeSingle();

        if (error) throw error;

        if (creatorData) {
          setCreator(creatorData);
          const socialLinks = creatorData.social_links || {};
          const artPhotos = creatorData.art_photos || [];

          setFormData({
            name: creatorData.name || '',
            artistName: creatorData.artist_name || '',
            email: creatorData.email || '',
            commune: creatorData.commune || '',
            phone: creatorData.phone || '',
            instagram: socialLinks.instagram || '',
            facebook: socialLinks.facebook || '',
            website: socialLinks.website || '',
            artType: creatorData.art_type || '',
            artTypeOther: '',
            description: creatorData.description || '',
            inspiration: creatorData.inspiration || '',
            message: creatorData.message || '',
            profilePhoto: creatorData.profile_photo_url || null,
            artPhotos: [
              artPhotos[0] || null,
              artPhotos[1] || null,
              artPhotos[2] || null,
              artPhotos[3] || null,
            ],
          });
        } else {
          toast({ variant: "destructive", title: "Profil non trouvé", description: "Impossible de charger les données du profil." });
          navigate('/annuaire-creations');
        }
      } catch (error) {
        console.error('Error loading creator:', error);
        toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger les données du profil." });
        navigate('/annuaire-creations');
      }
    };

    loadCreatorData();
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
            const newArtPhotos = [...prev.artPhotos];
            newArtPhotos[index] = reader.result;
            return { ...prev, artPhotos: newArtPhotos };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeArtPhoto = (index) => {
    setFormData(prev => {
      const newArtPhotos = [...prev.artPhotos];
      newArtPhotos[index] = null;
      return { ...prev, artPhotos: newArtPhotos };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalArtType = formData.artType === 'Autre' ? formData.artTypeOther : formData.artType;

      const socialLinks = {};
      if (formData.instagram) socialLinks.instagram = formData.instagram;
      if (formData.facebook) socialLinks.facebook = formData.facebook;
      if (formData.website) socialLinks.website = formData.website;

      const artPhotos = formData.artPhotos.filter(photo => photo !== null);

      const { error } = await supabase
        .from('creators')
        .update({
          name: formData.name,
          artist_name: formData.artistName,
          email: formData.email,
          commune: formData.commune,
          phone: formData.phone,
          social_links: socialLinks,
          art_type: finalArtType,
          description: formData.description,
          inspiration: formData.inspiration,
          message: formData.message,
          profile_photo_url: formData.profilePhoto,
          art_photos: artPhotos,
        })
        .eq('id', creator.id);

      if (error) throw error;

      toast({
        title: "✨ Profil Mis à Jour !",
        description: "Votre fiche créative a été mise à jour avec succès.",
      });
      navigate(`/createur/${creator.id}`);
    } catch (error) {
      console.error('Error updating creator:', error);
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
        <title>Modifier ma Fiche - {creator?.name}</title>
        <meta name="description" content="Modifiez votre fiche créative sur le Réseau Holistique de Guadeloupe." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="aura-text font-['Dancing_Script']">Modifier mon art sacré</span>
            </h1>
            <p className="text-xl text-foreground/80 mt-4">Faites rayonner votre créativité, {creator?.name}.</p>
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
                <Label className="font-['Dancing_Script'] aura-text text-2xl">Photos de mes créations (jusqu'à 4)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {formData.artPhotos.map((photo, index) => (
                    <div key={index} className="relative">
                      {photo ? (
                        <div className="relative">
                          <img src={photo} alt={`Art ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => removeArtPhoto(index)}
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
                <Label htmlFor="name" className="font-['Dancing_Script'] aura-text text-3xl">Nom Complet *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artistName" className="font-['Dancing_Script'] aura-text text-3xl">Nom d'Artiste</Label>
                <Input id="artistName" name="artistName" value={formData.artistName} onChange={handleChange} />
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
                  <MapPin className="w-5 h-5" />Commune *
                </Label>
                <CommuneCombobox value={formData.commune} onChange={(value) => handleSelectChange('commune', value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artType" className="font-['Dancing_Script'] aura-text text-3xl">Type d'Art *</Label>
                <Select onValueChange={(value) => handleSelectChange('artType', value)} value={formData.artType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {artTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.artType === 'Autre' && (
              <div className="space-y-2">
                <Label htmlFor="artTypeOther" className="font-['Dancing_Script'] aura-text text-2xl">Précisez votre type d'art *</Label>
                <Input id="artTypeOther" name="artTypeOther" value={formData.artTypeOther} onChange={handleChange} required />
              </div>
            )}

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

            <div className="space-y-2">
              <SectionTitle icon={Palette}>Ma démarche artistique</SectionTitle>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Décrivez votre démarche, votre style, ce qui vous inspire..." />
            </div>

            <div className="space-y-2">
              <SectionTitle icon={Sparkles}>Mes sources d'inspiration</SectionTitle>
              <Textarea id="inspiration" name="inspiration" value={formData.inspiration} onChange={handleChange} rows={3} placeholder="Qu'est-ce qui nourrit votre créativité ?" />
            </div>

            <div className="space-y-2">
              <SectionTitle icon={Heart}>Mon message</SectionTitle>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Un message à partager avec ceux qui découvrent votre travail..." />
            </div>

            <div className="text-center pt-8 border-t border-primary/20">
              <Button type="submit" className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Save className="w-5 h-5 mr-3" />
                Enregistrer mes créations
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default EditCreatorProfilePage;
