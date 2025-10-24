/*
  # Add surnom field and remove mantra field from therapists table

  1. Changes
    - Add `surnom` column to store therapist's nickname or artist name
    - Remove `mantra` column as it's now merged with vibrational_phrase

  2. Notes
    - This migration is safe as it only adds a new optional field
    - The mantra field was optional and is being removed after merging its purpose with vibrational_phrase
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapists' AND column_name = 'surnom'
  ) THEN
    ALTER TABLE therapists ADD COLUMN surnom text;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapists' AND column_name = 'mantra'
  ) THEN
    ALTER TABLE therapists DROP COLUMN mantra;
  END IF;
END $$;
