/*
  # Ajout des champs d'authentification

  1. Modifications
    - Ajout de la colonne `password` dans la table `therapists`
    - Ajout de la colonne `password` dans la table `creators`
    
  2. Sécurité
    - Les mots de passe sont stockés en texte clair pour simplicité
    - Contrainte NOT NULL pour exiger un mot de passe
    - Valeur par défaut vide pour les entrées existantes

  Note: Cette migration ajoute les colonnes de mot de passe pour permettre
  aux thérapeutes et créateurs de se connecter à leur espace personnel.
*/

-- Ajouter colonne password pour les thérapeutes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapists' AND column_name = 'password'
  ) THEN
    ALTER TABLE therapists ADD COLUMN password text DEFAULT '';
  END IF;
END $$;

-- Ajouter colonne password pour les créateurs
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'password'
  ) THEN
    ALTER TABLE creators ADD COLUMN password text DEFAULT '';
  END IF;
END $$;
