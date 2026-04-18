const spielrundeRepository = require('../database/spielrundeRepository');
const { publishEvent } = require('../services/mqttPublisher');

async function getAllSpielrunden(req, res) {
    try {
        const spielrunden = await spielrundeRepository.getAllSpielrunden();
        res.json(spielrunden);
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Laden der Spielrunden');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function getSpielrundeById(req, res) {
    try {
        const id = req.params.id;
        const spielrunde = await spielrundeRepository.getSpielrundeById(id);

        if (!spielrunde) {
            res.set('X-Fehlermeldung', 'Spielrunde nicht gefunden');
            res.status(404).json({ error: 'Spielrunde nicht gefunden' });
            return;
        }

        res.json(spielrunde);
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Laden der Spielrunde');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function createSpielrunde(req, res) {
    try {
        const { spielerId, levelId, erreichteProzente } = req.body;

        if (spielerId === undefined || levelId === undefined || erreichteProzente === undefined) {
            res.set('X-Fehlermeldung', 'spielerId, levelId und erreichteProzente sind Pflichtfelder');
            res.status(400).json({ error: 'Fehlende Pflichtfelder' });
            return;
        }

        const neueSpielrunde = await spielrundeRepository.createSpielrunde(
            spielerId,
            levelId,
            erreichteProzente
        );

        publishEvent('spielrunde', neueSpielrunde.rundenId, 'created');

        res.status(201).json(neueSpielrunde);

    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Erstellen der Spielrunde');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function updateSpielrunde(req, res) {
    try {
        const id = req.params.id;

        if (req.body.rundenId !== undefined) {
            res.set('X-Fehlermeldung', 'rundenId darf nicht geändert werden');
            res.status(400).json({ error: 'rundenId darf nicht geändert werden' });
            return;
        }

        const { spielerId, levelId, erreichteProzente } = req.body;
        const updates = {};

        if (spielerId !== undefined) {
            updates.spielerId = spielerId;
        }

        if (levelId !== undefined) {
            updates.levelId = levelId;
        }

        if (erreichteProzente !== undefined) {
            updates.erreichteProzente = erreichteProzente;
        }

        const aktualisierteSpielrunde = await spielrundeRepository.updateSpielrunde(id, updates);

        if (aktualisierteSpielrunde === undefined) {
            res.set('X-Fehlermeldung', 'Spielrunde nicht gefunden');
            res.status(404).json({ error: 'Spielrunde nicht gefunden' });
            return;
        }

        if (aktualisierteSpielrunde === null) {
            res.set('X-Fehlermeldung', 'Keine gültigen Felder zum Aktualisieren');
            res.status(400).json({ error: 'Keine gültigen Felder zum Aktualisieren' });
            return;
        }
        publishEvent('spielrunde', aktualisierteSpielrunde.rundenId, 'updated');
        res.json(aktualisierteSpielrunde);

    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Aktualisieren der Spielrunde');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function deleteSpielrunde(req, res) {
    try {
        const id = req.params.id;
        const deleted = await spielrundeRepository.deleteSpielrunde(id);

        if (!deleted) {
            res.set('X-Fehlermeldung', 'Spielrunde nicht gefunden');
            res.status(404).json({ error: 'Spielrunde nicht gefunden' });
            return;
        }
        publishEvent('spielrunde', Number(id), 'deleted');

        res.status(204).send();
        
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Löschen der Spielrunde');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

module.exports = {
    getAllSpielrunden,
    getSpielrundeById,
    createSpielrunde,
    updateSpielrunde,
    deleteSpielrunde
};