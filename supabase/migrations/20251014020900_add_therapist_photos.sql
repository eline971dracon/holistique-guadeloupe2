/*
  # Add Photos to Therapists Table

  1. Changes
    - Add `profile_photo_url` column for optional profile photo (replaces portrait_photo_url)
    - Add `practice_photos` JSONB array column for storing multiple practice/space photos (minimum 4)
    - Keep `art_photo_url` for backward compatibility
  
  2. Notes
    - Practice photos will be stored as JSON array of URLs
    - Profile photo is optional
    - Maintains backward compatibility by keeping existing data
*/

-- Add new columns for photos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapists' AND column_name = 'practice_photos'
  ) THEN
    ALTER TABLE therapists ADD COLUMN practice_photos jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Migrate existing portrait_photo_url to profile_photo_url if needed
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapists' AND column_name = 'profile_photo_url'
  ) THEN
    ALTER TABLE therapists ADD COLUMN profile_photo_url text;
    
    -- Copy data from portrait_photo_url to profile_photo_url
    UPDATE therapists 
    SET profile_photo_url = portrait_photo_url
    WHERE portrait_photo_url IS NOT NULL;
  END IF;
END $$;

-- Migrate existing art_photo_url to practice_photos array if it exists
UPDATE therapists 
SET practice_photos = jsonb_build_array(art_photo_url)
WHERE art_photo_url IS NOT NULL 
  AND (practice_photos IS NULL OR practice_photos = '[]'::jsonb);
