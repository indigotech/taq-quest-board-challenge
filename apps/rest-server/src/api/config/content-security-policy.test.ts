import { describe, expect, it } from 'bun:test';
import axios from 'axios';
import { API_PREFIX } from '#api/rest.config.js';
import { Env } from '#env/index.js';

describe('Content-Security-Policy', () => {
  const baseUrl = `http://127.0.0.1:${Env.PORT}${API_PREFIX}`;

  it('should not allow inline scripts on API routes', async () => {
    const response = await axios.get(`${baseUrl}/quests`, { validateStatus: () => true });

    const csp = response.headers['content-security-policy'];
    expect(csp).toContain("script-src 'self'");
    expect(csp).not.toMatch(/script-src [^;]*'unsafe-inline'/);
  });

  it('should allow the docs UI scripts on the docs route', async () => {
    const response = await axios.get(`${baseUrl}/docs`, { validateStatus: () => true });

    expect(response.status).toBe(200);
    expect(response.headers['content-security-policy']).toMatch(
      /script-src 'self' https:\/\/cdn\.jsdelivr\.net 'unsafe-inline'/,
    );
  });
});
