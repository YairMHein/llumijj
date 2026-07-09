
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

DROP POLICY "anyone can insert contact" ON public.contact_messages;
CREATE POLICY "anyone can insert contact" ON public.contact_messages
  FOR INSERT WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 255
    AND char_length(message) BETWEEN 1 AND 2000
  );
