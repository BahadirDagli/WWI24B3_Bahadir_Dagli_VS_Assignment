const db = require('../config/db');

function getAllSpieler(searchTerm) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM spieler';
        let params = [];

        if (searchTerm) {
            sql += ' WHERE LOWER(username) LIKE ? OR LOWER(email) LIKE ?';
            const searchValue = `%${searchTerm.toLowerCase()}%`;
            params = [searchValue, searchValue];
        }

        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(rows);
        });
    });
}

function getSpielerById(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM spieler WHERE spielerId = ?';

        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(row);
        });
    });
}

function createSpieler(username, email) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO spieler (username, email)
            VALUES (?, ?)
        `;

        db.run(sql, [username, email], function (err) {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                spielerId: this.lastID,
                username,
                email
            });
        });
    });
}

module.exports = {
    getAllSpieler,
    getSpielerById,
    createSpieler
};