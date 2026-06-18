
-- ============ Per-size stock ============
CREATE TABLE public.jersey_size_stock (
  jersey_id text NOT NULL,
  size text NOT NULL CHECK (size IN ('S','M','L','XL','XXL')),
  stock int NOT NULL DEFAULT 0 CHECK (stock >= 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (jersey_id, size)
);

GRANT SELECT ON public.jersey_size_stock TO anon, authenticated;
GRANT ALL ON public.jersey_size_stock TO service_role;
ALTER TABLE public.jersey_size_stock ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read size stock"
  ON public.jersey_size_stock FOR SELECT TO anon, authenticated USING (true);

-- Seed 46 jerseys × 5 sizes with default stock 5
INSERT INTO public.jersey_size_stock (jersey_id, size, stock)
SELECT 'j' || lpad(g::text, 2, '0'), s, 5
FROM generate_series(1, 46) g
CROSS JOIN (VALUES ('S'),('M'),('L'),('XL'),('XXL')) AS sizes(s)
ON CONFLICT DO NOTHING;

-- ============ Sequential order number ============
CREATE SEQUENCE public.jersey_order_seq START 1 INCREMENT 1;
GRANT USAGE, SELECT ON SEQUENCE public.jersey_order_seq TO anon, authenticated, service_role;

-- ============ Orders ============
CREATE TABLE public.jersey_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  buyer_name text NOT NULL,
  buyer_phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  pincode text NOT NULL,
  landmark text,
  post_office text,
  item_name text NOT NULL,
  kit text,
  size text NOT NULL,
  qty int NOT NULL DEFAULT 1 CHECK (qty > 0),
  unit_price int NOT NULL,
  printing_name text,
  printing_number text,
  printing_fee int NOT NULL DEFAULT 0,
  total int NOT NULL,
  payment_status text NOT NULL DEFAULT 'awaiting_screenshot',
  dispatch_status text NOT NULL DEFAULT 'pending' CHECK (dispatch_status IN ('pending','ready','dispatched','delivered','cancelled')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT, SELECT ON public.jersey_orders TO anon, authenticated;
GRANT ALL ON public.jersey_orders TO service_role;
ALTER TABLE public.jersey_orders ENABLE ROW LEVEL SECURITY;

-- Anyone may create an order row (checkout is public)
CREATE POLICY "Anyone can place an order"
  ON public.jersey_orders FOR INSERT TO anon, authenticated WITH CHECK (true);

-- No public SELECT policy — admin reads go through service_role server functions

CREATE TRIGGER trg_jersey_orders_updated_at
  BEFORE UPDATE ON public.jersey_orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_jersey_orders_created_at ON public.jersey_orders (created_at DESC);
CREATE INDEX idx_jersey_orders_dispatch ON public.jersey_orders (dispatch_status);
