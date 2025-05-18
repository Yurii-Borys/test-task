import { defineStore } from 'pinia';

import type { ICommentItem } from '@/models/CommentType';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [] as ICommentItem[],
  }),

  actions: {
    async FETCH_ALL_COMMENTS() {
      try {
        const { data, error } = await useFetch<ICommentItem[]>('/api/comments');

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
