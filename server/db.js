/**
 * Database client — Supabase JS SDK (@supabase/supabase-js).
 * Uses SUPABASE_URL + SUPABASE_ANON_KEY, which you add manually in
 * Vercel → Project Settings → Environment Variables.
 *
 * The Supabase JS client handles connection pooling, SSL, and retries
 * automatically — no pg/SSL config needed.
 */
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL      = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('[db] FATAL: SUPABASE_URL and/or SUPABASE_ANON_KEY environment variables are not set.');
} else {
  console.log(`[db] Supabase client initialised for: ${SUPABASE_URL}`);
}

const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

const db = {
  /** Get all check-ins, newest first */
  async getAll() {
    const { data, error } = await supabase
      .from('check_ins')
      .select('*')
      .order('date', { ascending: false });
    if (error) {
      console.error('[db] getAll error:', error.message, error.code);
      throw error;
    }
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
    if (error) {
      console.error('[db] getByUserDate error:', error.message, error.code);
      throw error;
    }
    return data || null;
  },

  /** Insert a new check-in */
  async insert(record) {
    const { data, error } = await supabase
      .from('check_ins')
      .insert({ ...record, created_at: new Date().toISOString() })
      .select()
      .single();
    if (error) {
      console.error('[db] insert error:', error.message, error.code);
      throw error;
    }
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
    if (error) {
      console.error('[db] update error:', error.message, error.code);
      throw error;
    }
    return data;
  },
};

module.exports = db;
