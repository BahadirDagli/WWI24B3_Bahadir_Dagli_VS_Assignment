const db = require('../config/db');

function getAllSpielrunden() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM spielrunde';

        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(rows);
        });
    });
}

function getSpielrundeById(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM spielrunde WHERE rundenId = ?';

        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(row);
        });
    });
}

function createSpielrunde(spielerId, levelId, erreichteProzente) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO spielrunde (spielerId, levelId, erreichteProzente)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [spielerId, levelId, erreichteProzente], function (err) {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                rundenId: this.lastID,
                spielerId,
                levelId,
                erreichteProzente
            });
        });
    });
}

function updateSpielrunde(id, updates) {
    return new Promise((resolve, reject) => {
        const fields = [];
        const values = [];

        if (updates.spielerId !== undefined) {
            fields.push('spielerId = ?');
            values.push(updates.spielerId);
        }

        if (updates.levelId !== undefined) {
            fields.push('levelId = ?');
            values.push(updates.levelId);
        }

        if (updates.erreichteProzente !== undefined) {
            fields.push('erreichteProzente = ?');
            values.push(updates.erreichteProzente);
        }

        if (fields.length === 0) {
            resolve(null);
            return;
        }

        values.push(id);

        const sql = `UPDATE spielrunde SET ${fields.join(', ')} WHERE rundenId = ?`;

        db.run(sql, values, function (err) {
            if (err) {
                reject(err);
                return;
            }

            if (this.changes === 0) {
                resolve(undefined);
                return;
            }

            db.get('SELECT * FROM spielrunde WHERE rundenId = ?', [id], (selectErr, row) => {
                if (selectErr) {
                    reject(selectErr);
                    return;
                }

                resolve(row);
            });
        });
    });
}

function deleteSpielrunde(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM spielrunde WHERE rundenId = ?';

        db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
                return;
            }

            if (this.changes === 0) {
                resolve(false);
                return;
            }

            resolve(true);
        });
    });
}

module.exports = {
    getAllSpielrunden,
    getSpielrundeById,
    createSpielrunde,
    updateSpielrunde,
    deleteSpielrunde
};