<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNewsStore } from '@/stores/news';
import { useCommentsStore } from '@/stores/comments';

import type { ICommentItem } from '@/models/CommentType';
import type { INewsItem } from '@/models/NewsType';

const route = useRoute();
const newsStore = useNewsStore();
const commentsStore = useCommentsStore();

const newsId = Number(route.params.id);

onMounted(async () => {
  if (!newsStore.news.length) {
    await newsStore.FETCH_ALL_NEWS();
  }
  if (!commentsStore.comments.length) {
    await commentsStore.FETCH_ALL_COMMENTS();
  }
});

const newsItem = computed(() =>
  newsStore.news.find((item: INewsItem) => item.id === newsId)
);

const relatedComments = computed(() =>
  commentsStore.comments.filter(
    (comment: ICommentItem) => comment.newsId === newsId
  )
);
</script>

<template>
  <div class="container py-4">
    <div v-if="newsItem" class="mb-5">
      <h2>{{ newsItem.title }}</h2>
      <p class="text-muted">
        {{ new Date(newsItem.date).toLocaleDateString() }}
      </p>
      <p>{{ newsItem.fullDescription }}</p>
    </div>

    <div v-else class="alert alert-warning">News item not found.</div>

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
    <div v-else class="text-muted">No comments yet.</div>
  </div>
</template>
