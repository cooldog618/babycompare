import { InternalServerErrorException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  const guard = new AdminGuard();
  const makeContext = (token?: string) => ({ switchToHttp: () => ({ getRequest: () => ({ headers: { 'x-admin-token': token } }) }) }) as any;

  it('401 when token missing', () => {
    process.env.ADMIN_API_TOKEN = 'a';
    expect(() => guard.canActivate(makeContext())).toThrow();
  });

  it('401 when token mismatch', () => {
    process.env.ADMIN_API_TOKEN = 'a';
    expect(() => guard.canActivate(makeContext('b'))).toThrow();
  });

  it('passes when matched', () => {
    process.env.ADMIN_API_TOKEN = 'a';
    expect(guard.canActivate(makeContext('a'))).toBe(true);
  });

  it('throws configuration error when ADMIN_API_TOKEN missing', () => {
    delete process.env.ADMIN_API_TOKEN;
    expect(() => guard.canActivate(makeContext('a'))).toThrow(InternalServerErrorException);
  });
});
