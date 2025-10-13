import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Heart, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
const ElineHeroSection = ({
  name,
  image,
  mantra,
  stats,
  contactInfo
}) => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden mystical-gradient">
      <div className="absolute inset-0 mandala-bg opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <Star className="w-8 h-8 text-amber-500" />
              <span className="text-lg font-semibold text-amber-600 bg-amber-100 px-4 py-2 rounded-full">Âme-médecine </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="aura-text font-['Dancing_Script']">
                {name}
              </span>
            </h1>

            <p className="text-2xl text-emerald-600 font-semibold">Alchimiste du toucher </p>

            <p className="text-xl text-white leading-relaxed">Sagesse ancestrale et techniques modernes de guérison.</p>
            <p className="text-xl text-white leading-relaxed">J’unis massage intuitif et travail énergétique dans le flow de l’instant présent. Une main reçoit, absorbe… L’autre transmet, transmute : Par ce fil conducteur l’énergie circule, s’harmonise et se transforme.</p>
            <p className="text-xl text-white leading-relaxed">Pas de protocole figé : seulement la mémoire du geste, transmise par l’âme, nourrie par la Terre, guidée par le flux du présent. </p>
            <p className="text-xl text-white leading-relaxed">Je réveille la circulation énergétique de vie dans les zones oubliées, je vous accompagne vers un relâchement du mental par ce toucher dissocié… le corps s’apaise, l’âme respire, et l’énergie retrouve sa danse naturelle.</p>
            <p className="text-xl text-white leading-relaxed">Vous repartez aligné, réharmonisé, prêt à marcher sur votre chemin avec clarté et sérénité.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-white">
                <Award className="w-6 h-6 text-emerald-500" />
                <span>{stats.experience}</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Heart className="w-6 h-6 text-rose-500" />
                <span>{stats.soulsGuided}</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <MapPin className="w-6 h-6 text-teal-500" />
                <span>{stats.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Star className="w-6 h-6 text-amber-500" />
                <span>{stats.rating} ({stats.reviews} avis)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://calendly.com/eline971-dracon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 energy-pulse bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                <Calendar className="w-5 h-5 mr-2" />
                Réserver une Séance
              </a>
              
              <a href="https://wa.me/590690938651" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-4 text-lg rounded-full border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50">
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-3xl blur-3xl floating-animation"></div>
            <img className="relative w-full h-[600px] object-cover rounded-3xl shadow-2xl chakra-glow" alt={`${name}, thérapeute holistique en Guadeloupe`} src={image} />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent bg-[url('https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/99e4380e0bba25841a9929b2e4cd59c6.jpg')] bg-cover bg-center mix-blend-overlay`}></div>
            
            <Dialog>
              <DialogTrigger asChild>
                <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <Button variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full shadow-lg hover:bg-white/30">
                    <Heart className="w-4 h-4 mr-2 text-rose-300" />
                    Vibration
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="bg-gray-900/80 backdrop-blur-lg border-emerald-500/30 text-white max-w-2xl rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-['Dancing_Script'] text-emerald-300 text-center mb-4">Ma Vibration</DialogTitle>
                  <DialogDescription asChild>
                    <div className="text-gray-300 text-lg leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto p-4 text-left">
                      <p>Après avoir pratiqué une ribambelle de massage, je me suis vite aperçu que le côté énergétique était une dimension qui m’attirait, me fascinait ... d’ailleurs mon tout premier massage appris fut l’Ayurveda comme quoi tout est destinée ...</p>
                      <p>Ce chemin m’a naturellement menée à explorer la bioénergétique, le quantique et les plans subtils. Et comme rien n’arrive par hasard, c’est après avoir reçu moi-même une séance de Reiki bouleversante, au tout début de mon introspection, que tout s’est ouvert en moi.</p>
                      <p>Ce fut le point de départ d’un réveil vers la réelle connaissance de soi, les réalités vibratoires, les mondes intangibles ... et le chemin s'ouvre encore pr moi on a jamais fini d'apprendre n'est ce pas... Et donc sur le début de ce chemin on m'a fait retrouvé ma famille d’âmes et tout cela m'a révélé à moi-même — et pas sans mal.</p>
                      <p>Ca été un réel accouchement de moi-même, une re-naissance. Car oui, tout est illusion… tout est conditionnement. Et c’est en allant retrouver ma lumière divine, mon centre au fin fond de moi-même et en me rappelant ce que mon âme est venue expérimenter encore une fois ici-bas, que tout a pris sens, que ma vérité a pris forme et que mon amour a pris force. Toute cette compréhension aide notre conscience à s'expanser et à accomplir ce ..qui que quoi dont où …</p>
                      <p>Alors relativise, la vie n’est qu’un apprentissage, une étape vers d’autre dimension ...et l’intelligence divine de la vie, cette intelligence divine oui ..celle qui fait battre ton cœur en symphonie, celle qui s'expérimente à travers tes ressentis de la matière, tes émotions, tes expériences et qui nous porte, nous guide dans la danse de cet alignement à Etre ...t’inquiètes qu’elle veille au grain.</p>
                      <p className="text-center text-emerald-300 font-semibold text-xl pt-4">
                        Tout est juste ✨ Aime toi , Crois en toi ✨ et le reste suivra ✨
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default ElineHeroSection;