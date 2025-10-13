import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Droplets, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const Section = ({ title, icon, children }) => {
  const Icon = icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
        <Icon className="w-6 h-6 mr-3" />
        {title}
      </h3>
      <div className="space-y-4 bg-background/50 p-6 rounded-xl border border-border/50">
        {children}
      </div>
    </motion.div>
  );
};

const CheckboxGroup = ({ items, namePrefix }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <div key={`${namePrefix}-${item}`} className="flex items-center space-x-2">
        <Checkbox id={`${namePrefix}-${item}`} />
        <Label htmlFor={`${namePrefix}-${item}`} className="font-normal text-foreground/90">{item}</Label>
      </div>
    ))}
  </div>
);

const MassageQuestionnaireModal = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [suiviMedical, setSuiviMedical] = useState("non");
  const [contreIndications, setContreIndications] = useState("non");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🌿 Questionnaire Envoyé !",
      description: "Vos réponses ont bien été transmises. Merci pour votre préparation !",
    });
    // Here you would typically handle the form data, e.g., send it to an API.
    // For now, we just close the modal.
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-bold aura-text font-['Dancing_Script'] flex items-center">
              <Leaf className="w-6 h-6 mr-3 text-primary" />
              Questionnaire Client – Préparation du Massage
            </DialogTitle>
            <DialogDescription>
              Prenez un instant pour vous connecter à vos besoins actuels.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[65vh] p-6">
            <Section title="Partie 1 : Informations générales" icon={Sparkles}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom, prénom</Label>
                  <Input id="name" placeholder="Votre nom et prénom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date de naissance</Label>
                  <Input id="dob" type="date" />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="contact">Téléphone / Email (facultatif)</Label>
                <Input id="contact" placeholder="Pour vous contacter si besoin" />
              </div>
              <div className="space-y-2 mt-4">
                <Label>Avez-vous déjà reçu un massage auparavant ?</Label>
                <RadioGroup defaultValue="non" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oui" id="massage-oui" />
                    <Label htmlFor="massage-oui" className="font-normal">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non" id="massage-non" />
                    <Label htmlFor="massage-non" className="font-normal">Non</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 mt-4">
                <Label>Avez-vous actuellement un suivi médical ou des traitements en cours ?</Label>
                <RadioGroup value={suiviMedical} onValueChange={setSuiviMedical} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oui" id="suivi-oui" />
                    <Label htmlFor="suivi-oui" className="font-normal">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non" id="suivi-non" />
                    <Label htmlFor="suivi-non" className="font-normal">Non</Label>
                  </div>
                </RadioGroup>
                {suiviMedical === 'oui' && (
                  <Textarea placeholder="Si oui, précisez..." className="mt-2" />
                )}
              </div>
              <div className="space-y-2 mt-4">
                <Label>Avez-vous des contre-indications connues au massage (grossesse, blessures, maladies chroniques, troubles circulatoires, allergies cutanées…) ?</Label>
                <RadioGroup value={contreIndications} onValueChange={setContreIndications} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oui" id="ci-oui" />
                    <Label htmlFor="ci-oui" className="font-normal">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non" id="ci-non" />
                    <Label htmlFor="ci-non" className="font-normal">Non</Label>
                  </div>
                </RadioGroup>
                {contreIndications === 'oui' && (
                  <Textarea placeholder="Précisez si oui..." className="mt-2" />
                )}
              </div>
            </Section>

            <Section title="Partie 2 : État du moment" icon={Heart}>
               <p className="text-sm text-muted-foreground mb-4">Cochez ou notez ce qui vous correspond aujourd’hui</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Mon état physique actuel :</h4>
                  <CheckboxGroup namePrefix="physique" items={[
                    "Fatigue générale",
                    "Douleurs musculaires ou articulaires",
                    "Problèmes de circulation / jambes lourdes",
                    "Maux de tête / tension cervicales",
                    "Troubles digestifs / ballonnements",
                    "Stress / nervosité"
                  ]} />
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Mon état émotionnel du moment :</h4>
                  <CheckboxGroup namePrefix="emotionnel" items={[
                    "Calme mais besoin de détente plus profonde",
                    "Stress / anxiété / agitation",
                    "Mélancolie / tristesse / manque d’énergie",
                    "Colère / irritabilité",
                    "Besoin de clarté mentale / concentration",
                    "Ouverture spirituelle / envie d’ancrage"
                  ]} />
                </div>
              </div>
            </Section>

            <Section title="Partie 3 : Orientation plantes & fleurs locales" icon={Droplets}>
              <p className="text-sm text-muted-foreground mb-6">Selon vos choix ci-dessus, les plantes seront sélectionnées pour le bain, le cataplasme ou la synergie énergétique du massage.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                <div>
                  <h4 className="font-medium mb-3 text-foreground">👉 Pour la détente nerveuse et calmer l’esprit</h4>
                  <CheckboxGroup namePrefix="detente" items={["Fleur de Tilleul pays", "Fleurs de Frangipanier", "Verveine tropicale"]} />
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-foreground">👉 Pour la fatigue et le manque d’énergie</h4>
                  <CheckboxGroup namePrefix="energie" items={["Bois d’Inde (feuilles)", "Moringa (feuilles fraîches ou poudre)", "Fleur d’Hibiscus (groseille pays)"]} />
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-foreground">👉 Pour purifier, détoxifier et alléger</h4>
                  <CheckboxGroup namePrefix="purifier" items={["Feuille de Goyavier", "Argile rouge locale + Vétiver", "Feuille de Corossolier"]} />
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-foreground">👉 Pour les douleurs musculaires et articulaires</h4>
                  <CheckboxGroup namePrefix="douleurs" items={["Feuilles de Bois d’Inde (anti-inflammatoire)", "Feuilles de Citronnelle", "Curcuma frais (rhizome)"]} />
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-foreground">👉 Pour l’ancrage, recentrage émotionnel</h4>
                  <CheckboxGroup namePrefix="ancrage" items={["Racine de Vétiver", "Feuilles de Bananiers", "Bois d’Inde + Argile"]} />
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-foreground">👉 Pour ouvrir le cœur et harmoniser les émotions</h4>
                  <CheckboxGroup namePrefix="coeur" items={["Fleurs d’Hibiscus", "Fleurs de Frangipanier", "Fleur de Bougainvillier (douceur émotionnelle)"]} />
                </div>
              </div>
            </Section>
          </ScrollArea>

          <DialogFooter className="p-6 pt-4 bg-background/30">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-gradient-to-r from-primary to-accent text-white">
              Envoyer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MassageQuestionnaireModal;