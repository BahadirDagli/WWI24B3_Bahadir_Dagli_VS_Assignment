const db = require('../config/db');

function getAllLevel(searchTerm) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM level';
        let params = [];

        if (searchTerm) {
            sql += ' WHERE LOWER(name) LIKE ? OR LOWER(schwierigkeit) LIKE ?';
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

function getLevelById(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM level WHERE levelId = ?';

        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(row);
        });
    });
}

function createLevel(name, schwierigkeit, laenge) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO level (name, schwierigkeit, laenge)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [name, schwierigkeit, laenge], function (err) {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                levelId: this.lastID,
                name,
                schwierigkeit,
                laenge
            });
        });
    });
}

function updateLevel(id, updates) {
    return new Promise((resolve, reject) => {
        const fields = [];
        const values = [];

        if (updates.name !== undefined) {
            fields.push('name = ?');
            values.push(updates.name);
        }

        if (updates.schwierigkeit !== undefined) {
            fields.push('schwierigkeit = ?');
            values.push(updates.schwierigkeit);
        }

        if (updates.laenge !== undefined) {
            fields.push('laenge = ?');
            values.push(updates.laenge);
        }

        if (fields.length === 0) {
            resolve(null);
            return;
        }

        values.push(id);

        const sql = `UPDATE level SET ${fields.join(', ')} WHERE levelId = ?`;

        db.run(sql, values, function (err) {
            if (err) {
                reject(err);
                return;
            }

            if (this.changes === 0) {
                resolve(undefined);
                return;
            }

            db.get('SELECT * FROM level WHERE levelId = ?', [id], (selectErr, row) => {
                if (selectErr) {
                    reject(selectErr);
                    return;
                }

                resolve(row);
            });
        });
    });
}

function deleteLevel(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM level WHERE levelId = ?';

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
    getAllLevel,
    getLevelById,
    createLevel,
    updateLevel,
    deleteLevel
};