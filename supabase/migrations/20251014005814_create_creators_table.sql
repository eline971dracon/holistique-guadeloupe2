/*
  # Create Creators/Artists Registration Table

  1. New Tables
    - `creators`
      - `id` (uuid, primary key)
      - `name` (text) - Nom complet du créateur
      - `email` (text, unique) - Email de contact
      - `phone` (text) - Numéro de téléphone
      - `commune` (text) - Commune en Guadeloupe
      - `art_type` (text) - Type d'art/création
      - `description` (text) - Description de la démarche artistique
      - `inspiration` (text) - Sources d'inspiration
      - `message` (text) - Message additionnel
      - `portfolio_url` (text) - URL du portfolio
      - `is_approved` (boolean) - Statut d'approbation
      - `created_at` (timestamptz) - Date de création
      - `updated_at` (timestamptz) - Date de modification

  2. Security
    - Enable RLS on `creators` table
    - Add policy for public read access to approved creators
    - Add policy for creators to read their own data
    - Add policy for anyone to insert (registration)
*/

CREATE TABLE IF NOT EXISTS creators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  commune text NOT NULL,
  art_type text NOT NULL,
  description text,
  inspiration text,
  message text,
  portfolio_url text,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE creators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register as creator"
  ON creators
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can view approved creators"
  ON creators
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

CREATE POLICY "Creators can view their own data"
  ON creators
  FOR SELECT
  TO authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Creators can update their own data"
  ON creators
  FOR UPDATE
  TO authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email')
  WITH CHECK (email = current_setting('request.jwt.claims', true)::json->>'email');
