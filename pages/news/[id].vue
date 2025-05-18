<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNewsStore } from '@/stores/news';
import { useCommentsStore } from '@/stores/comments';
import { useAuth } from '@/composables/useAuth';
import { useEmitter } from '@/composables/useEmitter';

import type { ICommentItem } from '@/models/CommentType';
import type { INewsItem } from '@/models/NewsType';

const route = useRoute();

const newsStore = useNewsStore();
const commentsStore = useCommentsStore();

const { isLogined } = useAuth();

const emitter = useEmitter();

const newsId = Number(route.params.id);

function onNewComment(newComment: ICommentItem) {
  if (newComment.newsId === newsId) {
    commentsStore.ADD_COMMENT(newComment);
  }
}

const newsItem = computed(() =>
  newsStore.news.find((item: INewsItem) => item.id === newsId)
);

const relatedComments: ComputedRef<ICommentItem[]> = computed(() =>
  commentsStore.comments
    .filter((comment: ICommentItem) => comment.newsId === newsId)
    .slice() // Create a shallow copy before sorting to avoid mutating state
    .sort(
      (a: ICommentItem, b: ICommentItem) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
);

// Lifecycle hook: run on component mount
onMounted(async () => {
  // Load all news if not loaded yet
  if (!newsStore.news.length) {
    await newsStore.FETCH_ALL_NEWS();
  }

  // Load all comments if not loaded yet
  if (!commentsStore.comments.length) {
    await commentsStore.FETCH_ALL_COMMENTS();
  }

  // Subscribe to the global 'new-comment' event
  emitter.on('new-comment', onNewComment);
});

// Lifecycle hook: run on component unmount
onUnmounted(() => {
  // Unsubscribe from the event to prevent memory leaks
  emitter.off('new-comment', onNewComment);
});
</script>

<template>
  <div class="container py-4">
    <!-- Show news details if found -->
    <div v-if="newsItem" class="mb-5">
      <h2>{{ newsItem.title }}</h2>
      <p class="text-muted">
        {{ new Date(newsItem.date).toLocaleDateString() }}
      </p>
      <p>{{ newsItem.fullDescription }}</p>
    </div>

    <div v-else class="alert alert-warning">News item not found.</div>

    <CommentForm v-if="isLogined" :newsId="newsId" />

    <div v-if="relatedComments.length">
      <h4>Comments ({{ relatedComments.length }})</h4>
      <ul class="list-group">
        <CommentItem
          v-for="comment in relatedComments"
          :key="comment.id"
          :comment="comment"
        />
      </ul>
    </div>

    <!-- Show fallback if no comments -->
    <div v-else class="text-muted">No comments yet.</div>
  </div>
</template>
