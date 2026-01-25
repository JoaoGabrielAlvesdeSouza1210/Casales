<script setup lang="ts">
import { computed } from 'vue'
import { useParoquiaStore } from '@/stores/paroquia'
import { Icon } from '@iconify/vue'

const paroquiaStore = useParoquiaStore()
const paroquia = computed(() => paroquiaStore.paroquia)
const redesSociais = computed(() => paroquia.value?.redesSociais)

const anoAtual = new Date().getFullYear()
</script>

<template>
  <footer class="footer footer-center bg-base-200 text-base-content p-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
      <!-- Informações da Paróquia -->
      <div class="text-left">
        <div class="flex items-center gap-2 mb-4">
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content rounded-full w-12">
              <Icon icon="mdi:church" class="text-2xl" />
            </div>
          </div>
          <div>
            <h3 class="footer-title text-lg font-bold opacity-100 mb-0">{{ paroquia?.nome }}</h3>
            <p v-if="paroquia?.padroeiro" class="text-sm text-primary">
              {{ paroquia.padroeiro }}
            </p>
          </div>
        </div>
        <p v-if="paroquia?.diocese" class="text-sm opacity-70">
          {{ paroquia.diocese }}
        </p>
      </div>

      <!-- Endereço -->
      <div class="text-left">
        <span class="footer-title opacity-100 mb-4 flex items-center gap-2">
          <Icon icon="mdi:map-marker" class="text-xl text-primary" />
          Endereço
        </span>
        <address v-if="paroquia?.localizacao" class="not-italic text-sm opacity-70 leading-relaxed">
          {{ paroquia.localizacao.endereco }}<br>
          {{ paroquia.localizacao.cidade }} - {{ paroquia.localizacao.estado }}<br>
          CEP: {{ paroquia.localizacao.cep }}
        </address>
        <div v-if="paroquia?.redesSociais?.horarioSecretaria" class="mt-4 pt-4 border-t border-base-300">
          <p class="text-sm font-semibold opacity-100 mb-1">Horário da Secretaria:</p>
          <p class="text-sm opacity-70">{{ paroquia.redesSociais.horarioSecretaria }}</p>
        </div>
      </div>

      <!-- Contato -->
      <div class="text-left">
        <span class="footer-title opacity-100 mb-4 flex items-center gap-2">
          <Icon icon="mdi:phone" class="text-xl text-primary" />
          Contato
        </span>
        <nav class="flex flex-col gap-3">
          <a 
            v-if="paroquia?.redesSociais?.telefone" 
            :href="`tel:${paroquia.redesSociais.telefone}`"
            class="link link-hover flex items-center gap-2 text-sm"
          >
            <Icon icon="mdi:phone" class="text-lg" />
            {{ paroquia.redesSociais.telefone }}
          </a>
          <a 
            v-if="paroquia?.redesSociais?.whatsapp" 
            :href="`https://wa.me/${paroquia.redesSociais.whatsapp.replace(/\D/g, '')}`"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-hover flex items-center gap-2 text-sm"
          >
            <Icon icon="mdi:whatsapp" class="text-lg" />
            {{ paroquia.redesSociais.whatsapp }}
          </a>
          <a 
            v-if="paroquia?.redesSociais?.email" 
            :href="`mailto:${paroquia.redesSociais.email}`"
            class="link link-hover flex items-center gap-2 text-sm"
          >
            <Icon icon="mdi:email" class="text-lg" />
            {{ paroquia.redesSociais.email }}
          </a>
        </nav>
      </div>

      <!-- Links Rápidos -->
      <div class="text-left">
        <span class="footer-title opacity-100">Links Rápidos</span>
        <nav class="flex flex-col gap-2">
          <RouterLink to="/horarios-missas" class="link link-hover text-sm flex items-center gap-2">
            <Icon icon="mdi:chevron-right" />
            Horários das Missas
          </RouterLink>
          <RouterLink to="/intencoes-missa" class="link link-hover text-sm flex items-center gap-2">
            <Icon icon="mdi:chevron-right" />
            Intenções de Missa
          </RouterLink>
          <RouterLink to="/agendar-confissao" class="link link-hover text-sm flex items-center gap-2">
            <Icon icon="mdi:chevron-right" />
            Agendar Confissão
          </RouterLink>
          <RouterLink to="/solicitar-visita" class="link link-hover text-sm flex items-center gap-2">
            <Icon icon="mdi:chevron-right" />
            Solicitar Visita
          </RouterLink>
          <RouterLink to="/pastorais" class="link link-hover text-sm flex items-center gap-2">
            <Icon icon="mdi:chevron-right" />
            Pastorais
          </RouterLink>
          <RouterLink to="/localizacao" class="link link-hover text-sm flex items-center gap-2">
            <Icon icon="mdi:chevron-right" />
            Localização
          </RouterLink>
        </nav>
      </div>
    </div>
  </footer>

  <!-- Copyright e Redes Sociais -->
  <footer class="footer footer-center bg-base-300 text-base-content p-4">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 w-full max-w-7xl">
      <p class="text-sm opacity-70">
        © {{ anoAtual }} {{ paroquia?.nome || 'Paróquia' }}. Todos os direitos reservados.
      </p>
      
      <div v-if="redesSociais" class="flex gap-2">
        <a 
          v-if="redesSociais?.facebook" 
          :href="redesSociais.facebook" 
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-circle btn-ghost btn-sm"
          aria-label="Facebook"
        >
          <Icon icon="mdi:facebook" class="text-2xl" />
        </a>
        <a 
          v-if="redesSociais?.instagram" 
          :href="redesSociais.instagram" 
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-circle btn-ghost btn-sm"
          aria-label="Instagram"
        >
          <Icon icon="mdi:instagram" class="text-2xl" />
        </a>
        <a 
          v-if="redesSociais?.youtube" 
          :href="redesSociais.youtube" 
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-circle btn-ghost btn-sm"
          aria-label="YouTube"
        >
          <Icon icon="mdi:youtube" class="text-2xl" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
