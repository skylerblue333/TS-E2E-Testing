import request from 'supertest';
import { app } from '../src/index';

describe('TS-E2E-Testing', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('should create and fetch a test run', async () => {
    const res1 = await request(app).post('/api/v1/runs').send({ suite: 'auth', browser: 'chrome' });
    expect(res1.status).toBe(200);
    const id = res1.body.id;
    
    const res2 = await request(app).get(`/api/v1/runs/${id}`);
    expect(res2.status).toBe(200);
    expect(res2.body.browser).toBe('chrome');
  });

});
