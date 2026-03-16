/**
 * GET /api/health — connectivity diagnostic, no auth required.
 * Tests Supabase connection and returns status.
 */
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(500).json({
      status: 'error',
      reason: 'SUPABASE_URL or SUPABASE_ANON_KEY environment variable is not set',
    });
  }

  try {
    const supabase = createClient(url, key);
    // A lightweight query that doesn't require the check_ins table to exist
    const { error } = await supabase.from('check_ins').select('id').limit(1);
    if (error) throw error;
    res.json({ status: 'ok', db: 'connected', project: new URL(url).hostname });
  } catch (err) {
    res.status(500).json({ status: 'error', reason: err.message, code: err.code });
  }
};
