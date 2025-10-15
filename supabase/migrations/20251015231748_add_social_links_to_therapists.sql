/*
  # Add Social Links to Therapists

  1. Changes
    - Add `social_links` JSONB column to `therapists` table to store Instagram, Facebook, and personal website links
  
  2. Details
    - Column stores flexible JSON data with keys: instagram, facebook, website
    - Nullable field (optional for therapists)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapists' AND column_name = 'social_links'
  ) THEN
    ALTER TABLE therapists ADD COLUMN social_links JSONB DEFAULT NULL;
  END IF;
END $$;
