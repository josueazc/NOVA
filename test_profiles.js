import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://knjyovglyyxnbqwuorag.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuanlvdmdseXl4bmJxd3VvcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyODI0ODcsImV4cCI6MjA5Mzg1ODQ4N30.8-WPTeYs_C-8EFommFVrdIjHfA1TZErImB-V0ai97n4';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  console.log(data);
  console.log(error);
}
test();
