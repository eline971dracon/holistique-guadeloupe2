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

const AdminEditTherapistPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surnom: '',
    email: '',
    phone: '',
    commune: '',
    vibrational_phrase: '',
    mission: '',
    approach: '',
  });

  useEffect(() => {
    const adminAccess = sessionStorage.getItem('adminAccess');
    if (!adminAccess || adminAccess !== 'true') {
      navigate('/admin-login');
      return;
    }

    loadTherapist();
  }, [id, navigate]);

  const loadTherapist = async () => {
    try {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Thérapeute introuvable."
        });
        navigate('/admin/dashboard');
        return;
      }

      setFormData({
        name: data.name || '',
        surnom: data.surnom || '',
        email: data.email || '',
        phone: data.phone || '',
        commune: data.commune || '',
        vibrational_phrase: data.vibrational_phrase || '',
        mission: data.mission || '',
        approach: data.approach || '',
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
        .from('therapists')
        .update({
          name: formData.name,
          surnom: formData.surnom,
          email: formData.email,
          phone: formData.phone,
          commune: formData.commune,
          vibrational_phrase: formData.vibrational_phrase,
          mission: formData.mission,
          approach: formData.approach,
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
        <title>Modifier Thérapeute - Admin - Terra Nova</title>
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
              <h1 className="text-3xl font-bold aura-text">Modifier Thérapeute</h1>
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
              <Label htmlFor="surnom" className="text-base mb-2">
                Surnom
              </Label>
              <Input
                id="surnom"
                name="surnom"
                type="text"
                value={formData.surnom}
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
            <Label htmlFor="vibrational_phrase" className="text-base mb-2">
              Phrase Vibratoire / Mantra
            </Label>
            <Input
              id="vibrational_phrase"
              name="vibrational_phrase"
              type="text"
              value={formData.vibrational_phrase}
              onChange={handleChange}
              className="h-12"
            />
          </div>

          <div>
            <Label htmlFor="mission" className="text-base mb-2">
              Mission de Cœur
            </Label>
            <Textarea
              id="mission"
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="approach" className="text-base mb-2">
              Approche
            </Label>
            <Textarea
              id="approach"
              name="approach"
              value={formData.approach}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white h-12"
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

export default AdminEditTherapistPage;
