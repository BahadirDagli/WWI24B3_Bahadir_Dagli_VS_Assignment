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

async function getSpielerById(req, res) {
    try {
        const id = req.params.id;
        const spieler = await spielerRepository.getSpielerById(id);

        if (!spieler) {
            res.set('X-Fehlermeldung', 'Spieler nicht gefunden');
            res.status(404).json({ error: 'Spieler nicht gefunden' });
            return;
        }

        res.json(spieler);
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Laden des Spielers');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function createSpieler(req, res) {
    try {
        const { username, email } = req.body;

        // Pflichtfelder prüfen
        if (!username || !email) {
            res.set('X-Fehlermeldung', 'username und email sind Pflichtfelder');
            res.status(400).json({ error: 'Fehlende Pflichtfelder' });
            return;
        }

        const neuerSpieler = await spielerRepository.createSpieler(username, email);

        res.status(201).json(neuerSpieler);
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Erstellen des Spielers');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

module.exports = {
    getAllSpieler,
    getSpielerById,
    createSpieler
};