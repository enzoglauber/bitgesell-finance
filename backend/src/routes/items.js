const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

const { ItemSchema } = require('../schemas/item.schema');
const { readData, writeData } = require('../utils/file');

// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    const data = await readData(DATA_PATH);
    const { page = 1, limit = 10, q } = req.query;
    let results = data;

    if (q) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(q.toString().toLowerCase())
      );
    }

    const start = (parseInt(page) - 1) * parseInt(limit);
    const paginated = results.slice(start, start + parseInt(limit));

    res.json({
      items: paginated,
      total: results.length,
    });
  } catch (err) {
    next(err);
  }
});


// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const data = await readData(DATA_PATH);
    const itemId = parseInt(req.params.id);

    if (isNaN(itemId)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const item = data.find(i => i.id === itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post('/', async (req, res, next) => {
  try {
    const parse = ItemSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parse.error.issues });
    }

    const item = parse.data;
    const data = await readData(DATA_PATH);

    item.id = Date.now();
    data.push(item);

    await writeData(DATA_PATH, data);

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;