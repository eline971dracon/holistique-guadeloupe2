import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
const ElineContactSection = () => {
  const {
    toast
  } = useToast();
  const handleUnsupportedFeature = featureName => {
    toast({
      title: `${featureName} - Non Implémenté`,
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀"
    });
  };
  return <section className="py-20 mystical-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="aura-text font-['Dancing_Script']">
              Commençons Votre Voyage
            </span>
          </h2>
          
          <p className="text-xl text-white max-w-2xl mx-auto">Prêt(e) à libérer votre énergie et à retrouver votre équilibre intérieur ? Contactez-moi </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="crystal-card rounded-2xl p-6">
              <Phone className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <div className="font-semibold mb-2 text-white">Téléphone</div>
              <a href="https://wa.me/590690938651" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">0590 690 93 8651</a>
            </div>
            
            <div className="crystal-card rounded-2xl p-6">
              <Mail className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <div className="font-semibold mb-2 text-white">Email</div>
              <a href="mailto:eline.dracon@therapie-gp.com" className="text-white hover:underline">eline.dracon@therapie-gp.com</a>
            </div>
            
            <div className="crystal-card rounded-2xl p-6">
              <MapPin className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <div className="font-semibold mb-2 text-white">Localisation</div>
              <div className="text-white">Pointe-à-Pitre, Guadeloupe</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/eline971-dracon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 energy-pulse bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
              <Calendar className="w-6 h-6 mr-3" />
              Réserver Maintenant
            </a>
            
            <a href="https://wa.me/590690938651" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-4 text-xl rounded-full border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50">
              <MessageSquare className="w-6 h-6 mr-3" />
              Contacter sur WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default ElineContactSection;