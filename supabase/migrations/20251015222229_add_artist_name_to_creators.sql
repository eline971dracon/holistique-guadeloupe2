/*
  # Ajouter le champ Nom d'Artiste aux créateurs

  1. Modifications
    - Ajout de la colonne `artist_name` à la table `creators`
      - Type: text
      - Nullable: true (optionnel)
      - Description: Le nom de scène ou signature artistique du créateur

  2. Notes
    - Ce champ permet aux artistes d'avoir un nom professionnel différent de leur nom civil
    - Le champ est optionnel pour ne pas bloquer les inscriptions existantes
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'artist_name'
  ) THEN
    ALTER TABLE creators ADD COLUMN artist_name text;
  END IF;
END $$;
