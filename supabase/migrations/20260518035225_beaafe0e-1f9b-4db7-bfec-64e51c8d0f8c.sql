-- Constrain orders.status to known values, force preorder on insert
ALTER TABLE public.orders
  ADD CONSTRAINT orders_status_check
  CHECK (status IN ('preorder', 'processing', 'shipped', 'completed', 'cancelled'));

DROP POLICY IF EXISTS "own orders insert" ON public.orders;
CREATE POLICY "own orders insert" ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id AND status = 'preorder');

-- Lock down product-photos storage: public can read, only service role writes
CREATE POLICY "product photos public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-photos');

CREATE POLICY "product photos service write"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'product-photos');

CREATE POLICY "product photos service update"
  ON storage.objects FOR UPDATE
  TO service_role
  USING (bucket_id = 'product-photos');

CREATE POLICY "product photos service delete"
  ON storage.objects FOR DELETE
  TO service_role
  USING (bucket_id = 'product-photos');