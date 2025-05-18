<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import NewsCard from '@/components/NewsCard.vue';
import { useNewsStore } from '@/stores/news';

import type { INewsItem } from '@/models/NewsType';

const newsStore = useNewsStore();
const searchTerm = ref('');
const debouncedSearchTerm = ref('');

let debounceTimeout: ReturnType<typeof setTimeout>;

watch(searchTerm, (val) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    debouncedSearchTerm.value = val;
  }, 300);
});

onMounted(async () => {
  await newsStore.FETCH_ALL_NEWS();
});

const filteredNews = computed<INewsItem[]>(() => {
  const term = debouncedSearchTerm.value.trim().toLowerCase();
  if (!term) return newsStore.news;
  return newsStore.news.filter(
    (item: INewsItem) =>
      (item.title?.toLowerCase().includes(term) ?? false) ||
      item.shortDescription.toLowerCase().includes(term) ||
      item.fullDescription.toLowerCase().includes(term)
  );
});
</script>

<template>
  <div class="container py-4">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search news by title or description"
      class="form-control mb-4"
    />

    <div class="row gy-3">
      <NewsCard v-for="item in filteredNews" :key="item.id" :item="item" />
    </div>
  </div>
</template>
