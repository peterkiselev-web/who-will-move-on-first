/**
 * Supabase (PostgreSQL) database client.
 * Replaces the old JSON file store — all methods are now async.
 */
const { createClient } = require('@supabase/supabase-js');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn('[db] SUPABASE_URL / SUPABASE_ANON_KEY not set — database calls will fail.');
}

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

const db = {
  /** Get all check-ins, newest first */
  async getAll() {
    const { data, error } = await supabase
      .from('check_ins')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  /** Get one check-in by user + date (returns null if not found) */
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

  /** Insert a new check-in */
  async insert(record) {
    const { data, error } = await supabase
      .from('check_ins')
      .insert({ ...record, created_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Update an existing check-in by user + date */
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
