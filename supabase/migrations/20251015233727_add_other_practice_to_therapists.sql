/*
  # Add Other Practice Field to Therapists

  1. Changes
    - Add `other_practice` text column to `therapists` table for custom practices not in the predefined list
  
  2. Details
    - Column stores custom practice text
    - Nullable field (optional for therapists)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapists' AND column_name = 'other_practice'
  ) THEN
    ALTER TABLE therapists ADD COLUMN other_practice TEXT DEFAULT NULL;
  END IF;
END $$;
