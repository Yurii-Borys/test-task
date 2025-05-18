import { defineStore } from 'pinia';
import type { IUserType } from '@/models/UserType';

export const useAuthStore = defineStore('auth', {
  state: (): IUserType => ({
    name: '',
    isLogined: false,
  }),

  actions: {
    login(username: string, password: string): void {
      // Проста імітація логіну (без бекенду)
      if (username && password) {
        this.name = username;
        this.isLogined = true;
        console.log(`Logged in as ${username}`);
      } else {
        throw new Error('Username or password is missing');
      }
    },

    logout(): void {
      this.name = '';
      this.isLogined = false;
      console.log('Logged out');
    },
  },
});
