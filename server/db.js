/**
 * PostgreSQL client via node-postgres (pg).
 * Connects using the POSTGRES_URL connection string automatically
 * injected by Vercel's Supabase integration.
 */
const { Pool } = require('pg');

if (!process.env.POSTGRES_URL) {
  console.warn('[db] POSTGRES_URL not set — database calls will fail.');
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  // Supabase requires SSL in production; skip cert verification for Vercel serverless
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const db = {
  /** Get all check-ins, newest first */
  async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM check_ins ORDER BY date DESC'
    );
    return rows;
  },

  /** Get one check-in by user + date (returns null if not found) */
  async getByUserDate(user, date) {
    const { rows } = await pool.query(
      'SELECT * FROM check_ins WHERE "user" = $1 AND date = $2',
      [user, date]
    );
    return rows[0] || null;
  },

  /** Insert a new check-in */
  async insert(record) {
    const { rows } = await pool.query(
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
    const { rows } = await pool.query(
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
