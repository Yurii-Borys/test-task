export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    return navigateTo('/news', { redirectCode: 301 });
  }
});