/**
 * PostgreSQL client via node-postgres (pg).
 * Connects using the POSTGRES_URL connection string automatically
 * injected by Vercel's Supabase integration.
 *
 * SSL is ALWAYS enabled — Supabase requires it and Vercel does not
 * reliably set NODE_ENV=production on serverless functions.
 */
const { Pool } = require('pg');

const POSTGRES_URL = process.env.POSTGRES_URL;

if (!POSTGRES_URL) {
  console.error('[db] FATAL: POSTGRES_URL environment variable is not set.');
} else {
  // Log the host only (never log credentials)
  try {
    const { hostname, port } = new URL(POSTGRES_URL);
    console.log(`[db] Connecting to PostgreSQL host: ${hostname}:${port || 5432}`);
  } catch {
    console.warn('[db] Could not parse POSTGRES_URL to log host.');
  }
}

const pool = new Pool({
  connectionString: POSTGRES_URL,
  // Always enable SSL — Supabase requires it regardless of environment.
  // rejectUnauthorized:false is needed because Vercel's outbound TLS
  // chain doesn't always include Supabase's CA cert.
  ssl: { rejectUnauthorized: false },
  // Keep connections short-lived — safer for serverless cold starts.
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 10_000,
});

// Log pool-level errors so they appear in Vercel function logs
pool.on('error', (err) => {
  console.error('[db] Unexpected pool error:', err.message, err.stack);
});

// Verify the connection is reachable on startup (non-fatal — just logs)
pool.query('SELECT 1').then(() => {
  console.log('[db] PostgreSQL connection verified OK.');
}).catch((err) => {
  console.error('[db] PostgreSQL connection test FAILED:', err.message, {
    code: err.code,
    detail: err.detail,
    hint: err.hint,
  });
});

/** Thin query wrapper that logs errors with full context before re-throwing */
async function query(sql, params) {
  try {
    return await pool.query(sql, params);
  } catch (err) {
    console.error('[db] Query error:', {
      message: err.message,
      code: err.code,
      detail: err.detail,
      hint: err.hint,
      sql: sql.replace(/\s+/g, ' ').trim(),
    });
    throw err;
  }
}

const db = {
  /** Get all check-ins, newest first */
  async getAll() {
    const { rows } = await query('SELECT * FROM check_ins ORDER BY date DESC');
    return rows;
  },

  /** Get one check-in by user + date (returns null if not found) */
  async getByUserDate(user, date) {
    const { rows } = await query(
      'SELECT * FROM check_ins WHERE "user" = $1 AND date = $2',
      [user, date]
    );
    return rows[0] || null;
  },

  /** Insert a new check-in */
  async insert(record) {
    const { rows } = await query(
      `INSERT INTO check_ins
         ("user", date, feeling, went_on_date, ex_thoughts, social_life, glow_up, diary_note, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [
        record.user,
        record.date,
        record.feeling,
        record.went_on_date,
        record.ex_thoughts,
        record.social_life,
        record.glow_up,
        record.diary_note || null,
      ]
    );
    return rows[0];
  },

  /** Update an existing check-in by user + date */
  async update(user, date, fields) {
    const { rows } = await query(
      `UPDATE check_ins
       SET feeling      = $3,
           went_on_date = $4,
           ex_thoughts  = $5,
           social_life  = $6,
           glow_up      = $7,
           diary_note   = $8,
           created_at   = NOW()
       WHERE "user" = $1 AND date = $2
       RETURNING *`,
      [
        user,
        date,
        fields.feeling,
        fields.went_on_date,
        fields.ex_thoughts,
        fields.social_life,
        fields.glow_up,
        fields.diary_note || null,
      ]
    );
    return rows[0] || null;
  },
};

module.exports = db;
