DROP POLICY IF EXISTS "public update jersey stock" ON public.jersey_stock;
DROP POLICY IF EXISTS "admin update jersey stock" ON public.jersey_stock;

REVOKE UPDATE ON public.jersey_stock FROM anon, authenticated;
GRANT SELECT ON public.jersey_stock TO anon, authenticated;
GRANT ALL ON public.jersey_stock TO service_role;

CREATE POLICY "admin update jersey stock"
ON public.jersey_stock
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "own order items insert" ON public.order_items;

CREATE POLICY "own order items insert"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.orders o
    WHERE o.id = order_id
      AND (o.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
  )
);

REVOKE EXECUTE ON FUNCTION public.lookup_coupon(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.lookup_coupon(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.lookup_coupon(text) TO postgres;