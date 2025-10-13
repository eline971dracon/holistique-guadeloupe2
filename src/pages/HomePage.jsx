import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sun, Sparkles, Heart, Compass, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FiveDoorsSection from '@/components/home/FiveDoorsSection';
const HomePage = () => {
  return <div className="pt-20">
      {/* Hero Section */}
      <motion.section initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1
    }} className="py-20 md:py-32 flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/20 to-background/40 z-10"></div>
        <div className="absolute inset-0">
          <img class="object-cover w-full h-full opacity-60" alt="Lacs en forme de cœurs dans les montagnes" src="/unnamed (6) copy.jpg" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="inline-block p-4 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-12 h-12 text-primary chakra-glow" />
          </motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 aura-text font-['Dancing_Script']" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }}>
            Terra Nova, la Terre où l'Art devient Médecine{' '}
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto mb-10" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.7
        }}>Plateforme holistique et interactive pour composer votre journée vibratoire sur mesure en Guadeloupe.</motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.9
        }}>
            <Link to="/mon-voyage-interieur">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-xl rounded-full shadow-lg energy-pulse">
                Créez votre parcours <Heart className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/quiz">
              <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-secondary px-8 py-4 text-xl rounded-full">
                Laissez-vous guider <Compass className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <FiveDoorsSection />

      {/* Call to Action for Therapists */}
      <section className="py-24 bg-gradient-to-br from-element-lune/20 to-element-air/20">
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
        }} className="inline-block p-4 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <UserCheck className="w-12 h-12 text-primary chakra-glow" />
          </motion.div>
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-6 aura-text font-['Dancing_Script']" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} viewport={{
          once: true
        }}>
            Thérapeutes, Artistes, Gardiens de la Terre ?
          </motion.h2>
          <motion.p className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto mb-10" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} viewport={{
          once: true
        }}>
            Rejoignez notre annuaire vibratoire et partagez vos dons avec une communauté en quête d'authenticité et de transformation.
          </motion.p>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} viewport={{
          once: true
        }}>
            <Link to="/rejoindre-aventure">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-white px-10 py-4 text-xl rounded-full shadow-lg energy-pulse">
                Rejoindre l'aventure
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="aura-text font-['Dancing_Script']">Qui suis-je ?</span>
            </h2>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">J’ai créé cet espace pour rappeler que nous sommes bien plus qu’un corps physique. Derrière la matière, il y a un souffle, une lumière, une mission unique : celle de notre âme. Dans le tumulte de la vie moderne, happée par la vitesse et le poids du quotidien, il est facile d’oublier cette grande dimension sacrée. Pourtant, prendre soin de son être spirituel, l’honorer et le nourrir, fait partie intégrante du grand voyage qu’est la vie.</p>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">À travers les expériences, soins, arts et rituels proposés ici, mon souhait est que chacun retrouve ce lien intime avec son essence. 
Que chaque journée, même ordinaire, devienne un rappel à l’essentiel : écouter son âme, l’aimer, être en joie et lui permettre de rayonner.</p>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">Les Êtres qui composent cette plateforme ne sont pas seulement des praticiens mais des artistes, des créateurs. Car c’est dans l’art, sous toutes ses formes, que le meilleur de l’âme se révèle. Leur mission est de semer des espaces de beauté, de guérison et d’harmonisation, où chacun peut se reconnecter à sa propre essence. Ici, chaque soin, chaque œuvre, chaque geste créatif devient un passage sacré vers plus de clarté intérieure, plus de vérité et plus d’unité. Ici, l’art est une médecine nouvelle.</p>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">Et dans la vision de Terra Nova, cette médecine ne s’épanouit jamais seule : elle prend toute sa force dans le Lyannaj, ce tissage vivant entre artistes, thérapeutes, âmes-médecine et les âmes en quête d’expérience. Quand ces présences se rencontrent, un champ plus vaste s’ouvre, bien au-delà de ce que chacun pourrait offrir seul. Le collectif devient une guérison en lui-même : il nourrit, équilibre, inspire et élève. Dans ce maillage, chaque talent trouve sa place, chaque voix résonne, chaque présence compte.</p>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">De cette union naît l’holistique véritable : un retour à l’unité, une guérison qui englobe le corps, l’âme et le lien au vivant. Par cette expérience, je te souhaite la reconnexion, l’évasion et le souvenir de qui tu es vraiment : un être spirituel en chemin vers sa propre lumière. </p>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">Avec Amour,<br />✨ Eline</p>
            <Link to="/eline-dracon">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-secondary rounded-full px-8 py-4 text-lg">
                Découvrir mon histoire
              </Button>
            </Link>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" alt="Portrait d'Éline Dracon, thérapeute holistique, souriant avec une lumière douce en arrière-plan." src="https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/f62eb04fbb796f7fa1fa717d0cc99cd2.jpg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>
        </div>
      </section>
    </div>;
};
export default HomePage;