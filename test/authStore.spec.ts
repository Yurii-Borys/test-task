import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '@/stores/auth';

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have default state', () => {
    const auth = useAuthStore();
    expect(auth.name).toBe('');
    expect(auth.isLogined).toBe(false);
  });

  it('should login successfully with username and password', () => {
    const auth = useAuthStore();
    auth.login('john', '1234');

    expect(auth.name).toBe('john');
    expect(auth.isLogined).toBe(true);
  });

  it('should throw error if username or password is missing', () => {
    const auth = useAuthStore();

    expect(() => auth.login('', '1234')).toThrow(
      'Username or password is missing'
    );
    expect(() => auth.login('john', '')).toThrow(
      'Username or password is missing'
    );
  });

  it('should logout correctly', () => {
    const auth = useAuthStore();
    auth.login('john', '1234');
    auth.logout();

    expect(auth.name).toBe('');
    expect(auth.isLogined).toBe(false);
  });
});
