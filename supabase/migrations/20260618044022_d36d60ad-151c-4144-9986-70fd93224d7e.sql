
CREATE OR REPLACE FUNCTION public.next_jersey_order_number()
RETURNS text
LANGUAGE sql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 'CHKM-' || lpad(nextval('public.jersey_order_seq')::text, 4, '0');
$$;

GRANT EXECUTE ON FUNCTION public.next_jersey_order_number() TO anon, authenticated, service_role;
