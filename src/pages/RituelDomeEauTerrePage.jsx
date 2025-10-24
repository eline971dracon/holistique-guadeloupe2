import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Clock, Euro, ChevronLeft, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import MassageQuestionnaireModal from '@/components/MassageQuestionnaireModal';
import { supabase } from '@/lib/customSupabaseClient';

const RituelDomeEauTerrePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data, error } = await supabase
          .from('services_content')
          .select('*')
          .eq('service_key', 'rituel_dome_eau_terre')
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const longDescription = data.full_description ? data.full_description.split('|') : [];

          setService({
            mainTitle: data.title.split(' ')[0] + ' ' + data.title.split(' ')[1] + ' ' + data.title.split(' ')[2],
            subTitle: data.title.includes('trône') ? data.title.substring(data.title.indexOf('trône')) : data.title,
            duration: data.duration,
            price: data.price,
            shortDescription: data.description,
            longDescription: longDescription
          });
        }
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, []);

  const handleBookAppointment = () => {
    toast({
      title: "📅 Réservation de Rendez-vous",
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀"
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20 text-center bg-gray-900 text-white">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20 text-center bg-gray-900 text-white">
        <div className="p-8 bg-gray-800 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-emerald-400 mb-4">Service non trouvé</h1>
          <Button onClick={() => navigate(-1)} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-full">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  return <>
    <div className="pt-24 pb-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <Helmet>
        <title>{service.mainTitle} - {service.subTitle} - Soin par Éline Dracon</title>
        <meta name="description" content="Découvrez le Rituel du Dôme, un soin unique alliant la sagesse de l'eau et de la terre pour un enracinement et un lâcher-prise profonds." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="mb-8">
          <Button onClick={() => navigate(-1)} variant="ghost" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300 group">
            <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Retour aux soins d'Éline
          </Button>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} className="crystal-card-dark rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.7,
              delay: 0.4
            }}>
              <img className="rounded-2xl w-full h-full object-cover shadow-lg" alt="A serene spa setting with a wooden dome structure, water elements, and earthy tones" src="https://images.unsplash.com/photo-1597671594310-80ccb4d03f88" />
            </motion.div>

            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="aura-text font-['Dancing_Script']">{service.mainTitle}</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-emerald-300 font-['Dancing_Script'] mt-0 mb-4">{service.subTitle}</h2>

              <p className="text-xl text-gray-300 mb-6 italic">{service.shortDescription}</p>

              <div className="flex items-center space-x-6 text-lg mb-8">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-emerald-500" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center">
                  <Euro className="w-5 h-5 mr-2 text-emerald-500" />
                  <span>{service.price}</span>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4">
                <Button onClick={() => setIsQuestionnaireOpen(true)} variant="outline" size="sm" className="bg-secondary/50 border-primary/30 hover:bg-secondary/80 rounded-full text-base text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Questionnaire Préparation Massage
                </Button>
                <Button onClick={handleBookAppointment} size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 w-full md:w-auto">
                  Réserver ce Rituel
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-700 pt-8">
            <div className="prose prose-lg prose-invert max-w-none text-gray-300 space-y-6 text-left">
              {service.longDescription.map((p, i) => (
                <p key={i} className="text-xl leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <MassageQuestionnaireModal open={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen} />
  </>;
};
export default RituelDomeEauTerrePage;
