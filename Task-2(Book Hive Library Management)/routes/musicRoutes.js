const express = require('express');
const router = express.Router();
const musicController = require('../Controllers/musicController');

// Define Routes
router.get('/songs', musicController.getAllSongs);       // Get All
router.get('/songs/:id', musicController.getSongById);   // Get One
router.post('/songs', musicController.createSong);       // Create
router.put('/songs/:id', musicController.updateSong);    // Update
router.delete('/songs/:id', musicController.deleteSong); // Delete

module.exports = router;