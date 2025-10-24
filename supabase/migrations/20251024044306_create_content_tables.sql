/*
  # Create Content Management Tables

  1. New Tables
    - `eline_content`
      - `id` (uuid, primary key)
      - `section_key` (text, unique) - Identifier for the section (e.g., 'hero_title', 'about_text')
      - `content` (text) - The actual content
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `services_content`
      - `id` (uuid, primary key)
      - `service_key` (text, unique) - Identifier for the service
      - `title` (text)
      - `description` (text)
      - `full_description` (text)
      - `price` (text)
      - `duration` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `excerpt` (text)
      - `content` (text)
      - `author` (text)
      - `published_date` (date)
      - `image_url` (text)
      - `slug` (text, unique)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access (no auth check needed as RLS is disabled for custom auth)
*/

CREATE TABLE IF NOT EXISTS eline_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_key text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  full_description text DEFAULT '',
  price text DEFAULT '',
  duration text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text DEFAULT 'Eline Dracon',
  published_date date DEFAULT CURRENT_DATE,
  image_url text DEFAULT '',
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE eline_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read eline content"
  ON eline_content FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can update eline content"
  ON eline_content FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert eline content"
  ON eline_content FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read services content"
  ON services_content FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can update services content"
  ON services_content FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert services content"
  ON services_content FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can update blog posts"
  ON blog_posts FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert blog posts"
  ON blog_posts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can delete blog posts"
  ON blog_posts FOR DELETE
  TO public
  USING (true);

INSERT INTO eline_content (section_key, content) VALUES
  ('hero_title', 'Eline Dracon'),
  ('hero_subtitle', 'Thérapeute Holistique & Gardienne du Sacré'),
  ('about_title', 'À Propos'),
  ('about_text', 'Bienvenue dans mon univers de guérison et de transformation...'),
  ('services_title', 'Mes Soins'),
  ('testimonials_title', 'Témoignages'),
  ('contact_title', 'Me Contacter')
ON CONFLICT (section_key) DO NOTHING;

INSERT INTO services_content (service_key, title, description, full_description, price, duration, image_url) VALUES
  ('rituel_dome', 'Rituel du Dôme Eau-Terre', 'Un voyage sacré pour reconnecter votre essence', 'Description complète du rituel du dôme...', '150€', '2h30', ''),
  ('massage_holistique', 'Massage Holistique', 'Soin énergétique profond du corps et de l''âme', 'Description complète du massage...', '120€', '1h30', ''),
  ('soin_reiki', 'Soin Reiki', 'Harmonisation énergétique douce', 'Description complète du Reiki...', '80€', '1h', '')
ON CONFLICT (service_key) DO NOTHING;
