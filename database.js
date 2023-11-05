const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE);

//CREATE VIDEOFILE TABLE
try {
  db.prepare(`CREATE TABLE videofile(
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
  const statement = db.prepare(`INSERT OR IGNORE INTO videofile (filename, duration, is_fav, is _del) VALUES (?, ?, ?, ?)`);

  const info = statement.run(filename, duration, 0, 0);
  return info.changes
}

module.exports = {
  db,
  addToDb,
};