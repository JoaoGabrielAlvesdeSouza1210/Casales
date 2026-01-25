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
  <div class="min-h-screen bg-base-200">
    <!-- Hero -->
    <section class="hero min-h-[40vh] bg-gradient-to-r from-primary to-primary">
      <div class="hero-content text-center text-primary-content">
        <div class="max-w-4xl">
          <Icon icon="mdi:church" class="text-6xl mx-auto mb-4" />
          <h1 class="hero-title text-5xl font-bold mb-4">Sobre a Paróquia</h1>
          <p class="text-xl text-primary-content/80">Conheça nossa história e missão</p>
        </div>
      </div>
    </section>

    <div v-if="paroquia" class="container mx-auto px-4 py-12 space-y-12">
      <!-- Card Principal -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <div class="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div class="avatar placeholder">
              <div class="bg-primary/10 text-primary rounded-full w-24">
                <Icon icon="mdi:church" class="text-7xl" />
              </div>
            </div>
            <div class="flex-1 text-center md:text-left">
              <h2 class="card-title text-4xl text-primary mb-2">{{ paroquia.nome }}</h2>
              <p class="text-2xl text-primary/80 mb-2">{{ paroquia.padroeiro }}</p>
              <p v-if="paroquia.diocese" class="text-base-content/70 text-lg">{{ paroquia.diocese }}</p>
            </div>
          </div>
          
          <div v-if="paroquia.descricao" class="prose max-w-none">
            <p class="text-lg text-base-content leading-relaxed">{{ paroquia.descricao }}</p>
          </div>
        </div>
      </div>

      <!-- Informações de Contato -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h3 class="card-title text-2xl text-primary mb-6">
              <div class="avatar placeholder">
                <div class="bg-primary/10 text-primary rounded w-10">
                  <Icon icon="mdi:map-marker" class="text-3xl" />
                </div>
              </div>
              Endereço
            </h3>
            <address v-if="paroquia.localizacao" class="not-italic text-base-content space-y-2">
              <p class="font-semibold">{{ paroquia.localizacao.endereco }}</p>
              <p>{{ paroquia.localizacao.cidade }} - {{ paroquia.localizacao.estado }}</p>
              <p>CEP: {{ paroquia.localizacao.cep }}</p>
            </address>
          </div>
        </div>

        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h3 class="card-title text-2xl text-primary mb-6">
              <div class="avatar placeholder">
                <div class="bg-primary/10 text-primary rounded w-10">
                  <Icon icon="mdi:phone" class="text-3xl" />
                </div>
              </div>
              Contato
            </h3>
            <div class="space-y-4">
              <a v-if="paroquia.redesSociais?.telefone" :href="`tel:${paroquia.redesSociais.telefone}`" class="flex items-center gap-3 text-base-content hover:text-primary transition-colors">
                <Icon icon="mdi:phone" class="text-2xl" />
                <span class="text-lg">{{ paroquia.redesSociais.telefone }}</span>
              </a>
              <a v-if="paroquia.redesSociais?.whatsapp" :href="`https://wa.me/${paroquia.redesSociais.whatsapp.replace(/\D/g, '')}`" target="_blank" class="flex items-center gap-3 text-base-content hover:text-primary transition-colors">
                <Icon icon="mdi:whatsapp" class="text-2xl" />
                <span class="text-lg">{{ paroquia.redesSociais.whatsapp }}</span>
              </a>
              <a v-if="paroquia.redesSociais?.email" :href="`mailto:${paroquia.redesSociais.email}`" class="flex items-center gap-3 text-base-content hover:text-primary transition-colors">
                <Icon icon="mdi:email" class="text-2xl" />
                <span class="text-lg">{{ paroquia.redesSociais.email }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Horário da Secretaria -->
      <div v-if="paroquia.redesSociais?.horarioSecretaria" class="alert alert-info shadow-lg">
        <Icon icon="mdi:clock-outline" class="text-4xl flex-shrink-0" />
        <div>
          <h3 class="font-bold text-xl mb-2">Horário de Atendimento da Secretaria</h3>
          <p>{{ paroquia.redesSociais.horarioSecretaria }}</p>
        </div>
      </div>

      <!-- Redes Sociais -->
      <div v-if="paroquia.redesSociais" class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h3 class="card-title text-2xl text-primary justify-center mb-6">Siga-nos nas Redes Sociais</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <a v-if="paroquia.redesSociais.facebook" :href="paroquia.redesSociais.facebook" target="_blank" class="btn btn-primary gap-2">
              <Icon icon="mdi:facebook" class="text-2xl" />
              Facebook
            </a>
            <a v-if="paroquia.redesSociais.instagram" :href="paroquia.redesSociais.instagram" target="_blank" class="btn btn-secondary gap-2">
              <Icon icon="mdi:instagram" class="text-2xl" />
              Instagram
            </a>
            <a v-if="paroquia.redesSociais.youtube" :href="paroquia.redesSociais.youtube" target="_blank" class="btn btn-error gap-2">
              <Icon icon="mdi:youtube" class="text-2xl" />
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container mx-auto px-4 py-16">
      <div class="flex flex-col items-center justify-center gap-4">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="text-lg text-base-content/70">Carregando informações...</p>
      </div>
    </div>
  </div>
</template>