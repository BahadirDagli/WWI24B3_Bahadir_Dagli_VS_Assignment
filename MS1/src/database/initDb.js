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

        db.get('SELECT COUNT(*) AS count FROM spieler', (err, row) => {
        if (err) {
            console.error('Fehler beim Prüfen der Demo-Daten:', err.message);
            return;
        }

        if (row.count === 0) {
            db.run(`
                INSERT INTO spieler (username, email) VALUES
                ('MaxGamer', 'max@example.com'),
                ('LenaZockt', 'lena@example.com'),
                ('NoahPlays', 'noah@example.com')
            `);

            db.run(`
                INSERT INTO level (name, schwierigkeit, laenge) VALUES
                ('Bloodbath', 'extremedemon', 120),
                ('Shiver', 'easydemon', 300),
                ('Greif', 'insane', 500)
            `);

           // Demo-Daten für spielrunde vorerst deaktiviert
        // db.run(`
        //     INSERT INTO spielrunde (spielerId, levelId, erreichteProzente) VALUES
        //     (1, 1, 85),
        //     (2, 2, 60),
        //     (3, 3, 40)
        // `);

            console.log('Demo-Daten eingefügt');
        }
    });
    

    console.log('Tabellen wurden geprüft/erstellt');
});