import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'therapist'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs."
      });
      return;
    }

    setIsLoading(true);

    try {
      const tableName = formData.userType === 'therapist' ? 'therapists' : 'creators';

      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('email', formData.email)
        .eq('password', formData.password)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect."
        });
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem('userType', formData.userType);
      sessionStorage.setItem('userId', data.id);
      sessionStorage.setItem('userName', data.name);
      localStorage.setItem('loggedInUserId', data.id);
      localStorage.setItem('userType', formData.userType);

      toast({
        title: "Connexion réussie !",
        description: `Bienvenue ${data.name}`,
      });

      const profilePath = formData.userType === 'therapist'
        ? `/therapeute/${data.id}`
        : `/createur/${data.id}`;

      navigate(profilePath);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Connexion - Terra Nova</title>
        <meta name="description" content="Connectez-vous à votre espace personnel" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="crystal-card rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2 aura-text font-['Dancing_Script']">
              Connexion
            </h1>
            <p className="text-foreground/70">
              Accédez à votre espace personnel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-base mb-3 block">Type de compte</Label>
              <RadioGroup
                value={formData.userType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, userType: value }))}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer">
                  <RadioGroupItem value="therapist" id="therapist" />
                  <Label htmlFor="therapist" className="cursor-pointer flex-1">
                    Thérapeute Holistique
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer">
                  <RadioGroupItem value="creator" id="creator" />
                  <Label htmlFor="creator" className="cursor-pointer flex-1">
                    Artiste Créateur
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="email" className="text-base flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 h-12 text-lg"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-base flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Mot de passe
              </Label>
              <div className="relative mt-2">
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
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-foreground/60">
            <p>
              Pas encore inscrit ?{' '}
              <Link to="/rejoindre-aventure" className="text-primary hover:underline font-semibold">
                Rejoindre l'aventure
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
