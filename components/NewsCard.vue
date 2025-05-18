<script setup lang="ts">
import type { INewsItem } from '@/models/NewsType'
import { defineProps } from 'vue';

const { item } = defineProps<{ item: INewsItem }>()

const formattedDate = new Date(item.date).toLocaleDateString()
</script>
<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card h-100">
      <div class="card-body d-flex flex-column">
        <h5>{{ item.title || 'No Title' }}</h5>
        <p class="card-text flex-grow-1">{{ item.shortDescription }}</p>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <small class="text-muted">{{ formattedDate }}</small>
          <NuxtLink :to="`/news/${item.id}`" class="btn btn-primary btn-sm">
            More
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
