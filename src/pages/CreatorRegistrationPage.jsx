import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Palette, Heart, Image as ImageIcon, Mail, Phone, MapPin, Sparkles, Send, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/customSupabaseClient';
import { CommuneCombobox } from '@/components/CommuneCombobox';


const CreatorRegistrationPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    artistName: '',
    email: '',
    phone: '',
    commune: '',
    password: '',
    confirmPassword: '',
    artType: '',
    artTypeOther: '',
    description: '',
    inspiration: '',
    message: '',
    profilePhoto: null,
    artPhotos: [null, null, null, null]
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

    if (!formData.name || !formData.email || !formData.commune || !formData.artType || !formData.password) {
      toast({
        title: 'Informations manquantes',
        description: 'Veuillez remplir tous les champs obligatoires, y compris le mot de passe.',
        variant: 'destructive'
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive'
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Mot de passe trop court',
        description: 'Le mot de passe doit contenir au moins 6 caractères.',
        variant: 'destructive'
      });
      return;
    }

    if (formData.artType === 'Autre' && !formData.artTypeOther) {
      toast({
        title: 'Informations manquantes',
        description: 'Veuillez préciser votre type d\'art.',
        variant: 'destructive'
      });
      return;
    }

    const uploadedArtPhotos = formData.artPhotos.filter(photo => photo !== null);
    if (uploadedArtPhotos.length < 1) {
      toast({
        title: 'Photos manquantes',
        description: 'Veuillez ajouter au moins 1 photo de vos créations artistiques.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const finalArtType = formData.artType === 'Autre' ? formData.artTypeOther : formData.artType;

      const { data, error } = await supabase
        .from('creators')
        .insert([{
          name: formData.name,
          artist_name: formData.artistName,
          email: formData.email,
          phone: formData.phone,
          commune: formData.commune,
          password: formData.password,
          art_type: finalArtType,
          description: formData.description,
          inspiration: formData.inspiration,
          message: formData.message,
          profile_photo_url: formData.profilePhoto,
          art_photos: uploadedArtPhotos,
          is_approved: true
        }])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: 'Fiche créée avec succès !',
        description: 'Votre fiche créateur est maintenant visible dans l\'annuaire.',
      });

      setTimeout(() => {
        navigate('/annuaire-creations');
      }, 1500);
    } catch (error) {
      console.error('Error submitting creator:', error);

      let errorMessage = error.message || 'Une erreur est survenue. Veuillez réessayer.';

      if (error.message && error.message.includes('duplicate key') && error.message.includes('email')) {
        errorMessage = "Cet email est déjà utilisé. Si c'est votre fiche, connectez-vous pour la modifier ou utilisez un autre email.";
      }

      toast({
        title: 'Erreur lors de l\'enregistrement',
        description: errorMessage,
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

              <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 p-6 rounded-xl border-2 border-purple-500/30">
                <Label htmlFor="artistName" className="text-lg mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Nom d'Artiste
                </Label>
                <Input
                  id="artistName"
                  name="artistName"
                  type="text"
                  placeholder="Votre nom de scène ou signature artistique"
                  value={formData.artistName}
                  onChange={handleChange}
                  className="h-12 text-lg bg-background/80"
                />
                <p className="text-sm text-foreground/60 mt-2">
                  Le nom sous lequel vous souhaitez être connu(e) en tant qu'artiste
                </p>
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
                <CommuneCombobox
                  value={formData.commune}
                  onChange={(value) => handleSelectChange('commune', value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="text-lg mb-2">
                    Mot de passe * (min. 6 caractères)
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 text-lg pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-foreground/60 mt-1">
                    Ce mot de passe vous permettra d'accéder à votre espace personnel
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-lg mb-2">
                    Confirmer le mot de passe *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="h-12 text-lg pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold aura-text flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-purple-500" />
                Photos de vos Créations
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
                  Photos de vos Créations * (minimum 1)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.artPhotos.map((photo, index) => (
                    <div key={index} className="relative">
                      {photo ? (
                        <div className="relative group">
                          <img
                            src={photo}
                            alt={`Création ${index + 1}`}
                            className="w-full h-48 object-cover rounded-xl"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeArtPhoto(index)}
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
                            id={`art-photo-${index}`}
                          />
                          <label htmlFor={`art-photo-${index}`} className="cursor-pointer text-center p-4">
                            <ImageIcon className="w-8 h-8 mx-auto mb-2 text-foreground/40" />
                            <p className="text-sm text-foreground/70">Photo {index + 1}</p>
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-foreground/60 mt-2">
                  {formData.artPhotos.filter(p => p !== null).length} photo(s) ajoutée(s) (minimum 1 requis)
                </p>
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
                <Select value={formData.artType} onValueChange={(value) => handleSelectChange('artType', value)}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Sélectionnez votre type d'art" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Peinture">Peinture</SelectItem>
                    <SelectItem value="Sculpture">Sculpture</SelectItem>
                    <SelectItem value="Bijoux">Bijoux</SelectItem>
                    <SelectItem value="Tissage">Tissage</SelectItem>
                    <SelectItem value="Poterie">Poterie</SelectItem>
                    <SelectItem value="Photographie">Photographie</SelectItem>
                    <SelectItem value="Art Textile">Art Textile</SelectItem>
                    <SelectItem value="Art Floral">Art Floral</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.artType === 'Autre' && (
                <div>
                  <Label htmlFor="artTypeOther" className="text-lg mb-2">
                    Précisez votre type d'art *
                  </Label>
                  <Input
                    id="artTypeOther"
                    name="artTypeOther"
                    type="text"
                    placeholder="Décrivez votre type d'art..."
                    value={formData.artTypeOther}
                    onChange={handleChange}
                    required
                    className="h-12 text-lg"
                  />
                </div>
              )}
            </div>

            <div className="space-y-6">

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
