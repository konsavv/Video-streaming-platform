const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE);
const tableExists = db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='videofile'`);

//CREATE VIDEOFILE TABLE
try {
  //CHECK IF THE TABLE ALREADY EXISTS IN DB
  if (!tableExists) {
    db.prepare(`CREATE TABLE videofile(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              filename text UNIQUE,
              duration text,
              is_fav integer,
              is_del integer
              )`).run();
  }
} catch (error) {
  console.log("error occured in create table step", error)
}

// INSERT A NEW VIDEO INTO THE TABLE
function addToDb(filename, duration) {
  const statement = db.prepare(`INSERT OR IGNORE INTO videofile (filename, duration, is_fav, is_del) VALUES (?, ?, ?, ?)`);

  const info = statement.run(filename, duration, 0, 0);
  return info.changes
}

function getAllFiles() {
  return db.prepare(`SELECT * FROM videofile WHERE is_fav=0 AND is_del=0`).all()
}
function getFavFiles() {
  return db.prepare(`SELECT * FROM videofile WHERE is_fav=1`).all()
}
function getDelFiles() {
  return db.prepare(`SELECT * FROM videofile WHERE is_del=1`).all()
}

module.exports = {
  db,
  addToDb,
  getAllFiles,
  getFavFiles,
  getDelFiles
};