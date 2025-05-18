<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useNewsStore } from '@/stores/news'

import type { INewsItem } from '@/models/NewsType'

const newsStore = useNewsStore()
const searchTerm = ref('')
const debouncedSearchTerm = ref('')

let debounceTimeout: ReturnType<typeof setTimeout>

watch(searchTerm, (val) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedSearchTerm.value = val
  }, 300)
})

onMounted(async () => {
  await newsStore.FETCH_ALL_NEWS()
})

const filteredNews = computed<INewsItem[]>(() => {
  const term = debouncedSearchTerm.value.trim().toLowerCase()
  if (!term) return newsStore.news
  return newsStore.news.filter((item:INewsItem) =>
    (item.title?.toLowerCase().includes(term) ?? false) ||
    item.shortDescription.toLowerCase().includes(term) ||
    item.fullDescription.toLowerCase().includes(term)
  )
})
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
      <div
        v-for="item in filteredNews"
        :key="item.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5>{{ item.title || 'No Title' }}</h5>
            <p class="card-text flex-grow-1">{{ item.shortDescription }}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <small class="text-muted">{{ new Date(item.date).toLocaleDateString() }}</small>
              <NuxtLink :to="`/news/${item.id}`" class="btn btn-primary btn-sm">
                More
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>







