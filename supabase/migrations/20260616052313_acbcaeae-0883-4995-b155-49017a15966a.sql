DROP POLICY IF EXISTS "own order items insert" ON public.order_items;

CREATE POLICY "admins read all orders"
ON public.orders FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));