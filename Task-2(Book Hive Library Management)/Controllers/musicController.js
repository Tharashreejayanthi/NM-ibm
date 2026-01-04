const fs = require('fs');
const path = require('path');

// Path to your JSON database file
const dataPath = path.join(__dirname, '../data/songs.json');

// Helper function to read data
const readData = () => {
    try {
        const jsonData = fs.readFileSync(dataPath);
        return JSON.parse(jsonData);
    } catch (error) {
        return [];
    }
};

// Helper function to write data
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// 1. GET ALL SONGS
exports.getAllSongs = (req, res) => {
    const songs = readData();
    res.status(200).json(songs);
};

// 2. GET SONG BY ID
exports.getSongById = (req, res) => {
    const songs = readData();
    const id = parseInt(req.params.id);
    const song = songs.find(s => s.id === id);

    if (song) {
        res.status(200).json(song);
    } else {
        res.status(404).json({ message: "Song not found" });
    }
};

// 3. POST (ADD NEW SONG)
exports.createSong = (req, res) => {
    const songs = readData();
    const newSong = req.body;

    // Generate a new ID (last ID + 1)
    const newId = songs.length > 0 ? songs[songs.length - 1].id + 1 : 1;
    newSong.id = newId;

    songs.push(newSong);
    writeData(songs);

    res.status(201).json({ message: "Song added successfully", song: newSong });
};

// 4. PUT (UPDATE SONG DETAILS)
exports.updateSong = (req, res) => {
    const songs = readData();
    const id = parseInt(req.params.id);
    const index = songs.findIndex(s => s.id === id);

    if (index !== -1) {
        // Update the song details while keeping the ID
        songs[index] = { id, ...req.body };
        writeData(songs);
        res.status(200).json({ message: "Song updated successfully", song: songs[index] });
    } else {
        res.status(404).json({ message: "Song not found" });
    }
};

// 5. DELETE SONG
exports.deleteSong = (req, res) => {
    let songs = readData();
    const id = parseInt(req.params.id);
    
    const newSongs = songs.filter(s => s.id !== id);

    if (songs.length !== newSongs.length) {
        writeData(newSongs);
        res.status(200).json({ message: "Song deleted successfully" });
    } else {
        res.status(404).json({ message: "Song not found" });
    }
};