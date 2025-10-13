import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ChevronDown, Bell, Wand, Circle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mantras = [
  "Je suis Un avec le Tout.",
  "J’écoute la voix subtile de mon âme.",
  "Je suis espace, je suis lumière.",
  "Je suis relié(e) à l’invisible."
];

const rituals = [
  "Ferme les yeux et ressens l’espace autour de toi.",
  "Mets la main sur ton cœur et écoute 3 battements.",
  "Inspire et imagine une pluie de lumière qui descend.",
  "Reste 30 secondes en silence total."
];

const parcoursData = [
  {
    id: 'reliance',
    title: "Une journée de reliance",
    icon: Bell,
    details: [
      "Cercle de méditation ou de silence",
      "Voyage sonore (bols tibétains, carillons, tambour cosmique)",
      "Repas sobre et élevé (plantes médicinales, cacao cérémoniel)"
    ]
  },
  {
    id: 'voyage-soin',
    title: "Un voyage sonore & soin énergétique",
    icon: Wand,
    details: [
      "Soin énergétique subtil, toucher magnétisé",
      "Méditation guidée profonde"
    ]
  },
  {
    id: 'oracle-creation',
    title: "Un atelier oracle ou création intuitive",
    icon: Circle,
    details: [
      "Tirage d’oracle",
      "Création de mandalas ou écriture inspirée"
    ]
  },
  {
    id: 'immersion',
    title: "Une immersion “au-delà du visible”",
    icon: Sparkles,
    details: [
      "Rituel collectif (chant sacré, offrande)",
      "Cercle de reliance à l’invisible",
      "Invocation vibratoire"
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
          <Icon className="w-8 h-8 text-purple-400" />
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
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-full">
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

const EtherPage = () => {
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
    <div className={`pt-24 pb-12 min-h-screen bg-cover bg-center bg-fixed`} style={{ backgroundImage: `url('https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/b4f83bec67a9a7ec14c9c95a563fa716.jpg')` }}>
      <Helmet>
        <title>Porte de l'Éther - Reliance & Subtil</title>
        <meta name="description" content="Explorez la reliance et le subtil à travers des rituels et parcours connectés à l'élément Éther." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-flex items-center text-primary hover:text-purple-300 transition-colors mb-8 group">
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
          <div className="inline-block p-4 rounded-full bg-purple-900/50 border-2 border-purple-500 mb-4">
            <Sparkles className="w-12 h-12 text-purple-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="aura-text font-['Dancing_Script']">Porte de l'Éther</span>
          </h1>
          <p className="text-2xl text-purple-200">Reliance & Subtil</p>
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
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Mantra de Reliance</h3>
              <p className="text-2xl italic text-white">"{mantra}"</p>
            </div>
            <div className="w-1/2 h-px bg-white/20 mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Rituel de l'Éther</h3>
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
            <span className="aura-text font-['Dancing_Script']">Choisissez votre Parcours Éther</span>
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

export default EtherPage;