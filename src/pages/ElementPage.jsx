import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Users, Sun, Wind, Droplets, Mountain, Star as StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const elementsData = {
  Terre: {
    icon: Mountain,
    color: "from-yellow-600 to-amber-800",
    title: "La Voie de la Terre : Ancrage et Stabilité",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    virtues: "La Terre est notre mère nourricière, symbole d'ancrage, de sécurité et de matérialité. Elle nous invite à nous connecter à notre corps, à nos racines et au moment présent. C'est la force tranquille qui soutient toute vie.",
    spiritualHistory: "Dans de nombreuses traditions, la Terre est vénérée comme Gaïa, la déesse primordiale. Les rituels de la Terre visent à honorer le cycle des saisons, à cultiver la patience et à trouver la force dans la simplicité. Marcher pieds nus, jardiner, ou simplement s'asseoir contre un arbre sont des actes sacrés de reconnexion à son énergie.",
    invitation: "Explorez les praticiens qui vous aideront à vous enraciner, à apaiser votre système nerveux et à construire des fondations solides dans votre vie."
  },
  Feu: {
    icon: Sun,
    color: "from-red-500 to-orange-600",
    title: "La Voie du Feu : Transformation et Passion",
    image: "https://images.unsplash.com/photo-1533035336122-4327d345c5fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    virtues: "Le Feu est l'étincelle de vie, l'énergie de la transformation, de la passion et de la purification. Il représente notre volonté, notre courage et notre capacité à agir. Le Feu brûle l'ancien pour faire place au nouveau.",
    spiritualHistory: "Le Feu est sacré dans d'innombrables cultures, des feux de joie celtiques aux cérémonies du feu védiques. Il symbolise la lumière de la conscience et le pouvoir de l'esprit. Se rassembler autour d'un feu, c'est se connecter à une lignée ancestrale de conteurs, de guerriers et de visionnaires.",
    invitation: "Découvrez les gardiens de la flamme qui vous accompagneront pour libérer votre puissance, exprimer votre vérité et alchimiser vos ombres en lumière."
  },
  Air: {
    icon: Wind,
    color: "from-sky-400 to-cyan-500",
    title: "La Voie de l'Air : Clarté et Connaissance",
    image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    virtues: "L'Air est le souffle de vie, le domaine de l'intellect, de la communication et de la clarté. Il nous enseigne la légèreté, la flexibilité et le pouvoir des mots. C'est l'élément qui connecte toutes choses par la pensée et le son.",
    spiritualHistory: "Associé aux royaumes angéliques et aux messagers divins, l'Air est le véhicule de la prière et de l'intention. Les pratiques de respiration (pranayama), le chant de mantras et l'étude des textes sacrés sont des voies pour maîtriser l'énergie de l'Air. Il nous invite à élever notre perspective et à voir la vérité au-delà des illusions.",
    invitation: "Rencontrez les messagers du souffle qui vous aideront à clarifier votre esprit, à trouver les mots justes et à recevoir les enseignements dont votre âme a besoin."
  },
  Eau: {
    icon: Droplets,
    color: "from-blue-500 to-indigo-600",
    title: "La Voie de l'Eau : Fluidité et Intuition",
    image: "https://images.unsplash.com/photo-1530531162038-b54919c68513?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    virtues: "L'Eau est la source de toute vie, régissant le monde des émotions, de l'intuition et de la créativité. Elle nous apprend à lâcher prise, à nous abandonner au courant et à guérir en douceur. L'Eau purifie, nourrit et connecte au subconscient.",
    spiritualHistory: "Le baptême, les bains rituels et les pèlerinages aux sources sacrées témoignent du pouvoir purificateur de l'Eau. Elle est le miroir de l'âme, le royaume des rêves et des mystères féminins. Se connecter à l'Eau, c'est apprendre à écouter son cœur et à naviguer les vagues de la vie avec grâce.",
    invitation: "Plongez dans l'univers des praticiens de l'Eau pour apaiser vos émotions, libérer votre créativité et vous reconnecter à votre sagesse intuitive."
  },
  Éther: {
    icon: StarIcon,
    color: "from-purple-500 to-indigo-700",
    title: "La Voie de l'Éther : Mystère et Reliance",
    image: "https://images.unsplash.com/photo-1532881402214-61b51614b833?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    virtues: "L'Éther, ou Akasha, est l'élément subtil qui contient tous les autres. C'est l'espace infini, la conscience universelle, le champ des mémoires de l'âme. Il représente la spiritualité, la guidance et la connexion au grand Tout.",
    spiritualHistory: "L'Éther est le domaine des mystiques, des oracles et des chamanes. C'est la substance de la magie et des dimensions invisibles. La méditation, le voyage astral et la lecture des archives akashiques sont des moyens d'explorer cet élément. Il nous rappelle que nous sommes des êtres spirituels vivant une expérience humaine.",
    invitation: "Entrez en contact avec les âmes qui naviguent dans l'Éther pour recevoir des guidances, explorer les mystères de votre âme et vous souvenir de votre connexion à l'Univers."
  }
};

const ElementPage = () => {
  const { elementName } = useParams();
  const navigate = useNavigate();
  const element = elementsData[elementName];

  if (!element) {
    navigate('/');
    return null;
  }

  const Icon = element.icon;

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>{element.title} - Terra Nova</title>
        <meta name="description" content={element.virtues} />
      </Helmet>

      <div className="relative h-96">
        <img src={element.image} alt={`Paysage représentant l'élément ${elementName}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${element.color} flex items-center justify-center chakra-glow`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-['Dancing_Script']">{element.title}</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="crystal-card rounded-3xl p-8 md:p-12 space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4 aura-text font-['Dancing_Script']">Les Vertus de l'Élément</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">{element.virtues}</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 aura-text font-['Dancing_Script']">Histoire Spirituelle</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">{element.spiritualHistory}</p>
          </div>

          <div className="text-center border-t border-primary/20 pt-8">
            <p className="text-xl text-emerald-600 italic mb-6">{element.invitation}</p>
            <Link to={`/annuaire?element=${elementName}`}>
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <Users className="w-5 h-5 mr-2" />
                Voir les Gardiens de l'Élément {elementName}
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux Portails
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ElementPage;