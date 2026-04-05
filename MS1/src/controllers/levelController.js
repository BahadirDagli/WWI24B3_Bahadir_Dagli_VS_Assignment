const levelRepository = require('../database/levelRepository');

async function getAllLevel(req, res) {
    try {
        const searchTerm = req.query.q;
        const level = await levelRepository.getAllLevel(searchTerm);
        res.json(level);
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Laden der Level');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function getLevelById(req, res) {
    try {
        const id = req.params.id;
        const level = await levelRepository.getLevelById(id);

        if (!level) {
            res.set('X-Fehlermeldung', 'Level nicht gefunden');
            res.status(404).json({ error: 'Level nicht gefunden' });
            return;
        }

        res.json(level);
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Laden des Levels');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function createLevel(req, res) {
    try {
        const { name, schwierigkeit, laenge } = req.body;

        if (!name || !schwierigkeit || laenge === undefined) {
            res.set('X-Fehlermeldung', 'name, schwierigkeit und laenge sind Pflichtfelder');
            res.status(400).json({ error: 'Fehlende Pflichtfelder' });
            return;
        }

        const neuesLevel = await levelRepository.createLevel(name, schwierigkeit, laenge);
        res.status(201).json(neuesLevel);
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Erstellen des Levels');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function updateLevel(req, res) {
    try {
        const id = req.params.id;

        if (req.body.levelId !== undefined) {
            res.set('X-Fehlermeldung', 'levelId darf nicht geändert werden');
            res.status(400).json({ error: 'levelId darf nicht geändert werden' });
            return;
        }

        const { name, schwierigkeit, laenge } = req.body;
        const updates = {};

        if (name !== undefined) {
            updates.name = name;
        }

        if (schwierigkeit !== undefined) {
            updates.schwierigkeit = schwierigkeit;
        }

        if (laenge !== undefined) {
            updates.laenge = laenge;
        }

        const aktualisiertesLevel = await levelRepository.updateLevel(id, updates);

        if (aktualisiertesLevel === undefined) {
            res.set('X-Fehlermeldung', 'Level nicht gefunden');
            res.status(404).json({ error: 'Level nicht gefunden' });
            return;
        }

        if (aktualisiertesLevel === null) {
            res.set('X-Fehlermeldung', 'Keine gültigen Felder zum Aktualisieren');
            res.status(400).json({ error: 'Keine gültigen Felder zum Aktualisieren' });
            return;
        }

        res.json(aktualisiertesLevel);
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Aktualisieren des Levels');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function deleteLevel(req, res) {
    try {
        const id = req.params.id;
        const deleted = await levelRepository.deleteLevel(id);

        if (!deleted) {
            res.set('X-Fehlermeldung', 'Level nicht gefunden');
            res.status(404).json({ error: 'Level nicht gefunden' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        res.set('X-Fehlermeldung', 'Fehler beim Löschen des Levels');
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

module.exports = {
    getAllLevel,
    getLevelById,
    createLevel,
    updateLevel,
    deleteLevel
};