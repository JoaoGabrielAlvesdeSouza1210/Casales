<script setup lang="ts">
import { ref, computed } from 'vue'
import { useParoquiaStore } from '@/stores/paroquia'
import { Icon } from '@iconify/vue'

const paroquiaStore = useParoquiaStore()
const paroquia = computed(() => paroquiaStore.paroquia)

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="navbar bg-base-100 shadow-lg sticky top-0 z-50 border-b-4 border-primary">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle lg:hidden" @click="toggleMobileMenu">
          <Icon :icon="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="text-3xl" />
        </label>
        <ul v-if="mobileMenuOpen" tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-64">
          <li><RouterLink to="/" @click="closeMobileMenu"><Icon icon="mdi:home" class="text-xl" />Início</RouterLink></li>
          <li><RouterLink to="/sobre" @click="closeMobileMenu"><Icon icon="mdi:information-outline" class="text-xl" />Sobre</RouterLink></li>
          <li><RouterLink to="/horarios-missas" @click="closeMobileMenu"><Icon icon="mdi:clock-outline" class="text-xl" />Horários das Missas</RouterLink></li>
          <li><RouterLink to="/liturgia-diaria" @click="closeMobileMenu"><Icon icon="mdi:book-open-variant" class="text-xl" />Liturgia Diária</RouterLink></li>
          <li><RouterLink to="/pastorais" @click="closeMobileMenu"><Icon icon="mdi:account-group" class="text-xl" />Pastorais</RouterLink></li>
          <li><RouterLink to="/noticias" @click="closeMobileMenu"><Icon icon="mdi:newspaper-variant-outline" class="text-xl" />Notícias</RouterLink></li>
          <li><RouterLink to="/localizacao" @click="closeMobileMenu"><Icon icon="mdi:map-marker-outline" class="text-xl" />Localização</RouterLink></li>
        </ul>
      </div>
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl gap-2" @click="closeMobileMenu">
        <Icon icon="mdi:church" class="text-4xl text-primary" />
        <div class="flex flex-col items-start">
          <span class="text-base font-bold text-primary hidden md:block">
            {{ paroquia?.nome || 'Paróquia' }}
          </span>
          <span v-if="paroquia?.padroeiro" class="text-xs text-base-content/70 hidden md:block">
            {{ paroquia.padroeiro }}
          </span>
        </div>
      </RouterLink>
    </div>
    
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-1">
        <li><RouterLink to="/" class="gap-2"><Icon icon="mdi:home" class="text-xl" />Início</RouterLink></li>
        <li><RouterLink to="/sobre" class="gap-2"><Icon icon="mdi:information-outline" class="text-xl" />Sobre</RouterLink></li>
        <li><RouterLink to="/horarios-missas" class="gap-2"><Icon icon="mdi:clock-outline" class="text-xl" />Horários</RouterLink></li>
        <li><RouterLink to="/liturgia-diaria" class="gap-2"><Icon icon="mdi:book-open-variant" class="text-xl" />Liturgia</RouterLink></li>
        <li><RouterLink to="/pastorais" class="gap-2"><Icon icon="mdi:account-group" class="text-xl" />Pastorais</RouterLink></li>
        <li><RouterLink to="/noticias" class="gap-2"><Icon icon="mdi:newspaper-variant-outline" class="text-xl" />Notícias</RouterLink></li>
        <li><RouterLink to="/localizacao" class="gap-2"><Icon icon="mdi:map-marker-outline" class="text-xl" />Localização</RouterLink></li>
      </ul>
    </div>
    
    <div class="navbar-end">
    </div>
  </header>
</template>

<style scoped>
.menu :where(li:not(.menu-title) > *:not(ul):not(details):not(.menu-title)),
.menu :where(li:not(.menu-title) > details > summary:not(.menu-title)) {
  border-radius: var(--rounded-btn, 0.5rem);
}

.router-link-active {
  background-color: hsl(var(--p) / 0.1);
  color: hsl(var(--p));
  font-weight: 600;
}

.dropdown-content {
  min-width: 16rem;
}
</style>
