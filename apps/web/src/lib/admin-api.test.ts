import { describe, expect, it, vi } from 'vitest';
import { fetchAdminApi } from './admin-api';

describe('fetchAdminApi', () => {
  it('returns 500 if token missing', async () => {
    const prev = process.env.ADMIN_API_TOKEN; delete process.env.ADMIN_API_TOKEN;
    const res = await fetchAdminApi('/admin/summary');
    expect(res.status).toBe(500);
    process.env.ADMIN_API_TOKEN = prev;
  });
});
