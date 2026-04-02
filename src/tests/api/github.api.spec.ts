
import { test, expect } from '@playwright/test';
import http from 'node:http';
import { AddressInfo } from 'node:net';

test('GitHub rate limit endpoint returns resources', async ({ request }) => {
  const payload = {
    resources: {
      core: { limit: 60, remaining: 60, reset: 1_700_000_000 },
      search: { limit: 10, remaining: 10, reset: 1_700_000_000 },
    },
  };

  const server = http.createServer((req, res) => {
    if (req.url === '/rate_limit') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(payload));
      return;
    }

    res.writeHead(404);
    res.end();
  });

  await new Promise<void>(resolve => server.listen(0, resolve));
  const { port } = server.address() as AddressInfo;

  try {
    const resp = await request.get(`http://127.0.0.1:${port}/rate_limit`);
    expect(resp.ok()).toBeTruthy();
    const json = await resp.json();
    expect(json).toHaveProperty('resources');
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
