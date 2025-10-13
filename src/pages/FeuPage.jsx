import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, ArrowLeft, ChevronDown, Sun, Flame as Volcano, Drumstick as Drum, Brush, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mantras = [
  "Je suis flamme, je suis énergie.",
  "Mon feu intérieur me transforme.",
  "Je rayonne ma puissance.",
  "J’allume la lumière de mon cœur."
];

const rituals = [
  "Inspire profondément, souffle comme sur une braise.",
  "Allume une bougie et fixe sa flamme un instant.",
  "Frotte tes mains jusqu’à la chaleur et pose-les sur ton cœur.",
  "Bouge ton corps en suivant un rythme intérieur."
];

const parcoursData = [
  {
    id: 'energie',
    title: "Une journée d’énergie",
    icon: Sun,
    details: [
      "Yoga dynamique ou danse extatique",
      "Massage chauffant aux huiles épicées",
      "Repas végétal épicé (gingembre, curcuma, piment doux)"
    ]
  },
  {
    id: 'soin-rituel',
    title: "Un soin chauffant & rituel de feu",
    icon: Volcano,
    details: [
      "Massage aux pierres volcaniques",
      "Rituel de libération (brûler ses peurs)"
    ]
  },
  {
    id: 'danse-percussion',
    title: "Un atelier danse ou percussion",
    icon: Drum,
    details: [
      "Danse libre rythmée",
      "Atelier tambour ou percussions"
    ]
  },
  {
    id: 'immersion',
    title: "Une immersion “transformation & vitalité”",
    icon: Brush,
    details: [
      "Cercle autour d’un feu sacré",
      "Chant collectif ou offrande au feu",
      "Peinture en couleurs flamboyantes"
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
          <Icon className="w-8 h-8 text-red-400" />
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
                <Button className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white rounded-full">
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

const FeuPage = () => {
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
    <div className="pt-24 pb-12 min-h-screen mystical-gradient">
      <Helmet>
        <title>Porte du Feu - Vitalité & Transformation</title>
        <meta name="description" content="Explorez la vitalité et la transformation à travers des rituels et parcours connectés à l'élément Feu." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-flex items-center text-primary hover:text-red-300 transition-colors mb-8 group">
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
          <div className="inline-block p-4 rounded-full bg-red-900/50 border-2 border-red-500 mb-4">
            <Flame className="w-12 h-12 text-red-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="aura-text font-['Dancing_Script']">Porte du Feu</span>
          </h1>
          <p className="text-2xl text-red-200">Vitalité & Transformation</p>
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
              <h3 className="text-lg font-semibold text-red-300 mb-2">Mantra de Vitalité</h3>
              <p className="text-2xl italic text-white">"{mantra}"</p>
            </div>
            <div className="w-1/2 h-px bg-white/20 mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold text-red-300 mb-2">Rituel du Feu</h3>
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
            <span className="aura-text font-['Dancing_Script']">Choisissez votre Parcours Feu</span>
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

export default FeuPage;