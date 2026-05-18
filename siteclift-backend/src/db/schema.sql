-- Users — everyone who signs up to Siteclift
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  full_name TEXT,
  google_id TEXT,
  plan TEXT DEFAULT 'free',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Themes — all themes in the marketplace
CREATE TABLE IF NOT EXISTS themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  preview_url TEXT,
  thumbnail_url TEXT,
  demo_url TEXT,
  author_id UUID REFERENCES users(id),
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Websites — every site a user builds on Siteclift
CREATE TABLE IF NOT EXISTS websites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE,
  custom_domain TEXT UNIQUE,
  domain_verified BOOLEAN DEFAULT false,
  current_theme_id UUID REFERENCES themes(id),
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Website content — the actual content of each website
CREATE TABLE IF NOT EXISTS website_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  section TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Theme purchases — which users bought which themes
CREATE TABLE IF NOT EXISTS theme_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  purchased_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, theme_id)
);

-- Theme reviews — ratings and reviews on themes
CREATE TABLE IF NOT EXISTS theme_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, theme_id)
);

-- Theme switch history — tracks every time a user switches themes
CREATE TABLE IF NOT EXISTS theme_switches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  from_theme_id UUID REFERENCES themes(id),
  to_theme_id UUID REFERENCES themes(id),
  switched_at TIMESTAMPTZ DEFAULT now()
);