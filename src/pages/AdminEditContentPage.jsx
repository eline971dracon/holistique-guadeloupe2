import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AdminEditContentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('eline');

  const [elineContent, setElineContent] = useState({});
  const [servicesContent, setServicesContent] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const adminAccess = sessionStorage.getItem('adminAccess');
    if (adminAccess !== 'true') {
      navigate('/admin/login');
      return;
    }

    loadContent();
  }, [navigate]);

  const loadContent = async () => {
    try {
      const [elineRes, servicesRes, blogRes] = await Promise.all([
        supabase.from('eline_content').select('*'),
        supabase.from('services_content').select('*'),
        supabase.from('blog_posts').select('*').order('published_date', { ascending: false })
      ]);

      if (elineRes.data) {
        const contentMap = {};
        elineRes.data.forEach(item => {
          contentMap[item.section_key] = item.content;
        });
        setElineContent(contentMap);
      }

      if (servicesRes.data) {
        setServicesContent(servicesRes.data);
      }

      if (blogRes.data) {
        setBlogPosts(blogRes.data);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de charger le contenu'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleElineContentChange = (key, value) => {
    setElineContent(prev => ({ ...prev, [key]: value }));
  };

  const handleServiceChange = (index, field, value) => {
    const updated = [...servicesContent];
    updated[index] = { ...updated[index], [field]: value };
    setServicesContent(updated);
  };

  const handleBlogChange = (index, field, value) => {
    const updated = [...blogPosts];
    updated[index] = { ...updated[index], [field]: value };
    setBlogPosts(updated);
  };

  const saveElineContent = async () => {
    setIsSaving(true);
    try {
      for (const [key, value] of Object.entries(elineContent)) {
        const { error } = await supabase
          .from('eline_content')
          .upsert({ section_key: key, content: value, updated_at: new Date().toISOString() }, { onConflict: 'section_key' });

        if (error) throw error;
      }

      toast({
        title: 'Sauvegardé',
        description: 'Le contenu Eline a été mis à jour'
      });
    } catch (error) {
      console.error('Error saving Eline content:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de sauvegarder'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const saveServicesContent = async () => {
    setIsSaving(true);
    try {
      for (const service of servicesContent) {
        const { error } = await supabase
          .from('services_content')
          .upsert({ ...service, updated_at: new Date().toISOString() }, { onConflict: 'service_key' });

        if (error) throw error;
      }

      toast({
        title: 'Sauvegardé',
        description: 'Les services ont été mis à jour'
      });
    } catch (error) {
      console.error('Error saving services:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de sauvegarder'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const saveBlogPosts = async () => {
    setIsSaving(true);
    try {
      for (const post of blogPosts) {
        const { error } = await supabase
          .from('blog_posts')
          .upsert({ ...post, updated_at: new Date().toISOString() }, { onConflict: 'id' });

        if (error) throw error;
      }

      toast({
        title: 'Sauvegardé',
        description: 'Les articles du blog ont été mis à jour'
      });
    } catch (error) {
      console.error('Error saving blog posts:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de sauvegarder'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addNewBlogPost = () => {
    setBlogPosts([...blogPosts, {
      id: crypto.randomUUID(),
      title: 'Nouveau Article',
      excerpt: '',
      content: '',
      author: 'Eline Dracon',
      published_date: new Date().toISOString().split('T')[0],
      image_url: '',
      slug: `article-${Date.now()}`
    }]);
  };

  const deleteBlogPost = async (index) => {
    const post = blogPosts[index];
    if (!window.confirm('Supprimer cet article ?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;

      setBlogPosts(blogPosts.filter((_, i) => i !== index));
      toast({
        title: 'Supprimé',
        description: 'L\'article a été supprimé'
      });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de supprimer'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center mystical-gradient">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 min-h-screen mystical-gradient">
      <Helmet>
        <title>Modifier le Contenu - Admin Terra Nova</title>
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          onClick={() => navigate('/admin/dashboard')}
          variant="outline"
          className="mb-6 border-2 border-primary text-primary hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au tableau de bord
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="crystal-card rounded-3xl p-8"
        >
          <h1 className="text-4xl font-bold mb-8 font-['Dancing_Script'] text-center">
            Gestion du Contenu
          </h1>

          <div className="mb-6">
            <div className="flex gap-2 border-b">
              <button
                onClick={() => setActiveTab('eline')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'eline'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                Page Eline
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'services'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                Services/Soins
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'blog'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                Blog
              </button>
            </div>
          </div>

          {activeTab === 'eline' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Contenu de la page Eline</h2>

              {Object.entries(elineContent).map(([key, value]) => (
                <div key={key}>
                  <Label className="text-lg mb-2 capitalize">
                    {key.replace(/_/g, ' ')}
                  </Label>
                  <Textarea
                    value={value}
                    onChange={(e) => handleElineContentChange(key, e.target.value)}
                    rows={4}
                    className="text-base"
                  />
                </div>
              ))}

              <Button
                onClick={saveElineContent}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-4">Services et Soins</h2>

              {servicesContent.map((service, index) => (
                <div key={service.id} className="p-6 border rounded-lg space-y-4">
                  <h3 className="text-xl font-semibold">{service.title}</h3>

                  <div>
                    <Label>Titre</Label>
                    <Input
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Description courte (affichée sur la liste)</Label>
                    <Textarea
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Description complète (affichée sur la page détail - séparée par | pour les paragraphes)</Label>
                    <Textarea
                      value={service.full_description}
                      onChange={(e) => handleServiceChange(index, 'full_description', e.target.value)}
                      rows={10}
                      placeholder="Paragraphe 1|Paragraphe 2|Paragraphe 3..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Prix</Label>
                      <Input
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Durée</Label>
                      <Input
                        value={service.duration}
                        onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold mb-3">Détails du service</h4>

                    <div className="space-y-3">
                      <div>
                        <Label>Bienfaits</Label>
                        <Textarea
                          value={service.detail_bienfaits || ''}
                          onChange={(e) => handleServiceChange(index, 'detail_bienfaits', e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label>Éléments utilisés</Label>
                        <Textarea
                          value={service.detail_elements || ''}
                          onChange={(e) => handleServiceChange(index, 'detail_elements', e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label>Déroulement</Label>
                        <Textarea
                          value={service.detail_deroulement || ''}
                          onChange={(e) => handleServiceChange(index, 'detail_deroulement', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={saveServicesContent}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder les services'}
              </Button>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Articles du Blog</h2>
                <Button onClick={addNewBlogPost} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Nouvel Article
                </Button>
              </div>

              {blogPosts.map((post, index) => (
                <div key={post.id} className="p-6 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Article {index + 1}</h3>
                    <Button
                      onClick={() => deleteBlogPost(index)}
                      variant="destructive"
                      size="sm"
                    >
                      Supprimer
                    </Button>
                  </div>

                  <div>
                    <Label>Titre</Label>
                    <Input
                      value={post.title}
                      onChange={(e) => handleBlogChange(index, 'title', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Slug (URL)</Label>
                    <Input
                      value={post.slug}
                      onChange={(e) => handleBlogChange(index, 'slug', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Extrait</Label>
                    <Textarea
                      value={post.excerpt}
                      onChange={(e) => handleBlogChange(index, 'excerpt', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Contenu complet</Label>
                    <Textarea
                      value={post.content}
                      onChange={(e) => handleBlogChange(index, 'content', e.target.value)}
                      rows={8}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Auteur</Label>
                      <Input
                        value={post.author}
                        onChange={(e) => handleBlogChange(index, 'author', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Date de publication</Label>
                      <Input
                        type="date"
                        value={post.published_date}
                        onChange={(e) => handleBlogChange(index, 'published_date', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>URL de l'image de présentation</Label>
                    <Input
                      value={post.image_url}
                      onChange={(e) => handleBlogChange(index, 'image_url', e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                    <p className="text-sm text-foreground/60 mt-1">
                      Utilisez une URL d'image (Unsplash, Pexels, ou votre propre image hébergée)
                    </p>
                    {post.image_url && (
                      <div className="mt-3">
                        <p className="text-sm font-semibold mb-2">Aperçu :</p>
                        <img
                          src={post.image_url}
                          alt="Aperçu"
                          className="w-full max-w-md h-48 object-cover rounded-lg shadow-md"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <p className="text-sm text-red-500 mt-2" style={{display: 'none'}}>
                          Impossible de charger l'image. Vérifiez l'URL.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <Button
                onClick={saveBlogPosts}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder les articles'}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminEditContentPage;
