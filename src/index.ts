import express from 'express';
import { z } from 'zod';

export const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'TS-E2E-Testing' });
});

const TestRunSchema = z.object({
  suite: z.string(),
  browser: z.enum(['chrome', 'firefox', 'webkit'])
});

const runs: Record<string, any> = {};

app.post('/api/v1/runs', (req, res) => {
  try {
    const data = TestRunSchema.parse(req.body);
    const id = `run_${Date.now()}`;
    runs[id] = { ...data, status: 'queued' };
    res.json({ id, status: 'queued' });
  } catch (e) {
    res.status(400).json({ error: 'Invalid payload' });
  }
});

app.get('/api/v1/runs/:id', (req, res) => {
  const run = runs[req.params.id];
  if (!run) return res.status(404).json({ error: 'Not found' });
  res.json(run);
});


if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}
