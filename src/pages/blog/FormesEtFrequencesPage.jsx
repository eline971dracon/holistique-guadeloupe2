import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const FormesEtFrequencesPage = () => {
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
                <title>Formes et fréquences : le langage secret de la géométrie sacrée - Terra Nova</title>
                <meta name="description" content="Découvrez comment la forme et la fréquence sont les deux faces d'une même pièce dans l'univers de la géométrie sacrée." />
                <meta property="og:title" content="Formes et fréquences : le langage secret de la géométrie sacrée" />
                <meta property="og:description" content="Plongez dans un voyage où le son devient mandala et la spirale devient vibration." />
                <meta property="og:image" content="https://images.unsplash.com/photo-1518621736915-f3b1c811cd17?q=80&w=1200&auto=format&fit=crop" />
            </Helmet>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-64 md:h-80 relative"
            >
                <img  alt="Sacred geometry patterns overlaying a cosmic background" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1572015305583-8482e539e7a0" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="aura-text font-['Dancing_Script']">
                                Formes et Fréquences
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                            Le langage secret de la géométrie sacrée
                        </p>
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
                        <article className="prose prose-lg lg:prose-xl max-w-none text-white/90 prose-headings:aura-text prose-headings:font-['Dancing_Script'] prose-p:leading-relaxed prose-strong:text-emerald-300 prose-headings:mb-4 prose-p:mb-6 prose-ul:my-6 prose-li:my-2">
                            <p className="lead text-xl text-white/80 italic">Bienvenue dans l’univers fascinant de la géométrie sacrée, là où forme et fréquence sont une seule et même danse.</p>
                            
                            <h2>1. Quand la fréquence devient forme</h2>
                            <p>L’univers entier est vibration. Chaque atome, chaque cellule, chaque étoile est un concert d’ondes qui résonnent. Lorsqu’une vibration sonore est rendue visible – par exemple sur une plaque de sable ou dans l’eau – elle dessine spontanément des motifs géométriques précis. C’est ce que l’on appelle la <strong>cymatique</strong>.</p>
                            <p>Ainsi, la fréquence crée la forme. Une note de musique devient un mandala. Un battement rythmique devient une étoile.</p>
                            <p>La géométrie n’est donc pas seulement mathématique : elle est le <strong>visage visible du son</strong>.</p>

                            <h2>2. Quand la forme devient fréquence</h2>
                            <p>Mais le processus fonctionne aussi à l’inverse : une forme génère naturellement une vibration, une résonance subtile. C’est ce qu’on appelle les <strong>ondes de forme</strong>.</p>
                            <p>Une spirale capte et diffuse l’énergie, à l’image d’un coquillage ou d’une galaxie. Une pyramide concentre les forces et les redirige vers son sommet. Une fleur de vie rayonne une vibration d’équilibre et d’harmonie.</p>
                            <p>Chaque figure agit comme une antenne énergétique, capable d’influencer notre état intérieur. Ce n’est pas un hasard si les temples, cathédrales et lieux sacrés du monde entier respectent les proportions du <strong>nombre d’or</strong> ou des multiples vibratoires comme 432.</p>

                            <h2>3. La loi universelle : vibration = matière</h2>
                            <p>Dans la grande alchimie cosmique, l’énergie en mouvement (vibration) devient matière, et la matière garde la mémoire de cette vibration. C’est pour cela que la nature regorge de motifs sacrés :</p>
                            <ul>
                                <li>Les <strong>flocons de neige</strong>, tous uniques, sont des mandalas cristallins nés de la danse de l’eau et du froid.</li>
                                <li>Les <strong>fleurs</strong>, dans leurs pétales disposés selon le nombre d’or, incarnent l’harmonie vibratoire.</li>
                                <li>Les <strong>coquillages en spirale</strong> suivent la suite de Fibonacci, une partition mathématique qui résonne avec l’infini.</li>
                            </ul>
                            <p>Autrement dit, chaque forme que nous voyons est une note cristallisée de la symphonie de l’univers.</p>

                            <h2>4. Pourquoi cela nous touche profondément</h2>
                            <p>Quand nous contemplons une figure de géométrie sacrée – un Sri Yantra, une fleur de vie, ou simplement un coquillage en spirale – quelque chose en nous se réaccorde. Notre corps reconnaît inconsciemment la fréquence inscrite dans cette forme, et il se met à vibrer à l’unisson.</p>
                            <p>C’est la raison pour laquelle :</p>
                            <ul>
                                <li>Une cathédrale gothique nous <strong>élève intérieurement</strong>.</li>
                                <li>Une rosace <strong>hypnotise notre regard</strong>.</li>
                                <li>Une spirale naturelle nous <strong>ramène au souffle primordial</strong>.</li>
                            </ul>
                            <p>La forme est une fréquence qui parle à notre âme.</p>

                            <h2>5. Invitation à l’expérience</h2>
                            <p>La prochaine fois que vous croisez une forme naturelle – une étoile de mer, une fleur, un coquillage – prenez un moment pour l’observer en silence. Imaginez que cette figure invisible envoie une onde douce qui résonne jusque dans vos cellules. Écoutez ce que cela provoque en vous : apaisement, ouverture, expansion ?</p>
                            <p>Vous découvrirez alors que la géométrie sacrée n’est pas une théorie : c’est une expérience vivante, une méditation visuelle et une harmonisation énergétique.</p>

                            <p className="text-center text-2xl text-emerald-300 font-semibold pt-8">✨ En définitive, la forme et la fréquence ne font qu’un. Le son devient mandala. La spirale devient vibration. Et nous, êtres de chair et de lumière, sommes au centre de cette danse éternelle. ✨</p>
                        </article>

                        <div className="mt-12 pt-8 border-t border-white/20 flex justify-between items-center">
                            <p className="text-sm text-white/60">Publié le 02 Août 2024</p>
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

export default FormesEtFrequencesPage;