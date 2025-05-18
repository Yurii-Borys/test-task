// stores/news.ts
import { defineStore } from 'pinia';
import type { INewsItem } from '@/models/NewsType';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as INewsItem[],
  }),

  actions: {
    async FETCH_ALL_NEWS() {
      try {
        const data = await $fetch('/api/news', {
          params: { t: Date.now() },
        });
        this.news = data;
        console.log('News loaded successfully');
      } catch (error) {
        console.error('Failed to load news:', error);
      }
    },
  },
});
