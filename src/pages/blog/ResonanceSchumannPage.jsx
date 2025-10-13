import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const ResonanceSchumannPage = () => {
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
                <title>La résonance de Schumann : le battement de cœur de la Terre - Terra Nova</title>
                <meta name="description" content="Découvrez la résonance de Schumann, la vibration fondamentale de notre planète, et son lien profond avec notre bien-être." />
                <meta property="og:title" content="La résonance de Schumann : le battement de cœur de la Terre" />
                <meta property="og:description" content="Plongez dans le rythme de Gaia, une fréquence de 7,83 Hz qui nous harmonise et nous régénère." />
                <meta property="og:image" content="https://images.unsplash.com/photo-1543722530-539c3c415520?q=80&w=1200&auto=format&fit=crop" />
            </Helmet>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-64 md:h-80 relative"
            >
                <img alt="The Earth seen from space with lightning strikes in the atmosphere" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1543722530-539c3c415520" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="aura-text font-['Dancing_Script']">
                                La Résonance de Schumann
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                           Le battement de cœur de la Terre
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
                            <p className="lead text-xl text-white/80 italic">Découverte dans les années 1950 par le physicien Winfried Otto Schumann, elle correspond à une vibration fondamentale de notre planète : <strong>7,83 Hz</strong>. Certains l’appellent le battement de cœur de la Terre.</p>
                            
                            <h2>1. La Terre chante</h2>
                            <p>Imaginez notre planète comme un immense tambour. Son atmosphère, prise entre la surface terrestre et l’ionosphère, forme une caisse de résonance. Lorsque la foudre frappe (des milliers de fois chaque seconde sur la planète), cela fait vibrer cette “cavité” et génère une onde stable : 7,83 Hz.</p>
                            <p>C’est le son de fond permanent de notre Terre, une mélodie silencieuse qui nous enveloppe à chaque instant, que nous en soyons conscients ou non.</p>

                            <h2>2. Le lien avec le corps humain</h2>
                            <p>Ce qui fascine, c’est que cette fréquence de 7,83 Hz correspond aussi à celle de nos ondes cérébrales en état <strong>Alpha/Theta</strong> – l’état de relaxation profonde, de méditation, de créativité et de régénération.</p>
                            <p>En d’autres termes : quand nous nous accordons à la fréquence de la Terre, nous entrons en cohérence. Notre système nerveux se calme, notre respiration devient plus fluide, et nos cellules se mettent en résonance avec le vivant.</p>
                            <p>C’est pourquoi une simple marche pieds nus dans la nature, au bord de l’océan ou en forêt, agit comme une remise à la terre énergétique : nous nous recalons naturellement sur le pouls de Gaia.</p>
                            
                            <h2>3. Quand la fréquence s’élève…</h2>
                            <p>Depuis quelques années, des scientifiques observent des variations de la résonance de Schumann. Elle s’intensifie parfois, montant à 20, 30, voire 40 Hz.</p>
                            <p>Certains y voient un simple phénomène géophysique. D’autres, plus spirituels, y lisent le signe d’une <strong>élévation vibratoire planétaire</strong> : comme si la Terre nous invitait à nous ajuster à une conscience plus haute, plus éveillée.</p>
                            <p>Cela expliquerait pourquoi beaucoup ressentent des symptômes liés à ces pics : fatigue soudaine, agitation intérieure, rêves intenses, besoin de silence ou au contraire bouffées d’énergie.</p>

                            <h2>4. Une invitation à l’harmonie</h2>
                            <p>Nous ne sommes pas séparés de la Terre : nous sommes faits de la même matière, nous respirons son air, nous buvons son eau. Il est naturel que son battement nous influence.</p>
                            <p>La résonance de Schumann nous rappelle que :</p>
                            <ul>
                                <li>Se connecter à la nature, c’est <strong>retrouver notre rythme naturel</strong>.</li>
                                <li>Méditer ou respirer en conscience, c’est <strong>se remettre sur la même longueur d’onde</strong> que le cœur de Gaia.</li>
                                <li>Honorer la Terre, c’est <strong>honorer le corps vivant</strong> dont nous faisons partie.</li>
                            </ul>
                           
                            <h2>5. Expérience simple</h2>
                            <p>Fermez les yeux. Imaginez un grand tambour au centre de la Terre qui pulse doucement à 7,83 battements par seconde. Ressentez ce rythme entrer dans votre poitrine, puis se diffuser dans tout votre corps. En quelques instants, votre système nerveux se réaccorde et vous retrouvez le repos intérieur.</p>

                            <p className="text-center text-2xl text-emerald-300 font-semibold pt-8">✨ La résonance de Schumann n’est pas qu’un fait scientifique : c’est une mystique vibratoire qui nous rappelle notre lien d’amour avec la Terre. Le cœur de Gaia bat en nous, et le nôtre répond en écho. ✨</p>
                        </article>

                        <div className="mt-12 pt-8 border-t border-white/20 flex justify-between items-center">
                            <p className="text-sm text-white/60">Publié le 26 Juillet 2024</p>
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

export default ResonanceSchumannPage;