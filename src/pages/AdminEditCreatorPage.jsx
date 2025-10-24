import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Save, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { CommuneCombobox } from '@/components/CommuneCombobox';

const AdminEditCreatorPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    artist_name: '',
    email: '',
    phone: '',
    commune: '',
    art_type: '',
    description: '',
    inspiration: '',
    message: '',
  });

  useEffect(() => {
    const adminAccess = sessionStorage.getItem('adminAccess');
    if (!adminAccess || adminAccess !== 'true') {
      navigate('/admin-login');
      return;
    }

    loadCreator();
  }, [id, navigate]);

  const loadCreator = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Créateur introuvable."
        });
        navigate('/admin/dashboard');
        return;
      }

      setFormData({
        name: data.name || '',
        artist_name: data.artist_name || '',
        email: data.email || '',
        phone: data.phone || '',
        commune: data.commune || '',
        art_type: data.art_type || '',
        description: data.description || '',
        inspiration: data.inspiration || '',
        message: data.message || '',
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les données."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('creators')
        .update({
          name: formData.name,
          artist_name: formData.artist_name,
          email: formData.email,
          phone: formData.phone,
          commune: formData.commune,
          art_type: formData.art_type,
          description: formData.description,
          inspiration: formData.inspiration,
          message: formData.message,
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Les modifications ont été enregistrées avec succès."
      });

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications."
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <p className="text-xl">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen px-4 pb-12">
      <Helmet>
        <title>Modifier Créateur - Admin - Terra Nova</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate('/admin/dashboard')}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au tableau de bord
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold aura-text">Modifier Créateur</h1>
              <p className="text-foreground/70 text-sm">Édition administrative</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="crystal-card rounded-3xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-base mb-2">
                Nom & Prénom *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div>
              <Label htmlFor="artist_name" className="text-base mb-2">
                Nom d'Artiste
              </Label>
              <Input
                id="artist_name"
                name="artist_name"
                type="text"
                value={formData.artist_name}
                onChange={handleChange}
                className="h-12"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email" className="text-base mb-2">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-base mb-2">
                Téléphone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="h-12"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="commune" className="text-base mb-2">
                Commune *
              </Label>
              <CommuneCombobox
                value={formData.commune}
                onChange={(value) => handleSelectChange('commune', value)}
              />
            </div>

            <div>
              <Label htmlFor="art_type" className="text-base mb-2">
                Type d'Art *
              </Label>
              <Input
                id="art_type"
                name="art_type"
                type="text"
                value={formData.art_type}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-base mb-2">
              Démarche Artistique
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="inspiration" className="text-base mb-2">
              Sources d'Inspiration
            </Label>
            <Textarea
              id="inspiration"
              name="inspiration"
              value={formData.inspiration}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-base mb-2">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600 text-white h-12"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
              className="h-12"
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditCreatorPage;
