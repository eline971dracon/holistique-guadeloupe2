import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { KeyRound, Send, Leaf, Mail, MessageSquare, CheckCircle, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
const ContactPage = () => {
  const {
    toast
  } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discipline: '',
    message: '',
    sincere: false
  });
  const handleChange = e => {
    const {
      id,
      value,
      checked,
      type
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };
  const handleCheckboxChange = checked => {
    setFormData(prev => ({
      ...prev,
      sincere: checked
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          discipline: formData.discipline,
          message: formData.message,
          type: 'contact'
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      toast({
        title: 'Demande envoyée !',
        description: 'Merci pour ton appel 💫. Nous avons bien reçu ta demande.',
        variant: 'default'
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.',
        variant: 'destructive'
      });
    }
  };
  if (submitted) {
    return <div className="pt-16 min-h-screen flex items-center justify-center mystical-gradient">
        <Helmet>
          <title>Demande Envoyée - Terra Nova</title>
        </Helmet>
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.7,
        type: 'spring'
      }} className="crystal-card rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">
          <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-400 floating-animation" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 aura-text font-['Dancing_Script']">
            Merci pour ton appel 💫
          </h1>
          <p className="text-foreground/80 leading-relaxed text-lg">
            Nous avons bien reçu ta demande. Les Gardiens de Terra Nova la recevront et, si ta vibration résonne avec le cercle, la clé te sera transmise prochainement.
          </p>
        </motion.div>
      </div>;
  }
  return <div className="pt-24 pb-12 min-h-screen flex items-center justify-center mystical-gradient">
      <Helmet>
        <title>Demander la Clé de Terra Nova</title>
        <meta name="description" content="Formulaire de demande pour obtenir la clé d'accès à l'espace praticien de Terra Nova." />
      </Helmet>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="crystal-card rounded-3xl p-8 md:p-12 text-center max-w-2xl w-full mx-4">
        <KeyRound className="w-16 h-16 mx-auto mb-6 text-primary floating-animation" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 aura-text font-['Dancing_Script']">
          ✨ Demander la Clé de Terra Nova
        </h1>
        <p className="text-foreground/80 mb-8 leading-relaxed">Complète ce formulaire : nous prendrons contact avec toi pour t’ouvrir la Porte au moment qui sera le tien.</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="relative">
            <Label htmlFor="name" className="absolute -top-2.5 left-2 inline-block bg-background/80 px-1 text-sm font-medium text-foreground/80">Nom & Prénom 🌿</Label>
            <Input id="name" type="text" value={formData.name} onChange={handleChange} required className="pt-2" />
          </div>
          <div className="relative">
            <Label htmlFor="email" className="absolute -top-2.5 left-2 inline-block bg-background/80 px-1 text-sm font-medium text-foreground/80">Email ✉️</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} required className="pt-2" />
          </div>
          <div className="relative">
             <Label htmlFor="discipline" className="absolute -top-2.5 left-2 inline-block bg-background/80 px-1 text-sm font-medium text-foreground/80">Discipline / Pratique</Label>
            <Input id="discipline" type="text" value={formData.discipline} onChange={handleChange} placeholder="Exemple : massage, art, musique, herboristerie…" className="pt-2" />
          </div>
          <div className="relative">
            <Label htmlFor="message" className="absolute -top-2.5 left-2 inline-block bg-background/80 px-1 text-sm font-medium text-foreground/80">Message 💫</Label>
            <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Dis-nous en quelques mots pourquoi tu ressens l’appel de Terra Nova." className="min-h-[120px] pt-2" />
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <Checkbox id="sincere" checked={formData.sincere} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="sincere" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Je confirme que ma démarche est sincère et en cohérence avec mon chemin.
            </Label>
          </div>
          
          <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white text-xl rounded-full shadow-lg energy-pulse mt-4">
            <Wand2 className="w-6 h-6 mr-3" />
            Envoyer ma demande aux Gardiens
          </Button>
        </form>
      </motion.div>
    </div>;
};
export default ContactPage;