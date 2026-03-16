/**
 * PostgreSQL client via node-postgres (pg).
 * Connects using the POSTGRES_URL connection string automatically
 * injected by Vercel's Supabase integration.
 *
 * IMPORTANT: We intentionally parse the URL into individual params instead
 * of passing connectionString directly. When pg receives a connection string
 * that contains "?sslmode=require", it builds its own SSL config from that
 * param and ignores our ssl:{} object — which causes the
 * "SELF_SIGNED_CERT_IN_CHAIN" error on Vercel. Passing individual params
 * gives us full, unambiguous control over the SSL settings.
 */
const { Pool } = require('pg');

const POSTGRES_URL = process.env.POSTGRES_URL;

if (!POSTGRES_URL) {
  console.error('[db] FATAL: POSTGRES_URL environment variable is not set.');
}

// Parse the connection URL into discrete parts so pg never reads sslmode
// from the query string and our ssl config is always authoritative.
let poolConfig;
try {
  const u = new URL(POSTGRES_URL || 'postgresql://localhost/dev');
  poolConfig = {
    host:     u.hostname,
    port:     parseInt(u.port, 10) || 5432,
    database: u.pathname.replace(/^\//, ''),
    user:     decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    // rejectUnauthorized:false bypasses Supabase's self-signed CA cert —
    // the connection is still encrypted, we just skip chain verification.
    ssl: { rejectUnauthorized: false },
    idleTimeoutMillis:    10_000,
    connectionTimeoutMillis: 10_000,
  };
  console.log(`[db] Connecting to PostgreSQL: ${u.hostname}:${poolConfig.port}/${poolConfig.database}`);
} catch (err) {
  console.error('[db] Failed to parse POSTGRES_URL:', err.message);
  poolConfig = {};
}

const pool = new Pool(poolConfig);

// Surface pool-level errors in Vercel function logs
pool.on('error', (err) => {
  console.error('[db] Unexpected pool error:', err.message, err.code);
});

// Verify connectivity on startup (non-fatal — just logs)
pool.query('SELECT 1').then(() => {
  console.log('[db] PostgreSQL connection verified OK.');
}).catch((err) => {
  console.error('[db] Connection test FAILED:', err.message, { code: err.code });
});

/** Query wrapper — logs full error context before re-throwing */
async function query(sql, params) {
  try {
    return await pool.query(sql, params);
  } catch (err) {
    console.error('[db] Query error:', {
      message: err.message,
      code:    err.code,
      detail:  err.detail,
      hint:    err.hint,
      sql:     sql.replace(/\s+/g, ' ').trim(),
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
