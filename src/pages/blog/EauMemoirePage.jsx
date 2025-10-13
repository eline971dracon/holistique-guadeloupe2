import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const EauMemoirePage = () => {
    const { toast } = useToast();

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Lien copié !",
            description: "Le lien vers cet article a été copié dans votre presse-papiers.",
        });
    };

    const handleLike = () => {
        toast({
            title: "Merci pour votre amour !",
            description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀",
        });
    };

    return (
        <div className="pt-16 min-h-screen mystical-gradient-subtle">
            <Helmet>
                <title>L’eau, gardienne de mémoire - Terra Nova</title>
                <meta name="description" content="Explorez comment l'eau, miroir de nos émotions, enregistre et reflète nos intentions et pensées." />
                <meta property="og:title" content="L’eau, gardienne de mémoire - Terra Nova" />
                <meta property="og:description" content="Découvrez les expériences de Masaru Emoto et le pouvoir de l'eau comme messagère vibratoire." />
                <meta property="og:image" content="https://images.unsplash.com/photo-1533219355137-593339174548?q=80&w=1200&auto=format&fit=crop" />
            </Helmet>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-64 md:h-80 relative"
            >
                <img alt="Beautiful frozen water crystal" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1533219355137-593339174548" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                         <Droplets className="w-12 h-12 text-cyan-300 mx-auto mb-4" />
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="aura-text font-['Dancing_Script']">
                                L’eau, gardienne de mémoire
                            </span>
                        </h1>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Link to="/blog" className="inline-flex items-center text-primary hover:text-element-terre transition-colors mb-8 group">
                        <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Retour aux transmissions
                    </Link>

                    <main className="crystal-card-dark rounded-3xl p-8 md:p-12">
                        <article className="prose prose-lg lg:prose-xl max-w-none text-white/90 prose-headings:aura-text prose-headings:font-['Dancing_Script'] prose-p:leading-relaxed prose-strong:text-cyan-300 prose-headings:mb-4 prose-p:mb-6 prose-ul:my-6 prose-li:my-2">
                            <p className="lead text-xl text-white/80 italic">L’eau est partout autour de nous : dans les océans, les rivières, les nuages… et elle est aussi en nous, car notre corps en est composé à plus de 70 %. Mais l’eau n’est pas seulement une substance vitale. Elle est aussi une gardienne de mémoire, un miroir de nos émotions et un lien vivant entre la matière et l’esprit.</p>
                            
                            <h2>1. Les découvertes de Masaru Emoto</h2>
                            <p>Le chercheur japonais Masaru Emoto a bouleversé notre perception de l’eau dans les années 1990. En exposant de l’eau à différents mots, musiques ou intentions, puis en la cristallisant par congélation, il a observé que :</p>
                            <ul>
                                <li>Des pensées ou musiques positives (“amour”, “gratitude”, Mozart, Bach) donnaient naissance à de <strong>magnifiques cristaux hexagonaux</strong>, rappelant la perfection des flocons de neige.</li>
                                <li>Des pensées ou musiques négatives (“haine”, “colère”, musique agressive) produisaient des <strong>formes chaotiques, difformes</strong>, presque malades.</li>
                            </ul>
                             <p>Ces expériences ont ouvert une porte vertigineuse : et si l’eau pouvait réellement enregistrer et refléter nos émotions ?</p>

                            <h2>2. L’eau comme messagère vibratoire</h2>
                            <p>Si l’eau est capable de garder en mémoire les intentions, cela signifie qu’elle agit comme une <strong>bibliothèque vibratoire vivante</strong>. Et comme nous sommes faits majoritairement d’eau, cela implique que :</p>
                            <ul>
                                <li>Nos pensées et nos paroles influencent directement notre corps.</li>
                                <li>Les environnements dans lesquels nous vivons (sons, musique, mots, atmosphères) façonnent littéralement notre eau intérieure.</li>
                            </ul>
                            <p>Ainsi, chaque gorgée d’eau devient un acte sacré : elle porte une fréquence qui va résonner dans nos cellules.</p>
                            
                            <h2>3. Les rituels de purification par l’eau</h2>
                            <p>Depuis toujours, les traditions du monde entier ont reconnu le caractère sacré de l’eau :</p>
                            <ul>
                                <li>Les ablutions dans les rituels religieux.</li>
                                <li>Les bains de rivière ou d’océan pour se purifier.</li>
                                <li>Les fontaines et sources considérées comme guérisseuses.</li>
                            </ul>
                            <p>Aujourd’hui, nous pouvons renouer avec cette sagesse en créant nos propres rituels :</p>
                             <ul>
                                <li><strong>Charger son eau avec une intention</strong> : poser ses mains autour d’un verre d’eau, y insuffler amour ou gratitude, puis boire en conscience.</li>
                                <li><strong>Utiliser l’eau en méditation</strong> : plonger ses mains dans une rivière, un bol ou un bain, et imaginer que toutes les tensions se dissolvent.</li>
                                <li><strong>Écouter l’eau</strong> : sons des vagues, pluie, cascades… des musiques naturelles qui recalibrent notre vibration intérieure.</li>
                            </ul>

                            <h2>4. L’eau et la mémoire collective</h2>
                            <p>L’eau circule sans cesse : ce verre que vous buvez contient peut-être des molécules qui ont traversé des océans millénaires ou nourri des forêts anciennes. Elle relie les générations, les continents, les époques. Elle est la <strong>mémoire fluide de la planète</strong>.</p>
                            <p>En honorant l’eau, nous honorons aussi la mémoire de la Terre et de tout ce qu’elle a traversé.</p>
                           
                            <h2>5. Invitation à l’expérience</h2>
                            <p>La prochaine fois que vous buvez un verre d’eau, prenez quelques secondes pour la regarder. Soufflez doucement dessus, en y mettant une pensée de paix ou de gratitude. Puis buvez-la en conscience, comme si vous absorbiez une fréquence sacrée.</p>
                            <p>Vous verrez que ce simple geste transforme l’ordinaire en rituel, et que l’eau devient alors une médecine subtile.</p>

                            <p className="text-center text-2xl text-cyan-300 font-semibold pt-8">✨ L’eau n’est pas qu’un liquide vital : c’est un miroir, une mémoire, une messagère. Elle reflète nos émotions, amplifie nos intentions, et nous rappelle que nous sommes, nous aussi, des êtres fluides en perpétuel mouvement. ✨</p>
                        </article>

                        <div className="mt-12 pt-8 border-t border-white/20 flex justify-between items-center">
                            <p className="text-sm text-white/60">Publié le 12 Juillet 2024</p>
                            <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" onClick={handleShare} className="text-white/70 hover:bg-white/10 hover:text-white rounded-full">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={handleLike} className="text-white/70 hover:bg-white/10 hover:text-white rounded-full">
                                    <Heart className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </main>
                </motion.div>
            </div>
        </div>
    );
};

export default EauMemoirePage;