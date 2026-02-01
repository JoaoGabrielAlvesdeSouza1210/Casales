<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { pastoralService } from '@/services/pastoralService'
import type { Pastoral } from '@/types/paroquia'

const pastorais = ref<Pastoral[]>([])
const isLoading = ref(true)
const pastoralSelecionada = ref<Pastoral | null>(null)

onMounted(async () => {
  await loadPastorais()
})

async function loadPastorais() {
  isLoading.value = true
  try {
    const todas = await pastoralService.getAll()
    // Apenas pastorais ativas na área pública
    pastorais.value = todas.filter(p => p.ativa)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function abrirDetalhes(pastoral: Pastoral) {
  pastoralSelecionada.value = pastoral
  const modal = document.getElementById('modal_pastoral') as HTMLDialogElement
  modal?.showModal()
}

function fecharDetalhes() {
  const modal = document.getElementById('modal_pastoral') as HTMLDialogElement
  modal?.close()
  pastoralSelecionada.value = null
}
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Hero Section -->
    <div class="hero bg-base-100 py-20">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <Icon icon="mdi:account-group" class="text-6xl text-primary mx-auto mb-4" />
          <h1 class="text-5xl font-bold">Nossas Pastorais</h1>
          <p class="py-6 text-lg">
            Conheça os grupos e pastorais que atuam em nossa paróquia, 
            trabalhando juntos na evangelização e serviço à comunidade.
          </p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- Pastorais Grid -->
    <div v-else class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="pastoral in pastorais"
          :key="pastoral.id"
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          @click="abrirDetalhes(pastoral)"
        >
          <figure v-if="pastoral.imagem" class="h-56">
            <img 
              :src="pastoral.imagem" 
              :alt="pastoral.nome" 
              class="w-full h-full object-cover"
            />
          </figure>
          <div v-else class="h-56 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Icon 
              :icon="pastoral.icone || 'mdi:account-group'" 
              class="text-8xl text-primary/40" 
            />
          </div>
          
          <div class="card-body">
            <h2 class="card-title text-2xl">
              <Icon :icon="pastoral.icone || 'mdi:account-group'" class="text-primary" />
              {{ pastoral.nome }}
            </h2>
            
            <p class="text-base-content/70 line-clamp-3">
              {{ pastoral.descricao }}
            </p>

            <div class="space-y-2 mt-4">
              <div v-if="pastoral.coordenador" class="flex items-center gap-2 text-sm">
                <Icon icon="mdi:account" class="text-lg text-primary" />
                <span class="font-medium">{{ pastoral.coordenador }}</span>
              </div>

              <div v-if="pastoral.horarioReuniao" class="flex items-center gap-2 text-sm">
                <Icon icon="mdi:clock-outline" class="text-lg text-primary" />
                <span>{{ pastoral.horarioReuniao }}</span>
              </div>

              <div v-if="pastoral.localReuniao" class="flex items-center gap-2 text-sm">
                <Icon icon="mdi:map-marker" class="text-lg text-primary" />
                <span>{{ pastoral.localReuniao }}</span>
              </div>
            </div>

            <div class="card-actions justify-end mt-4">
              <button class="btn btn-primary btn-sm">
                Ver mais
                <Icon icon="mdi:arrow-right" />
              </button>
            </div>
          </div>
        </div>

        <div v-if="pastorais.length === 0" class="col-span-full">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body items-center text-center py-20">
              <Icon icon="mdi:information" class="text-6xl text-base-content/30 mb-4" />
              <h3 class="text-2xl font-bold">Nenhuma pastoral cadastrada</h3>
              <p class="text-base-content/60">Em breve teremos mais informações.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <dialog id="modal_pastoral" class="modal">
      <div class="modal-box max-w-3xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <Icon icon="mdi:close" class="text-xl" />
          </button>
        </form>

        <div v-if="pastoralSelecionada">
          <figure v-if="pastoralSelecionada.imagem" class="rounded-lg overflow-hidden mb-6">
            <img 
              :src="pastoralSelecionada.imagem" 
              :alt="pastoralSelecionada.nome"
              class="w-full h-64 object-cover"
            />
          </figure>

          <div class="flex items-center gap-3 mb-4">
            <Icon 
              :icon="pastoralSelecionada.icone || 'mdi:account-group'" 
              class="text-4xl text-primary" 
            />
            <h3 class="text-3xl font-bold">{{ pastoralSelecionada.nome }}</h3>
          </div>

          <p class="text-lg mb-6">{{ pastoralSelecionada.descricao }}</p>

          <div class="divider"></div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div v-if="pastoralSelecionada.coordenador" class="flex items-start gap-3">
              <Icon icon="mdi:account" class="text-2xl text-primary mt-1" />
              <div>
                <p class="font-bold">Coordenador</p>
                <p>{{ pastoralSelecionada.coordenador }}</p>
              </div>
            </div>

            <div v-if="pastoralSelecionada.contato" class="flex items-start gap-3">
              <Icon icon="mdi:phone" class="text-2xl text-primary mt-1" />
              <div>
                <p class="font-bold">Contato</p>
                <p>{{ pastoralSelecionada.contato }}</p>
              </div>
            </div>

            <div v-if="pastoralSelecionada.horarioReuniao" class="flex items-start gap-3">
              <Icon icon="mdi:clock-outline" class="text-2xl text-primary mt-1" />
              <div>
                <p class="font-bold">Horário</p>
                <p>{{ pastoralSelecionada.horarioReuniao }}</p>
              </div>
            </div>

            <div v-if="pastoralSelecionada.localReuniao" class="flex items-start gap-3">
              <Icon icon="mdi:map-marker" class="text-2xl text-primary mt-1" />
              <div>
                <p class="font-bold">Local</p>
                <p>{{ pastoralSelecionada.localReuniao }}</p>
              </div>
            </div>
          </div>

          <div v-if="pastoralSelecionada.objetivos" class="mb-6">
            <div class="divider"></div>
            <h4 class="font-bold text-xl mb-3 flex items-center gap-2">
              <Icon icon="mdi:target" class="text-primary" />
              Objetivos
            </h4>
            <p class="whitespace-pre-line">{{ pastoralSelecionada.objetivos }}</p>
          </div>

          <div v-if="pastoralSelecionada.atividades && pastoralSelecionada.atividades.length > 0" class="mb-6">
            <div class="divider"></div>
            <h4 class="font-bold text-xl mb-3 flex items-center gap-2">
              <Icon icon="mdi:format-list-checks" class="text-primary" />
              Atividades
            </h4>
            <ul class="space-y-2">
              <li 
                v-for="(atividade, index) in pastoralSelecionada.atividades" 
                :key="index"
                class="flex items-start gap-2"
              >
                <Icon icon="mdi:check-circle" class="text-success text-xl mt-0.5" />
                <span>{{ atividade }}</span>
              </li>
            </ul>
          </div>

          <div class="modal-action">
            <form method="dialog">
              <button class="btn btn-primary">
                <Icon icon="mdi:check" />
                Entendi
              </button>
            </form>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>fechar</button>
      </form>
    </dialog>
  </div>
</template>
