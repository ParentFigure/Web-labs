const express = require('express');
const router = express.Router();
const Clip = require('../models/Clip');

// GET /api/clips - Отримати всі кліпи
router.get('/', async (req, res) => {
    try {
        const clips = await Clip.find();
        res.json(clips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/clips/:id - Отримати кліп за ID
router.get('/:id', getClip, (req, res) => {
    res.json(res.clip);
});

// POST /api/clips - Створити новий кліп
router.post('/', async (req, res) => {
    const clip = new Clip({
        artist: req.body.artist,
        song: req.body.song,
        length: req.body.length,
        views: req.body.views
    });

    try {
        const newClip = await clip.save();
        res.status(201).json(newClip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/clips/:id - Оновити кліп за ID
router.put('/:id', getClip, async (req, res) => {
    if (req.body.artist != null) {
        res.clip.artist = req.body.artist;
    }
    if (req.body.song != null) {
        res.clip.song = req.body.song;
    }
    if (req.body.length != null) {
        res.clip.length = req.body.length;
    }
    if (req.body.views != null) {
        res.clip.views = req.body.views;
    }

    try {
        const updatedClip = await res.clip.save();
        res.json(updatedClip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/clips/:id - Видалити кліп за ID
router.delete('/:id', getClip, async (req, res) => {
    try {
        await res.clip.remove();
        res.json({ message: 'Кліп видалено' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware для отримання кліпу за ID
async function getClip(req, res, next) {
    let clip;
    try {
        clip = await Clip.findById(req.params.id);
        if (clip == null) {
            return res.status(404).json({ message: 'Кліп не знайдено' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.clip = clip;
    next();
}

module.exports = router;
