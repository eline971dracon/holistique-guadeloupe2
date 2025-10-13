import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
const ElineServicesSection = ({
  services
}) => {
  const {
    toast
  } = useToast();
  const handleBookAppointment = () => {
    toast({
      title: "📅 Réservation de Rendez-vous",
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀"
    });
  };
  return <section className="py-20">
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
                  Mes Soins
                </span>
              </h2>
              <div className="space-y-4">
                <p className="text-xl text-white max-w-3xl mx-auto">Je vous invite à entrer sous la voûte de mon Dôme Vibratoire et à vivre chacun de mes soins comme un voyage sacré.</p>
                <p className="text-xl text-white max-w-3xl mx-auto">Sous le Dôme Vibratoire, chaque rituel prend une dimension nouvelle : ce lieu est une onde vivante qui amplifie l’expérience du toucher.</p>
                <p className="text-xl text-white max-w-3xl mx-auto">Par sa géométrie, le dôme génère une onde de forme qui favorise la circulation de l’énergie et installe une atmosphère de détente profonde. Véritable antenne naturelle, il harmonise les champs subtils du corps et invite chacun à entrer en résonance avec l’harmonie du vivant.</p>
                <p className="text-xl text-white max-w-3xl mx-auto">🌿Recevoir un massage sous cette voûte, c’est bénéficier d’une synergie rare. Mes soins deviennent des voyages intérieurs où l’énergie des éléments, la puissance des formes vibratoires et la profondeur du toucher sacré s’unissent 🌿 </p>
                <p className="text-foreground/80 leading-relaxed flex-grow mb-4"></p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => {
          const Icon = service.icon;
          return <motion.div key={service.title} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="crystal-card rounded-3xl p-8 text-center group hover:shadow-2xl transition-all duration-300 flex flex-col">
                    <div className="flex-grow">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center chakra-glow group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 aura-text font-['Dancing_Script']">
                        {service.title}
                      </h3>
                      
                      <p className="text-white leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-center space-x-2 text-white">
                          <Clock className="w-5 h-5 text-emerald-500" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">
                          {service.price}
                        </div>
                      </div>
                      
                      {service.id ? <Link to={`/soin/${service.id}`} className="w-full">
                          <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-full">
                            Consulter en détail
                          </Button>
                        </Link> : <Button onClick={handleBookAppointment} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-full">
                          Réserver ce Soin
                        </Button>}
                    </div>
                  </motion.div>;
        })}
            </div>
          </div>
        </section>;
};
export default ElineServicesSection;