<script setup lang="ts">
import { defineProps } from 'vue';

import type { ICommentItem } from '@/models/CommentType';

const props = defineProps<{ comment: ICommentItem }>();

const formattedDate = new Date(props.comment.date).toLocaleDateString();
</script>

<template>
  <li class="list-group-item">
    <strong>{{ comment.author }}</strong>
    <span class="text-muted ms-2">({{ formattedDate }})</span>
    <p class="mb-0 mt-2">{{ comment.comment }}</p>
  </li>
</template>
