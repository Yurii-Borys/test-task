<template>
  <div>
    <header class="bg-light p-3 shadow-sm">
      <div class="container d-flex justify-content-end">
        <NuxtLink to="/login" class="btn btn-primary">Login</NuxtLink>
      </div>
    </header>

    <main class="container mt-4">
      <slot />
    </main>
  </div>
</template>
