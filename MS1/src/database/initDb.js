const db = require('../config/db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS spieler (
            spielerId INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS level (
            levelId INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            schwierigkeit TEXT NOT NULL,
            laenge INTEGER NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS spielrunde (
            rundenId INTEGER PRIMARY KEY AUTOINCREMENT,
            spielerId INTEGER NOT NULL,
            levelId INTEGER NOT NULL,
            erreichteProzente INTEGER NOT NULL,
            FOREIGN KEY (spielerId) REFERENCES spieler(spielerId) ON DELETE RESTRICT,
            FOREIGN KEY (levelId) REFERENCES level(levelId) ON DELETE RESTRICT
        )
    `);

    console.log('Tabellen wurden geprüft/erstellt');
});