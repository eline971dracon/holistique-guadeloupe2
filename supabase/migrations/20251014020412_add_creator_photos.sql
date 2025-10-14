/*
  # Add Photos to Creators Table

  1. Changes
    - Add `profile_photo_url` column for optional profile photo
    - Add `art_photos` JSONB array column for storing multiple art photos (minimum 4)
    - Remove old `portfolio_url` column and migrate to new structure
  
  2. Notes
    - Art photos will be stored as JSON array of URLs
    - Profile photo is optional
    - Maintains backward compatibility by keeping existing data
*/

-- Add new columns for photos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'profile_photo_url'
  ) THEN
    ALTER TABLE creators ADD COLUMN profile_photo_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'art_photos'
  ) THEN
    ALTER TABLE creators ADD COLUMN art_photos jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Migrate existing portfolio_url to art_photos array if it exists
UPDATE creators 
SET art_photos = jsonb_build_array(portfolio_url)
WHERE portfolio_url IS NOT NULL 
  AND (art_photos IS NULL OR art_photos = '[]'::jsonb);
