/**
 * Pure-JS JSON file store — no native compilation needed.
 * Stores all check-in data in server/data.json
 */
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

function load() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {
    // corrupt file — start fresh
  }
  return { check_ins: [], nextId: 1 };
}

function save(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const db = {
  /** Get all check-ins, newest first */
  getAll() {
    return load().check_ins.slice().sort((a, b) => b.date.localeCompare(a.date));
  },

  /** Get one check-in by user + date */
  getByUserDate(user, date) {
    const { check_ins } = load();
    return check_ins.find(e => e.user === user && e.date === date) || null;
  },

  /** Insert a new check-in */
  insert(record) {
    const data = load();
    const entry = { id: data.nextId++, ...record, created_at: new Date().toISOString() };
    data.check_ins.push(entry);
    save(data);
    return entry;
  },

  /** Update an existing check-in by user + date */
  update(user, date, fields) {
    const data = load();
    const idx = data.check_ins.findIndex(e => e.user === user && e.date === date);
    if (idx === -1) return null;
    data.check_ins[idx] = { ...data.check_ins[idx], ...fields, created_at: new Date().toISOString() };
    save(data);
    return data.check_ins[idx];
  },
};

module.exports = db;
