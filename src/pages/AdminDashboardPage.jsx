import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Users, Palette, LogOut, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [therapists, setTherapists] = useState([]);
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminAccess = sessionStorage.getItem('adminAccess');
    if (!adminAccess || adminAccess !== 'true') {
      navigate('/admin-login');
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [therapistsResponse, creatorsResponse] = await Promise.all([
        supabase.from('therapists').select('*').order('created_at', { ascending: false }),
        supabase.from('creators').select('*').order('created_at', { ascending: false })
      ]);

      if (therapistsResponse.error) throw therapistsResponse.error;
      if (creatorsResponse.error) throw creatorsResponse.error;

      setTherapists(therapistsResponse.data || []);
      setCreators(creatorsResponse.data || []);
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

  const handleApproval = async (table, id, currentStatus) => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ is_approved: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Statut mis à jour",
        description: `Le profil a été ${!currentStatus ? 'approuvé' : 'désapprouvé'}.`
      });

      loadData();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le statut."
      });
    }
  };

  const handleDelete = async (table, id, name) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${name} ?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Profil supprimé",
        description: `${name} a été supprimé avec succès.`
      });

      loadData();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le profil."
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAccess');
    sessionStorage.removeItem('adminPassword');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <RefreshCw className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen px-4 pb-12">
      <Helmet>
        <title>Tableau de Bord Admin - Terra Nova</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold aura-text font-['Dancing_Script']">
                Espace Administrateur
              </h1>
              <p className="text-foreground/70">Gestion de Terra Nova</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="crystal-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-emerald-500" />
              <h3 className="text-2xl font-bold">Thérapeutes</h3>
            </div>
            <p className="text-4xl font-bold text-emerald-500">{therapists.length}</p>
          </div>
          <div className="crystal-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Palette className="w-6 h-6 text-purple-500" />
              <h3 className="text-2xl font-bold">Artistes Créateurs</h3>
            </div>
            <p className="text-4xl font-bold text-purple-500">{creators.length}</p>
          </div>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-7 h-7 text-emerald-500" />
              Thérapeutes Holistiques
            </h2>
            <div className="space-y-4">
              {therapists.map((therapist) => (
                <div key={therapist.id} className="crystal-card p-6 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{therapist.name}</h3>
                      <p className="text-foreground/70 mb-2">{therapist.email}</p>
                      <p className="text-sm text-foreground/60">{therapist.commune}</p>
                      <div className="mt-3 flex items-center gap-2">
                        {therapist.is_approved ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Approuvé
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 text-sm">
                            <XCircle className="w-4 h-4" />
                            En attente
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApproval('therapists', therapist.id, therapist.is_approved)}
                        variant={therapist.is_approved ? "outline" : "default"}
                        size="sm"
                      >
                        {therapist.is_approved ? 'Désapprouver' : 'Approuver'}
                      </Button>
                      <Button
                        onClick={() => handleDelete('therapists', therapist.id, therapist.name)}
                        variant="destructive"
                        size="sm"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {therapists.length === 0 && (
                <p className="text-center text-foreground/60 py-8">Aucun thérapeute inscrit</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Palette className="w-7 h-7 text-purple-500" />
              Artistes Créateurs
            </h2>
            <div className="space-y-4">
              {creators.map((creator) => (
                <div key={creator.id} className="crystal-card p-6 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{creator.name}</h3>
                      <p className="text-foreground/70 mb-2">{creator.email}</p>
                      <p className="text-sm text-foreground/60 mb-1">{creator.commune}</p>
                      <p className="text-sm text-foreground/60">Type: {creator.art_type}</p>
                      <div className="mt-3 flex items-center gap-2">
                        {creator.is_approved ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Approuvé
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 text-sm">
                            <XCircle className="w-4 h-4" />
                            En attente
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApproval('creators', creator.id, creator.is_approved)}
                        variant={creator.is_approved ? "outline" : "default"}
                        size="sm"
                      >
                        {creator.is_approved ? 'Désapprouver' : 'Approuver'}
                      </Button>
                      <Button
                        onClick={() => handleDelete('creators', creator.id, creator.name)}
                        variant="destructive"
                        size="sm"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {creators.length === 0 && (
                <p className="text-center text-foreground/60 py-8">Aucun artiste inscrit</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
