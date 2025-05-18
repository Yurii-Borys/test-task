<script setup lang="ts">
import mitt from 'mitt';
import { useAuth } from '@/composables/useAuth';

const { isLogined, logout } = useAuth();

const emitter = mitt();
provide('emitter', emitter);

onUnmounted(() => {
  emitter.all.clear();
});
</script>

<template>
  <div>
    <header class="bg-light p-3 shadow-sm">
      <div class="container d-flex justify-content-end">
        <button v-if="isLogined" class="btn btn-danger" @click="logout">
          Logout
        </button>
        <NuxtLink v-else to="/login" class="btn btn-primary">Login</NuxtLink>
      </div>
    </header>

    <main class="container mt-4">
      <slot />
    </main>
  </div>
</template>
