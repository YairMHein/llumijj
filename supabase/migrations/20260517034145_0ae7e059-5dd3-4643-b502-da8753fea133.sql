ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE public.products
  ADD CONSTRAINT products_category_check
  CHECK (category = ANY (ARRAY['earrings'::text, 'necklaces'::text, 'rings'::text, 'bracelets'::text]));

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS metal text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_new boolean DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_best_seller boolean DEFAULT false;

UPDATE public.products SET metal = 'Silver' WHERE metal IS NULL AND material ILIKE '%silver%';
UPDATE public.products SET metal = 'Gold'   WHERE metal IS NULL AND material ILIKE '%gold%';
UPDATE public.products SET metal = 'Blue'   WHERE metal IS NULL AND (name ILIKE '%sapphire%' OR name ILIKE '%crystal%');
UPDATE public.products SET metal = 'Silver' WHERE metal IS NULL;

UPDATE public.products SET is_best_seller = true WHERE slug IN ('pearl-hoop-earrings','solitaire-diamond-ring','crescent-pendant-necklace');
UPDATE public.products SET is_new = true WHERE slug IN ('layered-pearl-necklace','silver-stack-rings');

INSERT INTO public.products (slug, name, description, category, price, sale_price, image_url, material, metal, is_featured, is_new, is_best_seller)
VALUES
  ('pearl-chain-bracelet','Pearl Chain Bracelet','A delicate silver chain dotted with hand-selected freshwater pearls.','bracelets',26,NULL,'bracelet-1.jpg','Sterling Silver','Silver',true,true,false),
  ('crystal-tennis-bracelet','Crystal Tennis Bracelet','Cushion-cut crystals set on a slim 14k gold vermeil band.','bracelets',48,38,'bracelet-2.jpg','14k Gold Vermeil','Gold',true,false,true),
  ('silver-bangle','Polished Silver Bangle','A weighted sterling bangle with a high-polish finish.','bracelets',34,NULL,'bracelet-3.jpg','Sterling Silver','Silver',false,true,false)
ON CONFLICT (slug) DO NOTHING;