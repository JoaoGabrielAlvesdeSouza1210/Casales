<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useParoquiaStore } from '@/stores/paroquia'
import { Icon } from '@iconify/vue'

/**
 * Route atual
 */
const route = useRoute()

/**
 * Store da paróquia
 */
const paroquiaStore = useParoquiaStore()

/**
 * ID da pastoral
 */
const pastoralId = computed(() => route.params.id as string)

/**
 * Pastoral atual
 */
const pastoral = computed(() => {
  return paroquiaStore.paroquia?.pastorais?.find(p => p.id === Number(pastoralId.value))
})

onMounted(() => {
  // Carregar pastoral se necessário
})
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Conteúdo -->
    <div v-if="pastoral" class="container mx-auto px-4 py-12">
      <!-- Breadcrumb -->
      <div class="breadcrumbs text-sm mb-8">
        <ul>
          <li><RouterLink to="/">Início</RouterLink></li>
          <li><RouterLink to="/pastorais">Pastorais</RouterLink></li>
          <li>{{ pastoral.nome }}</li>
        </ul>
      </div>

      <!-- Card da Pastoral -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <!-- Cabeçalho -->
          <div class="flex flex-col items-center text-center mb-8">
            <div class="avatar placeholder mb-4">
              <div class="bg-accent text-accent-content rounded-full w-24">
                <Icon
                  :icon="pastoral.icone || 'mdi:account-group'"
                  class="text-6xl"
                />
              </div>
            </div>
            <h1 class="text-4xl font-bold mb-2">{{ pastoral.nome }}</h1>
          </div>

          <!-- Informações Principais -->
          <div class="grid gap-6 md:grid-cols-2 mb-8">
            <div v-if="pastoral.coordenador" class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-accent">
                <Icon icon="mdi:account" class="text-4xl" />
              </div>
              <div class="stat-title">Coordenador</div>
              <div class="stat-value text-2xl">{{ pastoral.coordenador }}</div>
            </div>

            <div v-if="pastoral.horarioReuniao" class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-accent">
                <Icon icon="mdi:clock-outline" class="text-4xl" />
              </div>
              <div class="stat-title">Horário de Reunião</div>
              <div class="stat-value text-2xl">{{ pastoral.horarioReuniao }}</div>
            </div>

            <div v-if="pastoral.localReuniao" class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-accent">
                <Icon icon="mdi:map-marker" class="text-4xl" />
              </div>
              <div class="stat-title">Local</div>
              <div class="stat-value text-xl">{{ pastoral.localReuniao }}</div>
            </div>

            <div v-if="pastoral.contato" class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-accent">
                <Icon icon="mdi:phone" class="text-4xl" />
              </div>
              <div class="stat-title">Contato</div>
              <div class="stat-value text-xl">{{ pastoral.contato }}</div>
            </div>
          </div>

          <!-- Descrição -->
          <div class="prose max-w-none mb-8">
            <h2 class="text-2xl font-bold mb-4">Sobre a Pastoral</h2>
            <p class="text-lg">{{ pastoral.descricao }}</p>
          </div>

          <!-- Objetivos -->
          <div v-if="pastoral.objetivos" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Objetivos</h2>
            <div class="prose max-w-none" v-html="pastoral.objetivos" />
          </div>

          <!-- Atividades -->
          <div v-if="pastoral.atividades && pastoral.atividades.length" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Atividades</h2>
            <ul class="space-y-2">
              <li
                v-for="(atividade, index) in pastoral.atividades"
                :key="index"
                class="flex items-start gap-2"
              >
                <Icon icon="mdi:check-circle" class="text-accent text-xl flex-shrink-0 mt-1" />
                <span>{{ atividade }}</span>
              </li>
            </ul>
          </div>

          <!-- Call to Action -->
          <div class="alert alert-info">
            <Icon icon="mdi:information" class="text-2xl" />
            <div>
              <h3 class="font-bold">Quer participar?</h3>
              <p>Entre em contato conosco e venha fazer parte desta pastoral!</p>
            </div>
          </div>

          <!-- Ações -->
          <div class="card-actions justify-between mt-8 pt-8 border-t border-base-300">
            <RouterLink to="/pastorais" class="btn btn-ghost gap-2">
              <Icon icon="mdi:arrow-left" />
              Voltar para Pastorais
            </RouterLink>

            <RouterLink to="/sobre" class="btn btn-accent gap-2">
              <Icon icon="mdi:phone" />
              Entrar em Contato
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="container mx-auto px-4 py-16">
      <div class="flex flex-col items-center justify-center">
        <span class="loading loading-spinner loading-lg"></span>
        <p class="mt-4 text-lg">Carregando informações...</p>
      </div>
    </div>
  </div>
</template>
