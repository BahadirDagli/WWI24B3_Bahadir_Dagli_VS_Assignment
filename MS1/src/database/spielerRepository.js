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

module.exports = {
    getAllSpieler
}; 