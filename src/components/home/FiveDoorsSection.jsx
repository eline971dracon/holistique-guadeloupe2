import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mountain, Waves, Flame, Feather, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const doorsData = [{
  id: 'terre',
  icon: Mountain,
  title: 'Porte de la Terre',
  subtitle: 'L’ancrage et la guérison',
  intro: 'La Terre est stabilité, force tranquille, matrice nourricière. Elle nous ramène au corps et à la sécurité intérieure.',
  discovery: 'En franchissant cette porte, tu pourrais rencontrer…',
  details: ['des praticiens de massages profonds et enveloppants,', 'des soins aux argiles et cataplasmes,', 'des ateliers de poterie, de sculpture ou de jardinage en conscience,', 'des lieux en pleine nature pour te ressourcer.'],
  conclusion: 'Ici, tu apprends à t’enraciner et à sentir que ton corps est ta première maison.',
  imageSrc: "/IMG_2042.JPG",
  imageText: "Paysage de terre craquelée avec montagnes au coucher du soleil",
  color: 'from-emerald-500/80 to-green-600/80',
  borderColor: 'border-emerald-400',
  link: '/porte/terre'
}, {
  id: 'eau',
  icon: Waves,
  title: 'Porte de l’Eau',
  subtitle: 'La fluidité et la mémoire',
  intro: 'L’Eau guérit par le mouvement et la douceur. Elle lave les émotions, elle régénère.',
  discovery: 'En franchissant cette porte, tu pourrais découvrir…',
  details: ['des soins sonores ou vibratoires (bols, tambours d’eau),', 'des massages fluides et enveloppants,', 'des rituels de bains aux plantes,', 'des ateliers de danse intuitive ou d’expression des émotions par l’art.'],
  conclusion: 'Ici, tu plonges dans le flux, tu libères les mémoires et tu retrouves ta fluidité intérieure.',
  imageSrc: "/IMG_2056.JPG",
  imageText: "Gouttes d'eau en suspension avec reflets turquoise et verts",
  color: 'from-cyan-500/80 to-sky-600/80',
  borderColor: 'border-cyan-400',
  link: '/porte/eau'
}, {
  id: 'feu',
  icon: Flame,
  title: 'Porte du Feu',
  subtitle: 'La transformation et la volonté',
  intro: 'Le Feu éclaire, transmute, ravive la passion. Il invite à se révéler.',
  discovery: 'En franchissant cette porte, tu pourrais vivre…',
  details: ['des cérémonies au tambour ou au feu sacré,', 'des massages énergétiques dynamisants,', 'des pratiques corporelles puissantes comme le breathwork,', 'des ateliers de créativité (peinture, chant, percussion).'],
  conclusion: 'Ici, tu rallumes ton étincelle et tu transformes tes ombres en force vitale.',
  imageSrc: "/IMG_2050 copy.JPG",
  imageText: "Flammes orange et jaunes s'élevant dans la nuit avec étincelles",
  color: 'from-red-500/80 to-orange-600/80',
  borderColor: 'border-red-400',
  link: '/porte/feu'
}, {
  id: 'air',
  icon: Feather,
  title: 'Porte de l’Air',
  subtitle: 'L’élan et l’inspiration',
  intro: 'L’Air ouvre l’esprit, apporte des visions claires et du mouvement.',
  discovery: 'En franchissant cette porte, tu pourrais expérimenter…',
  details: ['des séances de respiration consciente,', 'des pratiques de méditation et de yoga,', 'des cercles de parole et de partage,', 'des ateliers d’écriture, de poésie ou de chant inspiré.'],
  conclusion: 'Ici, tu respires, tu t’allèges et tu laisses entrer les nouvelles perspectives.',
  imageSrc: "https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/a2b26adbc3c05b325cc17599b65d5e86.jpg",
  imageText: "Champ d'herbes de pampas balayées par le vent au coucher du soleil",
  color: 'from-slate-400/80 to-gray-500/80',
  borderColor: 'border-slate-300',
  link: '/porte/air'
}, {
  id: 'ether',
  icon: Sparkles,
  title: 'Porte de l’Éther',
  subtitle: 'L’unité et le mystère',
  intro: 'L’Éther relie tout. Il nous rappelle notre appartenance au grand Tout et ouvre l’espace sacré.',
  discovery: 'En franchissant cette porte, tu pourrais accéder à…',
  details: ['des soins énergétiques subtils et vibratoires,', 'des voyages chamaniques ou méditatifs,', 'des rencontres avec des oracles, runes ou archétypes,', 'des espaces de contemplation, de silence et de reliance spirituelle.'],
  conclusion: 'Ici, tu goûtes au mystère, à l’invisible, et tu te connectes à ton essence profonde.',
  imageSrc: "/IMG_2052.JPG",
  imageText: "Silhouette en méditation devant des voiles lumineux dorés et éthérés",
  color: 'from-purple-500/80 to-indigo-600/80',
  borderColor: 'border-purple-400',
  link: '/porte/ether'
}];

const DoorCard = ({
  door,
  isOpen,
  onToggle
}) => {
  const Icon = door.icon;

  const ActionButton = () => {
    if (door.link) {
      return (
        <Link to={door.link} className="w-full">
          <Button variant="outline" className="w-full border-foreground/30 hover:bg-foreground/10 group">
            Explorer la {door.title}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      );
    }
    return (
      <Button onClick={onToggle} variant="outline" className="w-full border-foreground/30 hover:bg-foreground/10">
        {isOpen ? 'Refermer' : `Explorer la ${door.title}`}
        <motion.div animate={{
        rotate: isOpen ? 180 : 0
      }} transition={{
        duration: 0.3
      }} className="ml-2">
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </Button>
    );
  };

  return <motion.div layout className={`crystal-card rounded-2xl overflow-hidden border-2 ${isOpen && !door.link ? door.borderColor : 'border-transparent'} transition-colors duration-500`}>
      <div className="relative h-48">
        <img className="absolute inset-0 w-full h-full object-cover" alt={door.imageText} src={door.imageSrc} />
        <div className={`absolute inset-0 bg-gradient-to-t ${door.color} to-transparent`}></div>
        <div className="absolute top-4 left-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white shadow-black [text-shadow:_0_2px_4px_var(--tw-shadow-color)]">{door.title}</h3>
            <p className="text-md text-white/90 shadow-black [text-shadow:_0_1px_2px_var(--tw-shadow-color)]">{door.subtitle}</p>
          </div>
        </div>
      </div>
      
      <motion.div layout className="p-6">
        <p className="text-foreground/80 mb-4">{door.intro}</p>
        
        <AnimatePresence>
          {isOpen && !door.link && <motion.div key="content" initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} transition={{
          duration: 0.4,
          ease: 'easeInOut'
        }} className="overflow-hidden">
              <div className="pb-4">
                <p className="italic text-foreground/70 mb-3">{door.discovery}</p>
                <ul className="space-y-2 list-disc list-inside text-foreground/80">
                  {door.details.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
                <p className="mt-4 font-semibold text-foreground">{door.conclusion}</p>
              </div>
            </motion.div>}
        </AnimatePresence>

        <ActionButton />
      </motion.div>
    </motion.div>;
};

const FiveDoorsSection = () => {
  const [openDoor, setOpenDoor] = useState(null);
  const handleToggle = id => {
    setOpenDoor(openDoor === id ? null : id);
  };
  return <section className="py-20 mystical-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="aura-text font-['Dancing_Script']">
              Les 5 Portes de l’Être
            </span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">“Choisis la Porte qui t’appelle aujourd’hui… Elle t’ouvrira l’expérience par l’Elément qui résonne avec toi .”</p>
        </motion.div>

        <div className="space-y-8">
          {doorsData.map(door => <DoorCard key={door.id} door={door} isOpen={openDoor === door.id} onToggle={() => handleToggle(door.id)} />)}
        </div>
      </div>
    </section>;
};
export default FiveDoorsSection;