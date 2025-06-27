const express = require('express');
const fs = require('fs/promises');
const fsWatch = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

const { mean } = require('../utils/stats');

let cachedStats = null;
let cacheReady = false;

async function calculateStats() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    const items = JSON.parse(raw);

    cachedStats = {
      total: items.length,
      averagePrice: mean(items.map(item => item.price))
    };
    cacheReady = true;
  } catch (err) {
    console.error('Failed to calculate stats:', err.message);
    cachedStats = null;
    cacheReady = false;
  }
}

calculateStats();

fsWatch.watchFile(DATA_PATH, { interval: 1000 }, () => {
  console.log('Detected change in items.json. Recalculating stats...');
  calculateStats();
});

// GET /api/stats
router.get('/', (req, res, next) => {
  if (!cacheReady || !cachedStats) {
    return res.status(503).json({ error: 'Stats not ready. Try again shortly.' });
  }

  res.json(cachedStats);
});

module.exports = router;