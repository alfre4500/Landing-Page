const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const apiKey = process.env.GEMINI_API_KEY;

app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

app.post('/api/chat', async (req, res) => {
    if (!apiKey) {
        return res.status(500).json({ error: 'Falta configurar GEMINI_API_KEY en .env.' });
    }

    const { contents, systemInstruction } = req.body || {};
    if (!Array.isArray(contents)) {
        return res.status(400).json({ error: 'La conversación enviada no es válida.' });
    }

    const url = new URL(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'
    );
    url.searchParams.set('key', apiKey);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents, systemInstruction })
        });
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(502).json({ error: 'No se pudo conectar con el servicio de IA.' });
    }
});

app.listen(port, '127.0.0.1', () => {
    console.log(`QualityTrack disponible localmente en http://localhost:${port}`);
});
