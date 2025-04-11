
import { createClient } from '@supabase/supabase-js';

// Default values for local development or when environment variables are missing
// These will be overridden by actual environment variables when available
const defaultSupabaseUrl = 'https://your-supabase-project-id.supabase.co';
const defaultSupabaseAnonKey = 'your-anon-key';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultSupabaseUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultSupabaseAnonKey;

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Using default values for development.');
  console.warn('Please set up your Supabase environment variables for proper functionality.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const saveUserProfile = async (profile: any) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user?.user?.id) {
    throw new Error('User not authenticated');
  }
  
  const { error } = await supabase
    .from('user_profiles')
    .upsert({
      id: user.user.id,
      ...profile,
      updated_at: new Date().toISOString(),
    });
  
  if (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
  
  // Also save to localStorage as backup and for non-authenticated states
  localStorage.setItem('userProfile', JSON.stringify(profile));
  
  return true;
};

export const getUserProfile = async () => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user?.user?.id) {
    // If not authenticated, try to get from localStorage
    const localProfile = localStorage.getItem('userProfile');
    return localProfile ? JSON.parse(localProfile) : null;
  }
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.user.id)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    // Fall back to localStorage if DB fetch fails
    const localProfile = localStorage.getItem('userProfile');
    return localProfile ? JSON.parse(localProfile) : null;
  }
  
  // Update localStorage with the latest data
  localStorage.setItem('userProfile', JSON.stringify(data));
  
  return data;
};

export const saveChecklistItems = async (items: any[]) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user?.user?.id) {
    // Save to localStorage if user is not authenticated
    localStorage.setItem('userChecklist', JSON.stringify(items));
    return;
  }
  
  // Prepare items for database with user_id
  const itemsWithUserId = items.map(item => ({
    ...item,
    user_id: user.user.id,
    updated_at: new Date().toISOString()
  }));
  
  // Use upsert to handle both create and update operations
  const { error } = await supabase
    .from('checklist_items')
    .upsert(itemsWithUserId, { 
      onConflict: 'user_id,item_id',
      ignoreDuplicates: false
    });
  
  if (error) {
    console.error('Error saving checklist items:', error);
    // Still save to localStorage as backup
    localStorage.setItem('userChecklist', JSON.stringify(items));
    throw error;
  }
  
  // Also save to localStorage for offline access
  localStorage.setItem('userChecklist', JSON.stringify(items));
  
  return true;
};

export const getChecklistItems = async () => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user?.user?.id) {
    // If not authenticated, try to get from localStorage
    const localChecklist = localStorage.getItem('userChecklist');
    return localChecklist ? JSON.parse(localChecklist) : [];
  }
  
  const { data, error } = await supabase
    .from('checklist_items')
    .select('*')
    .eq('user_id', user.user.id);
  
  if (error) {
    console.error('Error fetching checklist items:', error);
    // Fall back to localStorage if DB fetch fails
    const localChecklist = localStorage.getItem('userChecklist');
    return localChecklist ? JSON.parse(localChecklist) : [];
  }
  
  if (data && data.length > 0) {
    // Update localStorage with the latest data
    localStorage.setItem('userChecklist', JSON.stringify(data));
    return data;
  } else {
    // If no items in DB, try localStorage
    const localChecklist = localStorage.getItem('userChecklist');
    return localChecklist ? JSON.parse(localChecklist) : [];
  }
};
