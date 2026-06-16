DROP POLICY IF EXISTS "authenticated read reviews" ON public.reviews;
CREATE POLICY "public read reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (true);
GRANT SELECT ON public.reviews TO anon;

CREATE OR REPLACE FUNCTION public.lookup_coupon(_code text)
RETURNS TABLE(code text, discount_type text, discount_value numeric, min_order numeric, expires_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT code, discount_type, discount_value, min_order, expires_at
  FROM public.coupons
  WHERE upper(code) = upper(_code)
    AND is_active = true
    AND (expires_at IS NULL OR expires_at >= now())
    AND (usage_limit IS NULL OR used_count < usage_limit)
  LIMIT 1
$$;
GRANT EXECUTE ON FUNCTION public.lookup_coupon(text) TO anon, authenticated;
REVOKE SELECT ON public.coupons FROM anon;