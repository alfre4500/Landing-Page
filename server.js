const express = require('express');
const path = require('path');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

app.listen(port, '127.0.0.1', () => {
    console.log(`QualityTrack disponible localmente en http://localhost:${port}`);
});
