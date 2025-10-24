import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ADMIN_EMAIL = 'terranova.gwada@gmailcom';
const ADMIN_PASSWORD = 'Terra971';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez entrer votre email et mot de passe."
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      if (trimmedEmail === ADMIN_EMAIL && trimmedPassword === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminAccess', 'true');
        sessionStorage.setItem('adminEmail', ADMIN_EMAIL);

        toast({
          title: "Accès accordé",
          description: "Bienvenue dans l'espace administrateur",
        });

        navigate('/admin/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Accès refusé",
          description: "Email ou mot de passe incorrect."
        });
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Accès Administrateur - Terra Nova</title>
        <meta name="description" content="Espace administrateur Terra Nova" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="crystal-card rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2 aura-text font-['Dancing_Script']">
              Accès Administrateur
            </h1>
            <p className="text-foreground/70">
              Espace sacré réservé
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-base flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email administrateur"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 text-lg"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-base flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4" />
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 text-lg pr-12"
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
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              {isLoading ? 'Vérification...' : 'Accéder à l\'espace sacré'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-foreground/50">
              Accès réservé aux gardiens de Terra Nova
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
