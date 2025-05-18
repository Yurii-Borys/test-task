<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const username = ref<string>('');
const password = ref<string>('');
const showPassword = ref<boolean>(false);
const error = ref<string>('');

const canLogin = computed(
  () => username.value.trim() !== '' && password.value.trim() !== ''
);

const handleSubmit = (event: Event): void => {
  event.preventDefault();
  try {
    authStore.login(username.value, password.value);
    router.back();
  } catch {
    error.value = 'Login failed. Please enter valid credentials.';
  }
};
</script>

<template>
  <div class="container py-5" style="max-width: 400px">
    <h2 class="mb-4">Login</h2>

    <form @submit="handleSubmit" novalidate>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          v-model="username"
          id="username"
          type="text"
          class="form-control"
          autocomplete="username"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <div class="input-group">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            class="form-control"
            autocomplete="current-password"
            required
          />
          <button
            type="button"
            class="btn btn-outline-secondary btn-show-pass"
            @click="showPassword = !showPassword"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
          >
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>

      <button type="submit" :disabled="!canLogin" class="btn btn-primary w-100">
        Login
      </button>
    </form>
  </div>
</template>

<style scoped>
.btn-show-pass {
  border-color: #007bff;
  color: #007bff;
  font-weight: 600;
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;
  min-width: 70px; /* фіксована мінімальна ширина */
  text-align: center;
}

.btn-show-pass:hover {
  background-color: #007bff;
  color: white;
  border-color: #0056b3;
}
</style>
