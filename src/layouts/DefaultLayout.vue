<script setup lang="ts">
import AppHeader from '@/layouts/AppHeader.vue'
import AppFooter from '@/layouts/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-200">
    <AppHeader />
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>