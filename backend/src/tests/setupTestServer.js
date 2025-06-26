const express = require('express');
const itemsRouter = require('../src/routes/items');
const statsRouter = require('../src/routes/stats');

const app = express();
app.use(express.json());
app.use('/api/items', itemsRouter);
app.use('/api/stats', statsRouter);

module.exports = app;
