/*
  # Create Therapists Registration Table

  1. New Tables
    - `therapists`
      - `id` (uuid, primary key)
      - `name` (text) - Nom complet du thérapeute
      - `email` (text, unique) - Email de contact
      - `phone` (text) - Numéro de téléphone
      - `commune` (text) - Commune en Guadeloupe
      - `reliance_directe` (text) - Comment entrer en reliance directe
      - `presence_inspirante` (text) - Présence inspirante en 3 mots
      - `vibrational_phrase` (text) - Phrase vibratoire
      - `mission` (text) - Mission/Raison d'être
      - `approach` (text) - Approche thérapeutique
      - `message_bienvenue` (text) - Message de bienvenue
      - `mantra` (text) - Mantra personnel
      - `portrait_photo_url` (text) - URL de la photo portrait
      - `art_photo_url` (text) - URL de la photo d'art
      - `elements` (jsonb) - Éléments sélectionnés (Terre, Eau, Feu, Air, Éther)
      - `experiences` (jsonb) - Expériences proposées par catégorie
      - `intentions` (jsonb) - Intentions supportées
      - `durations` (jsonb) - Durées disponibles
      - `locations` (jsonb) - Lieux préférés
      - `is_approved` (boolean) - Statut d'approbation
      - `created_at` (timestamptz) - Date de création
      - `updated_at` (timestamptz) - Date de modification

  2. Security
    - Enable RLS on `therapists` table
    - Add policy for public read access to approved therapists
    - Add policy for therapists to read their own data
    - Add policy for anyone to insert (registration)
*/

CREATE TABLE IF NOT EXISTS therapists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  commune text NOT NULL,
  reliance_directe text,
  presence_inspirante text,
  vibrational_phrase text,
  mission text,
  approach text,
  message_bienvenue text,
  mantra text,
  portrait_photo_url text,
  art_photo_url text,
  elements jsonb DEFAULT '[]'::jsonb,
  experiences jsonb DEFAULT '{}'::jsonb,
  intentions jsonb DEFAULT '[]'::jsonb,
  durations jsonb DEFAULT '[]'::jsonb,
  locations jsonb DEFAULT '[]'::jsonb,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register as therapist"
  ON therapists
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can view approved therapists"
  ON therapists
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

CREATE POLICY "Therapists can view their own data"
  ON therapists
  FOR SELECT
  TO authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Therapists can update their own data"
  ON therapists
  FOR UPDATE
  TO authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email')
  WITH CHECK (email = current_setting('request.jwt.claims', true)::json->>'email');
