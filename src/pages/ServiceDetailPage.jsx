import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Clock, Euro, ChevronLeft, FileText, Star, Heart, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import MassageQuestionnaireModal from '@/components/MassageQuestionnaireModal';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  const elineData = {
    services: [
      {
        id: "rituel-reharmonisation",
        title: "Rituel Réharmonisation",
        subTitle: "Routine énergétique ( massage & réalignement )",
        longDescription: [
          "✨Pour ceux qui recherchent plus qu’une simple détente musculaire, ce rituel ouvre la voie à une circulation subtile des énergies.",
          "⛓️Le corps n’est pas une simple mécanique de muscles et d’articulations. À chaque instant, il est traversé par des impulsions électriques qui assurent la communication des nerfs, par des ondes vibratoires émises par le cœur, le cerveau et chaque cellule, et par des flux subtils qui tissent le lien entre le physique, l’émotionnel et le spirituel.",
          "💎Le cœur génère un champ électromagnétique mesurable autour de nous, véritable centre de résonance avec le monde extérieur. Le cerveau fonctionne grâce à des ondes électriques qui influencent nos états de conscience. Chaque cellule, par ses échanges ioniques, émet une vibration qui participe à l’équilibre global de l’organisme.",
          "🌀À ces réalités physiologiques s’ajoutent les chakras, véritables centres énergétiques du corps. Ils sont en lien direct avec les glandes endocrines : racine avec les surrénales, cœur avec le thymus, gorge avec la thyroïde, etc. Quand les chakras se désalignent ou se bloquent, cela se répercute sur les glandes, perturbant la régulation hormonale et l’harmonie intérieure.",
          "🌺 Un massage énergétique agit donc à plusieurs niveaux : il détend la musculature, libère les tensions nerveuses, mais surtout il réharmonise la circulation énergétique des chakras et relance le dialogue subtil entre les glandes. Le système physique, émotionnel et spirituel retrouve alors son unité, comme si l’on réaccordait un instrument de musique pour qu’il vibre juste.",
          "✨Recevoir ce soin, c’est relancer le courant dans tout le réseau du corps, rétablir l’équilibre entre matière et énergie … Et laisser la lumière intérieure circuler à nouveau.",
          "☀️Massage simple = on ouvre les fenêtres pour aérer une pièce.",
          "☀️☀️☀️Massage énergétique = en plus d’aérer, on change la vibration de l’espace, on remet de la lumière et on ajuste la température.",
          "✨ Laissez-vous porter… ce massage est votre hygiène énergétique, une routine d’harmonie qui aligne le corps et l’être."
        ],
        details: { "Détails": "Un soin qui agit sur plusieurs plans pour une harmonisation complète.", "Bienfaits": " relaxation, clarté mentale, vitalité accrue.", "Elements": "huiles sésame, bois d'inde, HE"},
        duration: "75 minutes",
        price: "88€", // Price changed to 88€
        image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/f35f1a5e3103402376c29b1fd160da11.jpg"
      },
      {
        id: "rituel-terre-vagues",
        title: "Rituel entre Terre, Vagues et Feu",
        subTitle: "Rituel sensoriel, d'ancrage et de transmutation.",
        longDescription: [
          "🔥 Ce rituel puissant est conçu pour ceux qui cherchent à se libérer de ce qui ne leur sert plus et à embrasser une nouvelle phase de leur vie.",
          "🌿 Combinant des pratiques d'ancrage profondes (Terre) avec l'énergie purificatrice et transformatrice du Feu, il vous aide à transmuter les obstacles et à initier un renouveau.",
          "✨ Des exercices de respiration, des visualisations guidées et des rituels symboliques (utilisation de bougies, d'herbes purificatrice) sont employés pour faciliter le processus de transformation.",
          "☀️ Idéal pour clore des chapitres, guérir des blessures passées et s'ouvrir à de nouvelles possibilités avec force et courage."
        ],
        details: {"Détails": "Un processus de transformation puissant pour marquer un nouveau départ.", "Bienfaits": "Libération, ancrage renforcé, renouveau personnel.", "Déroulé": "Rituels de feu, méditation d'ancrage, visualisations guidées."},
        duration: "120 minutes",
        price: "222€",
        image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/2993cb4c5f20ce8301c62fb77379f925.jpg"
      },
      {
        id: "rituel-terre-feu",
        title: "Rituel Renaissance Roots",
        subTitle: "Rituel d'ancrage et transmutation",
        longDescription: [
          "🌊 Plongez dans une expérience immersive qui vous connecte aux éléments fondamentaux : la stabilité de la Terre et la fluidité des Vagues.",
          "🌿 Ce rituel se déroule en pleine nature, souvent près de la mer ou d'une rivière, pour amplifier les bienfaits des éléments.",
          "✨ Il intègre des mouvements inspirés du Watsu, des pressions douces et des étirements pour libérer les tensions musculaires et émotionnelles.",
          "🌸 Une connexion profonde avec la nature est facilitée, apportant un sentiment de paix et de renouveau."
        ],
        details: {"Détails": "Une immersion en nature pour se reconnecter à l'essentiel.", "Bienfaits": "Connexion à la nature, libération des tensions, équilibre émotionnel.", "Déroulé": "Mouvements aquatiques, étirements doux, méditation en nature."},
        duration: "120 minutes",
        price: "333€",
        image: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/5c7422417726a9f109f86da69634f0a4.jpg"
      }
    ]
  };
  
  const service = elineData.services.find(s => s.id === serviceId);

  const handleBookAppointment = () => {
    toast({
      title: "📅 Réservation de Rendez-vous",
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀"
    });
  };

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20 text-center bg-gray-900 text-white">
        <div className="p-8 bg-gray-800 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-emerald-400 mb-4">Service non trouvé</h1>
          <p className="text-lg text-gray-300 mb-6">Désolé, le service que vous cherchez n'existe pas ou a été déplacé.</p>
          <Button onClick={() => navigate(-1)} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-full">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-24 pb-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <Helmet>
          <title>{service.title} - {service.subTitle} - Soin par Éline Dracon</title>
          <meta name="description" content={`Découvrez le ${service.title}, un soin unique pour ${service.subTitle}.`} />
        </Helmet>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="mb-8"
          >
            <Button onClick={() => navigate(-1)} variant="ghost" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300 group">
              <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              Retour
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }} 
            className="crystal-card-dark rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <img  
                  className="rounded-2xl w-full h-full object-cover shadow-lg" 
                  alt={`Illustration pour ${service.title}`}
                  src={service.image} 
                />
              </motion.div>

              <div className="flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="aura-text font-['Dancing_Script']">{service.title}</span>
                </h1>
                <h2 className="text-2xl md:text-3xl text-emerald-300 font-['Dancing_Script'] mt-0 mb-4">{service.subTitle}</h2>
                
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
                  <Button onClick={() => setIsQuestionnaireOpen(true)} variant="outline" size="sm" className="bg-white/10 border-white/20 hover:bg-white/20 rounded-full text-base text-white">
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
                {service.longDescription.map((p, i) => <p key={i} className="text-xl leading-relaxed">{p}</p>)}
              </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-8">
              <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                  <div className="space-y-2">
                      <h3 className="text-xl font-bold text-emerald-400 flex items-center justify-center md:justify-start gap-2"><Star /> Détails</h3>
                      <p className="text-gray-400">{service.details["Détails"]}</p>
                  </div>
                  <div className="space-y-2">
                      <h3 className="text-xl font-bold text-emerald-400 flex items-center justify-center md:justify-start gap-2"><Heart /> Bienfaits</h3>
                      <p className="text-gray-400">{service.details["Bienfaits"]}</p>
                  </div>
                  <div className="space-y-2">
                      <h3 className="text-xl font-bold text-emerald-400 flex items-center justify-center md:justify-start gap-2"><Sun /> Elements</h3>
                      <p className="text-gray-400">{service.details["Elements"]}</p>
                  </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <MassageQuestionnaireModal open={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen} />
    </>
  );
};
export default ServiceDetailPage;