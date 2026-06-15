
-- Coupons: remove broad authenticated read; only admins can read full rows. Checkout uses service role.
DROP POLICY IF EXISTS "active coupons read" ON public.coupons;

-- Product variants: tighten public read to variants of active products only.
DROP POLICY IF EXISTS "public read variants" ON public.product_variants;
CREATE POLICY "public read variants of active products"
ON public.product_variants FOR SELECT
TO anon, authenticated
USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_variants.product_id AND p.is_active = true));

-- User roles: add explicit admin-only INSERT/DELETE policies (defense in depth).
CREATE POLICY "admins insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
