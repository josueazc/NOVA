import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://knjyovglyyxnbqwuorag.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuanlvdmdseXl4bmJxd3VvcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyODI0ODcsImV4cCI6MjA5Mzg1ODQ4N30.8-WPTeYs_C-8EFommFVrdIjHfA1TZErImB-V0ai97n4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDB() {
  console.log('Checking posts table...');
  const { data: posts, error: postError } = await supabase.from('posts').select('*').limit(1);
  if (postError) {
    console.error('Error fetching posts:', postError.message);
  } else {
    console.log('Posts table exists, count:', posts.length);
  }

  console.log('Checking profiles table...');
  const { data: profiles, error: profileError } = await supabase.from('profiles').select('*').limit(1);
  if (profileError) {
    console.error('Error fetching profiles:', profileError.message);
  } else {
    console.log('Profiles table exists, count:', profiles.length);
  }
}

checkDB();
