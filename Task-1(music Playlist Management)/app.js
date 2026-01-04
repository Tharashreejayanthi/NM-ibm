const express = require('express');
const bodyParser = require('body-parser');
const musicRoutes = require('./routes/musicRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use Routes
app.use('/', musicRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Music App Server running on http://localhost:${PORT}`);
});