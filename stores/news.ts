// stores/news.ts
import { defineStore } from 'pinia';

interface NewsItem {
  id: number;
  shortDescription: string;
  fullDescription: string;
  date: string;
}

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as NewsItem[],
  }),

  actions: {
    async FETCH_ALL_NEWS() {
      try {
        const data = await $fetch('/api/news');
        console.log('Raw data from API:', data); // <-- додай цей лог
        this.news = data;
        console.log(`News loaded successfully: ${this.news.length} items`);
      } catch (error) {
        console.error('Failed to load news:', error);
      }
    },
  },
});
