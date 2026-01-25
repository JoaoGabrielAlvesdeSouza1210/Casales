<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useParoquiaStore } from '@/stores/paroquia'
import { Icon } from '@iconify/vue'

/**
 * Store da paróquia
 */
const paroquiaStore = useParoquiaStore()

/**
 * Pastorais disponíveis
 */
const pastorais = computed(() => paroquiaStore.paroquia?.pastorais || [])
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Hero Section -->
    <section class="hero min-h-[40vh] bg-gradient-to-r from-primary to-accent">
      <div class="hero-content text-center text-primary-content">
        <div class="max-w-4xl">
          <Icon icon="mdi:account-group" class="text-8xl mx-auto mb-4" />
          <h1 class="text-5xl font-bold mb-4">Pastorais</h1>
          <p class="text-xl">Conheça nossas pastorais e venha servir conosco</p>
        </div>
      </div>
    </section>

    <!-- Lista de Pastorais -->
    <div class="container mx-auto px-4 py-12">
      <div v-if="pastorais.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="pastoral in pastorais"
          :key="pastoral.id"
          :to="`/pastorais/${pastoral.id}`"
          class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
        >
          <!-- Ícone -->
          <div class="card-body">
            <div class="flex justify-center mb-4">
              <div class="avatar placeholder">
                <div class="bg-accent text-accent-content rounded-full w-20">
                  <Icon
                    :icon="pastoral.icone || 'mdi:account-group'"
                    class="text-5xl"
                  />
                </div>
              </div>
            </div>

            <!-- Título -->
            <h2 class="card-title justify-center text-2xl">
              {{ pastoral.nome }}
            </h2>

            <!-- Descrição -->
            <p class="text-base-content/70 text-center line-clamp-3">
              {{ pastoral.descricao }}
            </p>

            <!-- Informações Adicionais -->
            <div class="space-y-2 mt-4">
              <div v-if="pastoral.coordenador" class="flex items-center gap-2 text-sm">
                <Icon icon="mdi:account" class="text-base-content/70" />
                <span>{{ pastoral.coordenador }}</span>
              </div>
              <div v-if="pastoral.horarioReuniao" class="flex items-center gap-2 text-sm">
                <Icon icon="mdi:clock-outline" class="text-base-content/70" />
                <span>{{ pastoral.horarioReuniao }}</span>
              </div>
            </div>

            <!-- Ação -->
            <div class="card-actions justify-center mt-6">
              <div class="badge badge-accent gap-2">
                Saiba mais
                <Icon icon="mdi:arrow-right" />
              </div>
            </div>
          </div>
        </RouterLink>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <Icon icon="mdi:account-group-outline" class="text-6xl text-base-content/30 mb-4 mx-auto" />
        <h2 class="text-2xl font-bold mb-2">Nenhuma pastoral cadastrada</h2>
        <p class="text-base-content/50">Em breve teremos informações sobre nossas pastorais</p>
      </div>

      <!-- Call to Action -->
      <div class="mt-12 p-8 bg-base-200 rounded-lg text-center">
        <Icon icon="mdi:hand-heart" class="text-6xl text-accent mx-auto mb-4" />
        <h3 class="text-2xl font-bold mb-4">Venha servir conosco!</h3>
        <p class="text-lg mb-6 text-base-content/70">
          Todas as pastorais estão abertas para novos membros.
          Entre em contato conosco e descubra como você pode contribuir.
        </p>
        <RouterLink to="/sobre" class="btn btn-accent btn-lg gap-2">
          <Icon icon="mdi:phone" />
          Entrar em Contato
        </RouterLink>
      </div>
    </div>
  </div>
</template>
