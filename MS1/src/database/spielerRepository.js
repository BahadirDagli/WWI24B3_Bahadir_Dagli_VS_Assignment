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

function updateSpieler(id, updates) {
    return new Promise((resolve, reject) => {
        const fields = [];
        const values = [];

        if (updates.username !== undefined) {
            fields.push('username = ?');
            values.push(updates.username);
        }

        if (updates.email !== undefined) {
            fields.push('email = ?');
            values.push(updates.email);
        }

        if (fields.length === 0) {
            resolve(null);
            return;
        }

        values.push(id);

        const sql = `UPDATE spieler SET ${fields.join(', ')} WHERE spielerId = ?`;

        db.run(sql, values, function (err) {
            if (err) {
                reject(err);
                return;
            }

            if (this.changes === 0) {
                resolve(undefined);
                return;
            }

            db.get('SELECT * FROM spieler WHERE spielerId = ?', [id], (selectErr, row) => {
                if (selectErr) {
                    reject(selectErr);
                    return;
                }

                resolve(row);
            });
        });
    });
}

module.exports = {
    getAllSpieler,
    getSpielerById,
    createSpieler,
    updateSpieler
};