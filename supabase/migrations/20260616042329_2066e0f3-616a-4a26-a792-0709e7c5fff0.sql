
-- Reviews: remove anon read access (server reads use service role; signed-in users still see reviews)
DROP POLICY IF EXISTS "public read reviews" ON public.reviews;
CREATE POLICY "authenticated read reviews"
  ON public.reviews
  FOR SELECT
  TO authenticated
  USING (true);

-- user_roles: explicit admin-only UPDATE policy
DROP POLICY IF EXISTS "admins update roles" ON public.user_roles;
CREATE POLICY "admins update roles"
  ON public.user_roles
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
