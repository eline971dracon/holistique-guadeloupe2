import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Users } from 'lucide-react';
const ElineAboutSection = ({
  image
}) => {
  return <section className="py-20 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Mon Chemin, Ma Médecine
            </span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto"></p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
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
        }} className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <img className="absolute inset-0 w-full h-full object-cover" src="https://horizons-cdn.hostinger.com/31d0e86a-732d-4c00-87e3-8bc851042c67/fef0c7ad45e6c0415e2936b54f0b1262.jpg" alt="Éline Dracon dans un cadre naturel, connectée à l'environnement." />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-3xl font-bold font-['Dancing_Script'] aura-text">Éline Dracon</h3>
              <p className="text-lg">Canal de Guérison & Alchimiste du Toucher</p>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="space-y-6">
            <p>Je me suis longtemps cherchée dans le regard des autres, en quête de validations extérieures. Mon enfance et mon adolescence furent pourtant baignées d’amour, mais une fois entrée dans la vie active, j’ai tenté — parfois de force — de rentrer dans le moule. Très vite, je me suis sentie étriquée.</p>
            <p>Ce monde de performance et de dualité m’a pourtant offert, à travers ses épreuves, les plus belles clés de compréhension : – de ce qu'est réellement le jeu de la vie dans la matière, – de ce que les émotions sont venues m’enseigner, – et surtout … de ma véritable mission ! </p>
            <p>J’ai compris que ce que j’offrais depuis toujours, sans concession, c’était mon authenticité, ma bienveillance, mon cœur... Et j’ai appris à le faire avec parcimonie, avec sagesse... guidée par une grande intelligence émotionnelle. Je me sens bénie d'avoir reçu cette mission d'accompagnement qui prend toute sa beauté maintenant que j'ai pleinement accepter et pris ma place sur le chemin qui est le mien.</p>
            <p>Aujourd’hui, c’est avec cette conscience que j’accompagne les âmes qui me sont confiées. Dans la danse de la guérison et de l’alignement, j’unis la force de Mère Nature par mon canal aux vibrations célestes, pour ouvrir un espace sacré où chacun peut se guérir et se réaccorder, là où le visible et l’invisible s’entrelacent.</p>
            <p>À vous, mes futurs compagnons de route… À vous, mes âmes-sœurs de passage ou de toujours… Élevons-nous ensemble, car nous ne sommes qu’Un. Nos rencontres ne sont jamais le fruit du hasard ✨💛✨</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="crystal-card p-4 rounded-xl text-center">
                <Award className="w-8 h-8 mx-auto text-primary mb-2" />
                <span className="font-bold text-lg">Alchimiste</span>
                <p className="text-sm text-white/80">du Toucher</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default ElineAboutSection;