/**
 * Shared Supabase client for all serverless functions.
 * Files prefixed with _ are not treated as routes by Vercel.
 */
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL     || '',
  process.env.SUPABASE_ANON_KEY || ''
);

const db = {
  async getAll() {
    const { data, error } = await supabase
      .from('check_ins')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getByUserDate(user, date) {
    const { data, error } = await supabase
      .from('check_ins')
      .select('*')
      .eq('user', user)
      .eq('date', date)
      .maybeSingle();
    if (error) throw error;
    return data || null;
  },

  async insert(record) {
    const { data, error } = await supabase
      .from('check_ins')
      .insert({ ...record, created_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(user, date, fields) {
    const { data, error } = await supabase
      .from('check_ins')
      .update({ ...fields, created_at: new Date().toISOString() })
      .eq('user', user)
      .eq('date', date)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

module.exports = db;
