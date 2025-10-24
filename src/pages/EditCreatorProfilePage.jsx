import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Sparkles, Heart, Palette, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/customSupabaseClient';

const guadeloupeCommunes = [
  "Les Abymes", "Anse-Bertrand", "Baie-Mahault", "Baillif", "Basse-Terre", "Bouillante", "Capesterre-Belle-Eau", "Capesterre-de-Marie-Galante",
  "Deshaies", "La Désirade", "Le Gosier", "Gourbeyre", "Grand-Bourg", "Lamentin", "Morne-à-l'Eau", "Le Moule", "Petit-Bourg", "Petit-Canal",
  "Pointe-à-Pitre", "Pointe-Noire", "Port-Louis", "Saint-Claude", "Saint-François", "Saint-Louis", "Sainte-Anne", "Sainte-Rose",
  "Terre-de-Bas", "Terre-de-Haut", "Trois-Rivières", "Vieux-Fort", "Vieux-Habitants"
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
          setFormData({
            name: creatorData.name || '',
            artist_name: creatorData.artist_name || '',
            commune: creatorData.commune || '',
            phone: creatorData.phone || '',
            instagram: creatorData.instagram || '',
            facebook: creatorData.facebook || '',
            art_type: creatorData.art_type || '',
            description: creatorData.description || '',
            inspiration: creatorData.inspiration || '',
            message: creatorData.message || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('creators')
        .update({
          name: formData.name,
          artist_name: formData.artist_name,
          commune: formData.commune,
          phone: formData.phone,
          instagram: formData.instagram,
          facebook: formData.facebook,
          art_type: formData.art_type,
          description: formData.description,
          inspiration: formData.inspiration,
          message: formData.message,
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-['Dancing_Script'] aura-text text-3xl">Nom Complet</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist_name" className="font-['Dancing_Script'] aura-text text-3xl">Nom d'Artiste</Label>
                <Input id="artist_name" name="artist_name" value={formData.artist_name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commune" className="font-['Dancing_Script'] aura-text text-3xl">Commune</Label>
                <Select onValueChange={(value) => handleSelectChange('commune', value)} value={formData.commune}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{guadeloupeCommunes.sort().map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="art_type" className="font-['Dancing_Script'] aura-text text-3xl">Type d'Art</Label>
                <Input id="art_type" name="art_type" value={formData.art_type} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-['Dancing_Script'] aura-text text-3xl">Téléphone</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram" className="font-['Dancing_Script'] aura-text text-3xl">Instagram</Label>
                <Input id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@votre_compte" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook" className="font-['Dancing_Script'] aura-text text-3xl">Facebook</Label>
                <Input id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <SectionTitle icon={Palette}>Ma démarche artistique</SectionTitle>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} />
            </div>

            <div className="space-y-2">
              <SectionTitle icon={Sparkles}>Mes sources d'inspiration</SectionTitle>
              <Textarea id="inspiration" name="inspiration" value={formData.inspiration} onChange={handleChange} rows={3} />
            </div>

            <div className="space-y-2">
              <SectionTitle icon={Heart}>Mon message</SectionTitle>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} />
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
