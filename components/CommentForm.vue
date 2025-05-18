<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useEmitter } from '@/composables/useEmitter';
import { defineProps } from 'vue';
import type { ICommentItem } from '@/models/CommentType';

const props = defineProps<{ newsId: number }>();

const { userName } = useAuth();
const emitter = useEmitter();

const commentText = ref('');

const handleSubmit = () => {
  if (!commentText.value.trim()) return;

  const newComment: ICommentItem = {
    id: Date.now(),
    newsId: props.newsId,
    comment: commentText.value.trim(),
    author: userName.value,
    date: new Date().toISOString(),
  };
  console.log('Create new comment', newComment);
  emitter.emit('new-comment', newComment);
  commentText.value = '';
};

// Allow Enter to submit, Shift+Enter adds newline
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
};
</script>

<template>
  <div class="mb-3">
    <label for="commentTextarea" class="form-label">Write a comment</label>
    <textarea
      id="commentTextarea"
      class="form-control"
      rows="3"
      v-model="commentText"
      @keydown="handleKeydown"
      placeholder="Write your comment..."
    ></textarea>

    <!-- Right-aligned button -->
    <div class="d-flex justify-content-end mt-2">
      <button
        class="btn btn-primary"
        :disabled="!commentText.trim()"
        @click="handleSubmit"
      >
        Add comment
      </button>
    </div>
  </div>
</template>
