// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xcptammszakojyoqxwnp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjcHRhbW1zemFrb2p5b3F4d25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxOTU2NjIsImV4cCI6MjA2NTc3MTY2Mn0.YHWhquu5dNUCeerIWJF8jO-b2JjE1qeTItgDC_qTr0I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);