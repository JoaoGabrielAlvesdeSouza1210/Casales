<script setup lang="ts">
import { computed } from 'vue'
import { useParoquiaStore } from '@/stores/paroquia'
import { Icon } from '@iconify/vue'

/**
 * Store da paróquia
 */
const paroquiaStore = useParoquiaStore()

/**
 * Dados da paróquia
 */
const paroquia = computed(() => paroquiaStore.paroquia)
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Hero Section -->
    <section class="hero min-h-[40vh] bg-gradient-to-r from-primary to-accent">
      <div class="hero-content text-center text-primary-content">
        <div class="max-w-4xl">
          <Icon icon="mdi:church" class="text-8xl mx-auto mb-4" />
          <h1 class="text-5xl md:text-6xl font-bold mb-4">Sobre Nós</h1>
          <p class="text-xl">Conheça nossa comunidade e nossa missão</p>
        </div>
      </div>
    </section>

    <!-- Conteúdo -->
    <div class="container mx-auto px-4 py-12">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-3xl mb-6">
            <Icon icon="mdi:information" class="text-accent" />
            Informações da Paróquia
          </h2>
          
          <div v-if="paroquia" class="space-y-6">
            <div class="stat bg-base-100 rounded-lg">
              <div class="stat-title">Nome</div>
              <div class="stat-value text-2xl">{{ paroquia.nome }}</div>
            </div>
            
            <div v-if="paroquia.padroeiro" class="stat bg-base-100 rounded-lg">
              <div class="stat-title">Padroeiro</div>
              <div class="stat-value text-2xl">{{ paroquia.padroeiro }}</div>
            </div>
            
            <div v-if="paroquia.descricao" class="prose max-w-none">
              <p class="text-lg">{{ paroquia.descricao }}</p>
            </div>
          </div>
          
          <div v-else class="flex justify-center py-8">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
