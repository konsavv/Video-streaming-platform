const Database = require("better-sqlite3");

const DBSOURCE = "db.sqlite";

const db = new Database(DBSOURCE);

// CREATE VIDEOFILE TABLE (only if it does not already exist)
try {
  db.prepare(`CREATE TABLE IF NOT EXISTS videofile(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              filename text UNIQUE,
              duration text,
              is_fav integer,
              is_del integer
              )`).run();
} catch (error) {
  console.log("error occured in create table step", error)
}

// INSERT A NEW VIDEO INTO THE TABLE
function addToDb(filename, duration) {
  const statement = db.prepare(`INSERT OR IGNORE INTO videofile (filename, duration, is_fav, is_del) VALUES (?, ?, ?, ?)`);
  const info = statement.run(filename, duration, 0, 0);
  return info.changes
}

// Home = every video that is not in the trash
function getAllFiles() {
  return db.prepare(`SELECT * FROM videofile WHERE is_del=0 ORDER BY id DESC`).all()
}
// Favorites = favorited videos that are not in the trash
function getFavFiles() {
  return db.prepare(`SELECT * FROM videofile WHERE is_fav=1 AND is_del=0 ORDER BY id DESC`).all()
}
// Trash = videos moved to the bin
function getDelFiles() {
  return db.prepare(`SELECT * FROM videofile WHERE is_del=1 ORDER BY id DESC`).all()
}

function getById(id) {
  return db.prepare(`SELECT * FROM videofile WHERE id=?`).get(id)
}

// Toggle the favorite flag; returns the new value (0/1) or null if not found
function toggleFav(id) {
  const row = getById(id);
  if (!row) return null;
  const next = row.is_fav ? 0 : 1;
  db.prepare(`UPDATE videofile SET is_fav=? WHERE id=?`).run(next, id);
  return next;
}

function moveToTrash(id) {
  return db.prepare(`UPDATE videofile SET is_del=1 WHERE id=?`).run(id).changes
}

function restore(id) {
  return db.prepare(`UPDATE videofile SET is_del=0 WHERE id=?`).run(id).changes
}

function deletePermanent(id) {
  return db.prepare(`DELETE FROM videofile WHERE id=?`).run(id).changes
}

module.exports = {
  db,
  addToDb,
  getAllFiles,
  getFavFiles,
  getDelFiles,
  getById,
  toggleFav,
  moveToTrash,
  restore,
  deletePermanent
};
