/*
  # Add Social Links to Creators

  1. Changes
    - Add `social_links` JSONB column to `creators` table to store Instagram, Facebook, and personal website links
  
  2. Details
    - Column stores flexible JSON data with keys: instagram, facebook, website
    - Nullable field (optional for creators)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'social_links'
  ) THEN
    ALTER TABLE creators ADD COLUMN social_links JSONB DEFAULT NULL;
  END IF;
END $$;
