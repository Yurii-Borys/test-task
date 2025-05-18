import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const isLogined = computed(() => authStore.isLogined);
  const userName = computed(() => authStore.name);

  const login = async (username: string, password: string) => {
    await authStore.login(username, password);
  };

  const logout = () => {
    authStore.logout();
  };

  return {
    isLogined,
    userName,
    login,
    logout,
  };
};
