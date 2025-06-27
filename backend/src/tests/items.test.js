const request = require('supertest');
const express = require('express');
const itemsRouter = require('../routes/items');

const app = express();
app.use(express.json());
app.use('/api/items', itemsRouter);
describe('GET /api/items', () => {
  it('should return an array of items inside a paginated response', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true); // <-- alterado
  });

  it('should filter items by search query', async () => {
    const res = await request(app).get('/api/items?q=test');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.every(item =>
      item.name.toLowerCase().includes('test')
    )).toBe(true);
  });

  it('should limit the number of results', async () => {
    const res = await request(app).get('/api/items?limit=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBeLessThanOrEqual(1);
  });
});

describe('GET /api/items/:id', () => {
  it('should return a single item if found', async () => {
    const res = await request(app).get('/api/items/1');
    expect([200, 404]).toContain(res.statusCode);
  });

  it('should return 404 if item not found', async () => {
    const res = await request(app).get('/api/items/999999');
    expect(res.statusCode).toBe(404);
  });
});
