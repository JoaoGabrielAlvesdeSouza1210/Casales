<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useParoquiaStore } from '@/stores/paroquia'
import { Icon } from '@iconify/vue'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

/**
 * Store da paróquia
 */
const paroquiaStore = useParoquiaStore()

/**
 * Notícias disponíveis
 */
const noticias = computed(() => paroquiaStore.noticias || [])

/**
 * Formata data para exibição
 * @param data - Data no formato string
 * @returns Data formatada
 */
const formatarData = (data: string): string => {
  return dayjs(data).format('DD [de] MMMM [de] YYYY')
}
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Hero Section -->
    <section class="hero min-h-[30vh] bg-gradient-to-r from-primary to-accent">
      <div class="hero-content text-center text-primary-content">
        <div class="max-w-4xl">
          <Icon icon="mdi:newspaper-variant" class="text-7xl mx-auto mb-4" />
          <h1 class="text-5xl font-bold mb-4">Notícias</h1>
          <p class="text-xl">Fique por dentro das novidades da paróquia</p>
        </div>
      </div>
    </section>

    <!-- Lista de Notícias -->
    <div class="container mx-auto px-4 py-12">
      <div v-if="noticias.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="noticia in noticias"
          :key="noticia.id"
          :to="`/noticias/${noticia.id}`"
          class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
        >
          <!-- Imagem da Notícia -->
          <figure v-if="noticia.imagem" class="h-48 overflow-hidden">
            <img
              :src="noticia.imagem"
              :alt="noticia.titulo"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </figure>
          <figure v-else class="h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Icon icon="mdi:newspaper-variant" class="text-6xl text-primary-content/50" />
          </figure>

          <!-- Conteúdo -->
          <div class="card-body">
            <!-- Data -->
            <div class="flex items-center gap-2 text-sm text-base-content/70">
              <Icon icon="mdi:calendar" />
              <time :datetime="noticia.dataPublicacao">
                {{ formatarData(noticia.dataPublicacao) }}
              </time>
            </div>

            <!-- Título -->
            <h2 class="card-title text-xl hover:text-accent transition-colors">
              {{ noticia.titulo }}
            </h2>

            <!-- Resumo -->
            <p class="text-base-content/70 line-clamp-3">
              {{ noticia.resumo || noticia.conteudo }}
            </p>

            <!-- Ação -->
            <div class="card-actions justify-end mt-4">
              <div class="badge badge-accent gap-2">
                Ler mais
                <Icon icon="mdi:arrow-right" />
              </div>
            </div>
          </div>
        </RouterLink>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <Icon icon="mdi:newspaper-variant-outline" class="text-6xl text-base-content/30 mb-4 mx-auto" />
        <h2 class="text-2xl font-bold mb-2">Nenhuma notícia disponível</h2>
        <p class="text-base-content/50">Em breve teremos novidades para você!</p>
      </div>
    </div>
  </div>
</template>
