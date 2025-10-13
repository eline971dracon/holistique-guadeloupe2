import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: "🌌 Formes et fréquences : le langage secret de la géométrie sacrée",
    date: "02 Août 2024",
    excerpt: "Et si les formes n’étaient pas que des contours visibles, mais des vibrations figées dans la matière ? Et si, derrière chaque cercle, chaque spirale, chaque rosace, se cachait une fréquence qui dialogue en silence avec notre être profond ? ....",
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c811cd17?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/blog/formes-et-frequences"
  },
  {
    id: 2,
    title: "🌍 La résonance de Schumann : le battement de cœur de la Terre",
    date: "26 Juillet 2024",
    excerpt: "Nous vivons tous baignés dans une mer invisible : celle des vibrations de la Terre. Comme chaque être vivant, la planète elle-même a un rythme, un pouls, une fréquence qui lui est propre. Cette fréquence porte un nom : la résonance de Schumann.",
    image: "https://images.unsplash.com/photo-1543722530-539c3c415520?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/blog/resonance-schumann"
  },
  {
    id: 3,
    title: "💧 L’eau, gardienne de mémoire",
    date: "12 Juillet 2024",
    excerpt: "L’eau est partout autour de nous : dans les océans, les rivières, les nuages… et elle est aussi en nous, car notre corps en est composé à plus de 70 %. Mais l’eau n’est pas seulement une substance vitale. Elle est aussi une gardienne de mémoire, un miroir de nos émotions et un lien vivant entre la matière et l’esprit.",
    image: "https://images.unsplash.com/photo-1533219355137-593339174548?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/blog/eau-memoire"
  }
];

const BlogPage = () => {
  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Transmissions - Terra Nova</title>
        <meta name="description" content="Découvrez des textes sacrés, enseignements, témoignages et réflexions vibrantes pour nourrir votre âme." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="aura-text font-['Dancing_Script']">
                Transmissions de l'Âme
              </span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Un espace sacré pour nourrir votre esprit, éveiller votre conscience et vous connecter à la sagesse universelle.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="crystal-card rounded-3xl p-6 relative overflow-hidden flex flex-col"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-2xl mb-4 shadow-lg"
                />
                <h2 className="text-2xl font-bold mb-2 aura-text font-['Dancing_Script']">
                  {post.title}
                </h2>
                <p className="text-sm text-foreground/70 flex items-center mb-4">
                  <Calendar className="w-4 h-4 mr-2" /> {post.date}
                </p>
                <p className="text-foreground/80 leading-relaxed flex-grow mb-4">
                  {post.excerpt}
                </p>
                <Link to={post.link}>
                  <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-secondary">
                    <BookOpen className="w-4 h-4 mr-2" /> Lire la suite
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <h2 className="text-3xl font-bold mb-4 aura-text font-['Dancing_Script']">
              Le Rituel du Vendredi
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-6">
              Chaque semaine, une nouvelle inspiration pour votre âme.
            </p>
            <Button className="bg-gradient-to-r from-element-feu to-orange-600 text-white px-8 py-4 text-lg rounded-full shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" /> S'abonner aux Lettres de l'Âme
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;