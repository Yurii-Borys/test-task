import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores/auth';

describe('authStore', () => {
  let authStore: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    authStore = useAuthStore();
  });

  it('should have initial state', () => {
    expect(authStore.name).toBe('');
    expect(authStore.isLogined).toBe(false);
  });

  it('should login correctly with valid username and password', () => {
    authStore.login('john', 'password123');
    expect(authStore.name).toBe('john');
    expect(authStore.isLogined).toBe(true);
  });

  it('should throw error when username or password is missing', () => {
    expect(() => authStore.login('', 'pass')).toThrow(
      'Username or password is missing'
    );
    expect(() => authStore.login('user', '')).toThrow(
      'Username or password is missing'
    );
  });

  it('should logout correctly', () => {
    authStore.login('john', 'password123');
    authStore.logout();
    expect(authStore.name).toBe('');
    expect(authStore.isLogined).toBe(false);
  });
});
