import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Clock, Euro, ChevronLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom'; // Changed from Link to useNavigate
import { useToast } from "@/components/ui/use-toast";
import MassageQuestionnaireModal from '@/components/MassageQuestionnaireModal';
const RituelDomeEauTerrePage = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate(); // Initialize useNavigate
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const handleBookAppointment = () => {
    toast({
      title: "📅 Réservation de Rendez-vous",
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀"
    });
  };
  const service = {
    mainTitle: "Le rituel du Dôme",
    subTitle: "Le trône de l’eau et de la terre",
    duration: "60 minutes",
    price: "88 €",
    // Price changed to 88 €
    shortDescription: "Enracinement et lâcher prise."
  };
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
                <p className="text-xl leading-relaxed">🌿 Entrez sous la voûte du Dôme Vibratoire et installez-vous sur le Trône de l’Eau et de la Terre.</p>
                <p>✨ Pour ceux qui désirent une première approche douce, sans se dévoiler entièrement, ce rituel offre la justesse d’un toucher ciblé. Les mains et les pieds deviennent ici des portes d’entrée privilégiées : ils contiennent en eux la cartographie du corps tout entier. Ainsi, en massant ces zones, c’est chaque organe, chaque tension, chaque émotion retenue qui peut être apaisée.</p>
                <p>☀️ Le voyage commence par une détente du haut du corps : de la tête à la nuque, des épaules aux bras, jusqu’aux mains. Les gestes se posent avec douceur pour libérer les tensions et inviter l’esprit au repos.</p>
                <p>💧 Pendant ce temps, vos pieds reposent dans un bain chaud infusé de plantes thérapeutiques locales, choisies en résonance avec vos besoins. La chaleur réconforte, purifie et relie à l’énergie nourricière de la Terre..🌸Puis vient le massage des pieds : au même instant, une serviette chaude se dépose délicatement sur vos yeux, vous enveloppant d’une obscurité apaisante, propice à la détente la plus profonde.</p>
                <p className="font-semibold italic">✨ Laissez-vous porter… et laissez le bien-être se diffuser subtilement, de vos extrémités jusqu’à l’ensemble de votre être.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <MassageQuestionnaireModal open={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen} />
    </>;
};
export default RituelDomeEauTerrePage;