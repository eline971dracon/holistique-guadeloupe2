import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ElineTestimonialsSection = ({ testimonials }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="aura-text font-['Dancing_Script']">
              Témoignages Sacrés
            </span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Les mots de ceux qui ont vécu la transformation énergétique 
            et retrouvé leur lumière intérieure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="crystal-card rounded-3xl p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>
              
              <p className="text-white italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="font-semibold text-white">
                {testimonial.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElineTestimonialsSection;