const spielerRepository = require('../database/spielerRepository');

async function getAllSpieler(req, res) {
    try {
        const searchTerm = req.query.q;
        const spieler = await spielerRepository.getAllSpieler(searchTerm);
        res.json(spieler);
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Laden der Spieler');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

module.exports = {
    getAllSpieler
};