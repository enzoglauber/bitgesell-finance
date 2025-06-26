const request = require('supertest');
const express = require('express');

describe('GET /api/stats', () => {
  it('should return fake cached stats', async () => {
    const app = express();

    app.use('/api/stats', (req, res, next) => {
      res.json({
        total: 3,
        averagePrice: 20,
      });
    });

    const res = await request(app).get('/api/stats');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ total: 3, averagePrice: 20 });
  });

  it('should return 503 when stats not ready', async () => {
    const app = express();

    // Middleware que simula erro no cache
    app.use('/api/stats', (req, res, next) => {
      res.status(503).json({ error: 'Stats not ready. Try again shortly.' });
    });

    const res = await request(app).get('/api/stats');

    expect(res.statusCode).toBe(503);
    expect(res.body).toEqual({ error: 'Stats not ready. Try again shortly.' });
  });
});
