-- Public buckets serve files via CDN without needing a SELECT policy.
-- Dropping the broad SELECT policy prevents API-level listing of all objects.
DROP POLICY IF EXISTS "product photos public read" ON storage.objects;