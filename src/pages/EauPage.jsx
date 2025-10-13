import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Waves, ArrowLeft, ChevronDown, Droplets, Wind, Brush, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mantras = [
  "Je suis fluide, je m’adapte comme l’eau.",
  "Je laisse mes émotions circuler librement.",
  "Je suis traversé(e) par le courant de la Vie.",
  "Je suis eau, je suis mouvement."
];

const rituals = [
  "Ferme les yeux, imagine une vague douce qui traverse ton corps.",
  "Bois un verre d’eau lentement, en conscience.",
  "Passe tes mains sous l’eau fraîche quelques instants.",
  "Respire et écoute le flux de ton souffle comme une rivière."
];

const parcoursData = [
  {
    id: 'fluidite',
    title: "Une journée de fluidité",
    icon: Droplets,
    details: [
      "Bain rituel aux plantes dans une rivière",
      "Massage fluide à l’huile ou aux coquillages",
      "Infusion relaxante de fleurs locales"
    ]
  },
  {
    id: 'bain-massage',
    title: "Un bain aux plantes & un massage fluide",
    icon: Wind,
    details: [
      "Bain aux fleurs (hibiscus, citronnelle)",
      "Massage ondulatoire, mouvements aquatiques"
    ]
  },
  {
    id: 'mouvement-creativite',
    title: "Un atelier mouvement & créativité",
    icon: Brush,
    details: [
      "Danse libre / mouvement ondulatoire",
      "Atelier peinture intuitive ou écriture émotionnelle"
    ]
  },
  {
    id: 'immersion',
    title: "Une immersion “au cœur de l’Eau”",
    icon: Heart,
    details: [
      "Méditation sonore avec bols cristal",
      "Cercle de partage émotionnel",
      "Rituel d’eau : laisser partir symboliquement une émotion"
    ]
  }
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const ParcoursAccordion = ({ parcours, isOpen, onToggle }) => {
  const Icon = parcours.icon;
  return (
    <motion.div layout className="crystal-card rounded-2xl overflow-hidden border border-white/20">
      <button onClick={onToggle} className="w-full p-6 text-left flex justify-between items-center hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-4">
          <Icon className="w-8 h-8 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">{parcours.title}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-6 h-6 text-white/70" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <ul className="space-y-3 list-disc list-inside text-white/80 pl-4">
                {parcours.details.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="mt-6">
                <Button className="bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white rounded-full">
                  Choisir ce parcours <Heart className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EauPage = () => {
  const [mantra, setMantra] = useState('');
  const [ritual, setRitual] = useState('');
  const [openParcours, setOpenParcours] = useState(null);

  useEffect(() => {
    setMantra(getRandomItem(mantras));
    setRitual(getRandomItem(rituals));
  }, []);

  const handleToggle = (id) => {
    setOpenParcours(openParcours === id ? null : id);
  };

  return (
    <div className={`pt-24 pb-12 min-h-screen bg-cover bg-center bg-fixed`} style={{ backgroundImage: `url('https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/1f139dbb394411b83813ba7c781856d1.jpg')` }}>
      <Helmet>
        <title>Porte de l'Eau - Fluidité & Douceur</title>
        <meta name="description" content="Explorez la fluidité et la douceur à travers des rituels et parcours connectés à l'élément Eau." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-flex items-center text-primary hover:text-cyan-300 transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Retour aux Portes
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 rounded-full bg-cyan-900/50 border-2 border-cyan-500 mb-4">
            <Waves className="w-12 h-12 text-cyan-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="aura-text font-['Dancing_Script']">Porte de l'Eau</span>
          </h1>
          <p className="text-2xl text-cyan-200">Fluidité & Douceur</p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-16 p-8 crystal-card rounded-3xl text-center"
        >
          <h2 className="text-3xl font-bold mb-6 font-['Dancing_Script'] aura-text">Motivation du Jour</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">Mantra de Fluidité</h3>
              <p className="text-2xl italic text-white">"{mantra}"</p>
            </div>
            <div className="w-1/2 h-px bg-white/20 mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">Mini-Rituel de l'Eau</h3>
              <p className="text-xl text-white/90">{ritual}</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">
            <span className="aura-text font-['Dancing_Script']">Choisissez votre Parcours Eau</span>
          </h2>
          <div className="space-y-6">
            {parcoursData.map(p => (
              <ParcoursAccordion
                key={p.id}
                parcours={p}
                isOpen={openParcours === p.id}
                onToggle={() => handleToggle(p.id)}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default EauPage;