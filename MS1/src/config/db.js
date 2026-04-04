const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der Datenbank:', err.message);
    } else {
        console.log('SQLite verbunden');
    }
});

db.run('PRAGMA foreign_keys = ON');

module.exports = db;