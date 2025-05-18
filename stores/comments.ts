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
        const data = await $fetch<ICommentItem[]>('/api/comments');

        this.comments = data ?? [];
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
