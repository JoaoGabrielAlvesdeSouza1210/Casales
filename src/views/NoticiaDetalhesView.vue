<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { noticiaService } from '@/services/noticiaService'
import type { Noticia } from '@/types/noticia'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

const route = useRoute()
const noticia = ref<Noticia | null>(null)
const isLoading = ref(true)

const noticiaId = computed(() => Number(route.params.id))

onMounted(async () => {
  try {
    noticia.value = await noticiaService.getById(noticiaId.value)
  } catch (error) {
    console.error('Erro ao carregar notícia:', error)
  } finally {
    isLoading.value = false
  }
})

/**
 * Formata data para exibição
 * @param data - Data no formato string
 * @returns Data formatada
 */
const formatarData = (data: string): string => {
  return dayjs(data).format('dddd, DD [de] MMMM [de] YYYY')
}
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Conteúdo -->
    <div v-if="noticia" class="container mx-auto px-4 py-12">
      <!-- Breadcrumb -->
      <div class="breadcrumbs text-sm mb-8">
        <ul>
          <li><RouterLink to="/">Início</RouterLink></li>
          <li><RouterLink to="/noticias">Notícias</RouterLink></li>
          <li>{{ noticia.titulo }}</li>
        </ul>
      </div>

      <!-- Card da Notícia -->
      <article class="card bg-base-200 shadow-xl">
        <!-- Imagem de Capa -->
        <figure v-if="noticia.imagem" class="max-h-[500px] overflow-hidden">
          <img
            :src="noticia.imagem"
            :alt="noticia.titulo"
            class="w-full h-full object-cover"
          />
        </figure>

        <!-- Conteúdo -->
        <div class="card-body">
          <!-- Meta informações -->
          <div class="flex items-center gap-4 text-sm text-base-content/70 mb-4">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:calendar" />
              <time :datetime="noticia.data_publicacao" class="capitalize">
                {{ formatarData(noticia.data_publicacao) }}
              </time>
            </div>
            <div v-if="noticia.autor" class="flex items-center gap-2">
              <Icon icon="mdi:account" />
              <span>{{ noticia.autor }}</span>
            </div>
          </div>

          <!-- Título -->
          <h1 class="text-4xl font-bold mb-6">{{ noticia.titulo }}</h1>

          <!-- Resumo -->
          <div v-if="noticia.resumo" class="alert mb-6">
            <Icon icon="mdi:information" class="text-2xl" />
            <p class="text-lg">{{ noticia.resumo }}</p>
          </div>

          <!-- Conteúdo Principal -->
          <div class="prose max-w-none" v-html="noticia.conteudo" />

          <!-- Ações -->
          <div class="card-actions justify-between mt-8 pt-8 border-t border-base-300">
            <RouterLink to="/noticias" class="btn btn-ghost gap-2">
              <Icon icon="mdi:arrow-left" />
              Voltar para Notícias
            </RouterLink>

            <!-- Botões de Compartilhamento -->
            <div class="flex gap-2">
              <button
                class="btn btn-circle btn-ghost"
                @click="() => {}"
                title="Compartilhar no Facebook"
              >
                <Icon icon="mdi:facebook" class="text-xl" />
              </button>
              <button
                class="btn btn-circle btn-ghost"
                @click="() => {}"
                title="Compartilhar no WhatsApp"
              >
                <Icon icon="mdi:whatsapp" class="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Loading State -->
    <div v-else-if="isLoading" class="container mx-auto px-4 py-16">
      <div class="flex flex-col items-center justify-center">
        <span class="loading loading-spinner loading-lg"></span>
        <p class="mt-4 text-lg">Carregando notícia...</p>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="container mx-auto px-4 py-16">
      <div class="flex flex-col items-center justify-center">
        <Icon icon="mdi:alert-circle" class="text-6xl text-error mb-4" />
        <h2 class="text-2xl font-bold mb-2">Notícia não encontrada</h2>
        <p class="text-base-content/60 mb-6">A notícia que você procura não existe ou foi removida.</p>
        <RouterLink to="/noticias" class="btn btn-primary">
          <Icon icon="mdi:arrow-left" />
          Voltar para Notícias
        </RouterLink>
      </div>
    </div>
  </div>
</template>
