/*
  # Add Availability Days to Therapists

  1. Changes
    - Add `availability_days` JSONB column to `therapists` table to store days when therapist is available
  
  2. Details
    - Column stores array of days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    - Nullable field (optional for therapists)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapists' AND column_name = 'availability_days'
  ) THEN
    ALTER TABLE therapists ADD COLUMN availability_days JSONB DEFAULT NULL;
  END IF;
END $$;
