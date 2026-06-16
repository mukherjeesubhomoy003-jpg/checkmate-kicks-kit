
CREATE TABLE public.jersey_stock (
  id text PRIMARY KEY,
  stock integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.jersey_stock TO anon, authenticated;
GRANT ALL ON public.jersey_stock TO service_role;

ALTER TABLE public.jersey_stock ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read jersey stock" ON public.jersey_stock
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public update jersey stock" ON public.jersey_stock
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

INSERT INTO public.jersey_stock (id, stock)
SELECT 'j' || lpad(g::text, 2, '0'), 10
FROM generate_series(1, 46) g;
