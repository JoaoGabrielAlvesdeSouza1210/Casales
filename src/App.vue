<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useParoquiaStore } from './stores/paroquia'
import DefaultLayout from './layouts/DefaultLayout.vue'

const paroquiaStore = useParoquiaStore()

/**
 * Carrega os dados iniciais da paróquia
 */
onMounted(async () => {
  // TODO: Obter ID da paróquia da URL ou configuração
  const paroquiaId = '1'
  await paroquiaStore.carregarParoquia(paroquiaId)
  await paroquiaStore.carregarNoticias(paroquiaId)
})
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
