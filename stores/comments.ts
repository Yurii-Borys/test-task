import { defineStore } from 'pinia';

interface CommentItem {
  id: number;
  newsId: number;
  comment: string;
  author: string;
  date: string;
}

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [] as CommentItem[],
  }),

  actions: {
    async FETCH_ALL_COMMENTS() {
      try {
        const { data, error } = await useFetch<CommentItem[]>('/api/comments');

        if (error.value) {
          console.error('Failed to fetch comments:', error.value);
          throw new Error('Failed to fetch comments');
        }

        // Обережно присвоюємо, перевіряємо, що data.value існує
        this.comments = data.value ?? [];
        console.log('Comments successfully loaded');
      } catch (err) {
        console.error('Error in FETCH_ALL_COMMENTS:', err);
      }
    },
  },
});
