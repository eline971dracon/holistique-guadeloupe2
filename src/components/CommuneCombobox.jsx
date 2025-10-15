import React, { useState, useMemo } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const guadeloupeCommunes = [
  "Les Abymes", "Anse-Bertrand", "Baie-Mahault", "Baillif", "Basse-Terre",
  "Bouillante", "Capesterre-Belle-Eau", "Capesterre-de-Marie-Galante",
  "Deshaies", "La Désirade", "Le Gosier", "Gourbeyre", "Grand-Bourg",
  "Lamentin", "Morne-à-l'Eau", "Le Moule", "Petit-Bourg", "Petit-Canal",
  "Pointe-à-Pitre", "Pointe-Noire", "Port-Louis", "Saint-Claude",
  "Saint-François", "Saint-Louis", "Sainte-Anne", "Sainte-Rose",
  "Terre-de-Bas", "Terre-de-Haut", "Trois-Rivières", "Vieux-Fort", "Vieux-Habitants"
];

export const CommuneCombobox = ({ value, onChange, className }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunes = useMemo(() => {
    if (!searchQuery) return guadeloupeCommunes;

    const query = searchQuery.toLowerCase();
    return guadeloupeCommunes.filter(commune =>
      commune.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelect = (commune) => {
    onChange(commune);
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn(
          "w-full justify-between h-12 text-lg",
          !value && "text-muted-foreground",
          className
        )}
        onClick={() => setOpen(!open)}
      >
        {value || "Sélectionnez votre commune"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute z-50 w-full mt-2 bg-background border rounded-lg shadow-lg max-h-80 overflow-hidden">
            <div className="p-2 border-b sticky top-0 bg-background">
              <Input
                placeholder="Rechercher une commune..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10"
                autoFocus
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filteredCommunes.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Aucune commune trouvée
                </div>
              ) : (
                <div className="p-1">
                  {filteredCommunes.map((commune) => (
                    <button
                      key={commune}
                      type="button"
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors flex items-center justify-between",
                        value === commune && "bg-accent"
                      )}
                      onClick={() => handleSelect(commune)}
                    >
                      <span>{commune}</span>
                      {value === commune && (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
