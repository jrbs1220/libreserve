const express = require('express');
const app = express();
app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));
app.get('/', (req, res) => res.json([{ reservationId: 101, status: "RESERVED" }]));
app.listen(3000, () => console.log('Borrow API active on port 3000'));
