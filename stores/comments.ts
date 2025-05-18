import { defineStore } from 'pinia';

import type { ICommentItem } from '@/models/CommentType';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [] as ICommentItem[],
  }),

  actions: {
    // Fetch all comments from API endpoint
    async FETCH_ALL_COMMENTS() {
      try {
        const { data, error } = await useFetch<ICommentItem[]>('/api/comments');

        if (error.value) {
          console.error('Failed to fetch comments:', error.value);
          throw new Error('Failed to fetch comments');
        }

        this.comments = data.value ?? [];
        console.log('Comments successfully loaded');
      } catch (err) {
        console.error('Error in FETCH_ALL_COMMENTS:', err);
      }
    },

    // Add a new comment to the store state
    ADD_COMMENT(comment: ICommentItem) {
      this.comments.push(comment);
      console.log('Add new comment', comment);
    },
  },
});
