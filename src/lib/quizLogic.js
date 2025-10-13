import { getAllTherapists } from '@/lib/therapists';

export const frequencies = {
  Terre: {
    name: 'Chemin Racine',
    icon: 'Mountain',
    color: 'from-amber-600 to-yellow-800',
    description: "Besoin d’ancrage, de sécurité et de réconfort. Votre âme appelle le contact avec le corps et la stabilité de la terre.",
    suggestion: "Soins corporels, fabrication d'objets rituels, reconnexion à la nature.",
    vibrationKey: 'Terre'
  },
  Feu: {
    name: 'Chemin Flamme',
    icon: 'Sun',
    color: 'from-red-500 to-orange-600',
    description: "Besoin de libération, d'expression et de transformation. Une puissante énergie créatrice cherche à s'exprimer et à brûler l'ancien.",
    suggestion: "Rituels de libération, danse intuitive, œuvres vibrantes.",
    vibrationKey: 'Feu'
  },
  Air: {
    name: 'Chemin Souffle',
    icon: 'Wind',
    color: 'from-sky-400 to-cyan-500',
    description: "Besoin de compréhension et de clarté mentale. Votre esprit a soif de sens, d'apprentissage et de nouvelles perspectives.",
    suggestion: "Ateliers, guidances, enseignements inspirants.",
    vibrationKey: 'Air'
  },
  Eau: {
    name: 'Chemin Brume',
    icon: 'Droplets',
    color: 'from-blue-500 to-indigo-600',
    description: "Besoin de douceur, d'accueil émotionnel et de créativité. Votre sensibilité est une force, invitant à la fluidité et à l'art.",
    suggestion: "Soins musicaux, bains sonores, écriture intuitive.",
    vibrationKey: 'Eau'
  },
  Éther: {
    name: 'Chemin Étoile',
    icon: 'Star',
    color: 'from-purple-500 to-indigo-700',
    description: "Besoin de mystère, d'éveil spirituel et de reliance. Vous êtes appelé·e à écouter l'invisible et à vous souvenir de votre nature cosmique.",
    suggestion: "Oracles, cérémonies, voyages méditatifs.",
    vibrationKey: 'Éther'
  }
};

const questionPools = {
  Terre: [
    { question: "Quand tu poses la main sur ton cœur, ce que tu ressens le plus en ce moment, c’est…", choiceKey: "coeur" },
    { question: "Ton rapport à la spiritualité aujourd’hui, ce serait plutôt…", choiceKey: "spiritualite" },
    { question: "Si ton corps pouvait parler, il demanderait...", choiceKey: "corps" },
    { question: "Pour te sentir en sécurité, tu as besoin de...", choiceKey: "securite" },
  ],
  Feu: [
    { question: "Une énergie bouillonne en toi. Elle ressemble à...", choiceKey: "energie" },
    { question: "Quelle vérité as-tu besoin de crier au monde ?", choiceKey: "verite" },
    { question: "Si tu pouvais brûler une vieille peau, ce serait celle de...", choiceKey: "bruler" },
    { question: "Ta flamme intérieure a besoin de quel combustible ?", choiceKey: "flamme" },
  ],
  Air: [
    { question: "Quelle est la question qui tourne en boucle dans ton esprit ?", choiceKey: "question_boucle" },
    { question: "Si tes pensées étaient des nuages, comment seraient-ils ?", choiceKey: "pensees" },
    { question: "Quel enseignement cherches-tu en ce moment ?", choiceKey: "enseignement" },
    { question: "Pour y voir plus clair, tu as besoin de...", choiceKey: "clarte" },
  ],
  Eau: [
    { question: "Si tes émotions étaient une rivière, comment coulerait-elle ?", choiceKey: "riviere" },
    { question: "Quelle est la mélodie de ton âme aujourd'hui ?", choiceKey: "melodie" },
    { question: "Ton intuition te murmure de...", choiceKey: "intuition" },
    { question: "Pour te sentir fluide, tu as besoin de...", choiceKey: "fluidite" },
  ],
  Éther: [
    { question: "L'Univers essaie de te dire quelque chose. C'est un message sur...", choiceKey: "univers" },
    { question: "Si tu fermais les yeux, quelle vision apparaîtrait ?", choiceKey: "vision" },
    { question: "Quel est le plus grand mystère que tu souhaites explorer ?", choiceKey: "mystere" },
    { question: "Pour te sentir connecté·e, tu as besoin de...", choiceKey: "connexion" },
  ],
};

const choiceTemplates = {
  coeur: [
    { text: "Un besoin de me poser, me rassurer", freq: "Terre" },
    { text: "Une chaleur vive, des remous que je n’explique pas", freq: "Feu" },
    { text: "Une envie de comprendre pourquoi je suis ici", freq: "Air" },
    { text: "Une boule floue, une hypersensibilité constante", freq: "Eau" },
    { text: "Une vibration ancienne, un appel lointain", freq: "Éther" }
  ],
  spiritualite: [
    { text: "J’ai besoin que ce soit concret, incarné", freq: "Terre" },
    { text: "J’y crois, mais je dois d’abord nettoyer certaines choses", freq: "Feu" },
    { text: "J’ai soif de comprendre et j’étudie beaucoup", freq: "Air" },
    { text: "Je ressens, parfois je me sens débordé(e)", freq: "Eau" },
    { text: "C’est une évidence, je suis ici pour me souvenir", freq: "Éther" }
  ],
  corps: [
    { text: "De racines profondes pour me sentir stable.", freq: "Terre" },
    { text: "De bouger, de danser pour libérer la tension.", freq: "Feu" },
    { text: "De respirer amplement pour oxygéner mes idées.", freq: "Air" },
    { text: "De douceur, de caresses, d'un bain chaud.", freq: "Eau" },
    { text: "De silence, pour sentir les énergies subtiles.", freq: "Éther" },
  ],
  securite: [
    { text: "Sentir le sol ferme sous mes pieds.", freq: "Terre" },
    { text: "Savoir que j'ai le droit d'exprimer ma colère.", freq: "Feu" },
    { text: "Comprendre les règles du jeu.", freq: "Air" },
    { text: "Être dans un cocon de bienveillance.", freq: "Eau" },
    { text: "Sentir que je suis protégé(e) par l'invisible.", freq: "Éther" },
  ],
  energie: [
    { text: "Une lave lente et puissante.", freq: "Feu" },
    { text: "Un torrent qui a besoin de se déverser.", freq: "Eau" },
    { text: "Une tempête de vent qui doit tout balayer.", freq: "Air" },
    { text: "La force tranquille d'un arbre centenaire.", freq: "Terre" },
    { text: "Une pulsation cosmique difficile à définir.", freq: "Éther" },
  ],
  verite: [
    { text: "Que mes besoins fondamentaux sont légitimes.", freq: "Terre" },
    { text: "Que ma colère est saine et juste.", freq: "Feu" },
    { text: "Que mes idées ont de la valeur.", freq: "Air" },
    { text: "Que ma sensibilité est une force.", freq: "Eau" },
    { text: "Que je suis bien plus qu'un corps physique.", freq: "Éther" },
  ],
  bruler: [
    { text: "La peur de manquer.", freq: "Terre" },
    { text: "La gentille fille / le gentil garçon.", freq: "Feu" },
    { text: "Le besoin de tout contrôler par le mental.", freq: "Air" },
    { text: "La peur de mes propres émotions.", freq: "Eau" },
    { text: "Le sentiment d'être séparé(e).", freq: "Éther" },
  ],
  flamme: [
    { text: "De bois sec, de concret, de matière.", freq: "Terre" },
    { text: "D'oxygène, d'espace pour grandir.", freq: "Air" },
    { text: "D'une étincelle de magie.", freq: "Éther" },
    { text: "D'une intention claire pour la diriger.", freq: "Feu" },
    { text: "De larmes pour nettoyer la place.", freq: "Eau" },
  ],
  question_boucle: [
    { text: "Comment puis-je me sentir plus en sécurité ?", freq: "Terre" },
    { text: "Comment puis-je libérer cette énergie qui me consume ?", freq: "Feu" },
    { text: "Quel est le sens de tout ça ?", freq: "Air" },
    { text: "Pourquoi suis-je si sensible ?", freq: "Eau" },
    { text: "Y a-t-il quelque chose de plus grand que moi ?", freq: "Éther" },
  ],
  pensees: [
    { text: "Des nuages bas et lourds, proches de la terre.", freq: "Terre" },
    { text: "Des cumulonimbus d'orage, chargés d'électricité.", freq: "Feu" },
    { text: "Des cirrus légers et rapides, tout en altitude.", freq: "Air" },
    { text: "Un brouillard épais où tout est flou.", freq: "Eau" },
    { text: "Une aurore boréale, colorée et magique.", freq: "Éther" },
  ],
  enseignement: [
    { text: "Un savoir-faire pratique et utile.", freq: "Terre" },
    { text: "Une technique de libération puissante.", freq: "Feu" },
    { text: "Une philosophie qui éclaire ma lanterne.", freq: "Air" },
    { text: "Un art qui me permet d'exprimer ce que je ressens.", freq: "Eau" },
    { text: "Une connaissance ésotérique, un secret d'initié.", freq: "Éther" },
  ],
  clarte: [
    { text: "De mettre les mains dans la terre.", freq: "Terre" },
    { text: "D'agir, même sans tout comprendre.", freq: "Feu" },
    { text: "D'un plan, d'une structure, d'une feuille de route.", freq: "Air" },
    { text: "D'écouter mon cœur plutôt que ma tête.", freq: "Eau" },
    { text: "De méditer et de recevoir une guidance.", freq: "Éther" },
  ],
  riviere: [
    { text: "Comme un fleuve tranquille et puissant.", freq: "Terre" },
    { text: "Comme un torrent impétueux après un orage.", freq: "Feu" },
    { text: "Comme une source claire dont on ne voit pas le fond.", freq: "Air" },
    { text: "Comme un océan aux marées changeantes.", freq: "Eau" },
    { text: "Comme une nappe phréatique souterraine et mystérieuse.", freq: "Éther" },
  ],
  melodie: [
    { text: "Le son grave et rassurant d'un tambour.", freq: "Terre" },
    { text: "Un chant tribal et puissant.", freq: "Feu" },
    { text: "Le son cristallin d'une flûte.", freq: "Air" },
    { text: "Le murmure d'un violoncelle.", freq: "Eau" },
    { text: "Un silence vibrant, rempli de sons inaudibles.", freq: "Éther" },
  ],
  intuition: [
    { text: "Ralentir, de prendre soin de mon corps.", freq: "Terre" },
    { text: "Poser mes limites, de dire non.", freq: "Feu" },
    { text: "Apprendre quelque chose de nouveau.", freq: "Air" },
    { text: "Créer, dessiner, chanter, sans but précis.", freq: "Eau" },
    { text: "Faire confiance aux signes.", freq: "Éther" },
  ],
  fluidite: [
    { text: "De sentir mes pieds bien ancrés au sol.", freq: "Terre" },
    { text: "De laisser sortir la vague de colère ou de passion.", freq: "Feu" },
    { text: "De nommer mes émotions pour les comprendre.", freq: "Air" },
    { text: "D'accueillir mes larmes sans jugement.", freq: "Eau" },
    { text: "De me laisser porter par le courant de la vie.", freq: "Éther" },
  ],
  univers: [
    { text: "De prendre soin de ton corps, ton temple.", freq: "Terre" },
    { text: "Que tu as le droit d'être en colère.", freq: "Feu" },
    { text: "D'arrêter de trop penser et de plus ressentir.", freq: "Air" },
    { text: "Que tes émotions sont tes meilleures alliées.", freq: "Eau" },
    { text: "Que tu n'es jamais seul(e).", freq: "Éther" },
  ],
  vision: [
    { text: "Une forêt luxuriante et paisible.", freq: "Terre" },
    { text: "Un volcan en éruption.", freq: "Feu" },
    { text: "Un sommet de montagne avec une vue dégagée.", freq: "Air" },
    { text: "Un lac souterrain aux eaux cristallines.", freq: "Eau" },
    { text: "Une galaxie lointaine.", freq: "Éther" },
  ],
  mystere: [
    { text: "Celui de mon corps et de ses mémoires.", freq: "Terre" },
    { text: "Celui de ma propre puissance créatrice.", freq: "Feu" },
    { text: "Celui du fonctionnement de l'esprit humain.", freq: "Air" },
    { text: "Celui de l'amour inconditionnel.", freq: "Eau" },
    { text: "Celui de mes vies antérieures.", freq: "Éther" },
  ],
  connexion: [
    { text: "D'un rituel concret, avec des objets.", freq: "Terre" },
    { text: "D'une danse extatique.", freq: "Feu" },
    { text: "D'une conversation profonde et sincère.", freq: "Air" },
    { text: "D'un moment de contemplation artistique.", freq: "Eau" },
    { text: "D'une cérémonie sacrée.", freq: "Éther" },
  ],
};


function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function generateQuizQuestions() {
  const finalQuestions = [];
  const usedQuestionKeys = new Set();
  
  Object.values(frequencies).forEach(freq => {
    const pool = questionPools[freq.vibrationKey];
    let availableQuestions = pool.filter(q => !usedQuestionKeys.has(q.choiceKey));
    if(availableQuestions.length === 0) {
       availableQuestions = pool;
    }
    const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    usedQuestionKeys.add(question.choiceKey);
    finalQuestions.push({
      question: question.question,
      choices: shuffleArray([...choiceTemplates[question.choiceKey]])
    });
  });
  
  return shuffleArray(finalQuestions).slice(0, 6);
}

export function calculateResult(finalAnswers) {
    const counts = finalAnswers.reduce((acc, freq) => {
      acc[freq] = (acc[freq] || 0) + 1;
      return acc;
    }, {});
  
    const maxCount = Math.max(...Object.values(counts));
    const dominantFrequencies = Object.keys(counts).filter(freq => counts[freq] === maxCount);
  
    const finalFrequencyKey = dominantFrequencies.length > 1
      ? dominantFrequencies[Math.floor(Math.random() * dominantFrequencies.length)]
      : dominantFrequencies[0];
  
    const finalResult = frequencies[finalFrequencyKey];
    
    const allTherapists = getAllTherapists();
    const matching = shuffleArray([...allTherapists]).filter(t => t.elements.includes(finalResult.vibrationKey));
    const selectedTherapist = matching.length > 0 ? matching[0] : null;

    return { result: finalResult, therapist: selectedTherapist };
}