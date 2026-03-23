// Augment the supabase types to provide the missing Database type
declare module '@/integrations/supabase/types' {
  export type Database = any;
}
