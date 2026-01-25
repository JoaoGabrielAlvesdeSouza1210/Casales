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

/**
 * Horários de missa de domingo
 */
const horariosMissaDomingo = computed(() => paroquiaStore.horariosMissaDomingo)

/**
 * Horários de missa durante a semana
 */
const horariosMissaSemana = computed(() => paroquiaStore.horariosMissaSemana)

/**
 * Dias da semana ordenados
 */
const diasOrdenados: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

/**
 * Agrupa horários por dia da semana
 * @param horarios - Lista de horários
 * @returns Horários agrupados por dia
 */
const agruparPorDia = (horarios: any[]): Record<string, any[]> => {
  const agrupado: Record<string, any[]> = {}
  horarios.forEach(horario => {
    if (horario?.diaSemana) {
      if (!agrupado[horario.diaSemana]) {
        agrupado[horario.diaSemana] = []
      }
      agrupado[horario.diaSemana]?.push(horario)
    }
  })
  return agrupado
}

/**
 * Horários agrupados por dia
 */
const horariosPorDia = computed(() => agruparPorDia(horariosMissaSemana.value))
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Hero -->
    <section class="hero min-h-[40vh] bg-gradient-to-r from-primary to-primary">
      <div class="hero-content text-center text-primary-content">
        <div class="max-w-4xl">
          <Icon icon="mdi:clock-outline" class="text-6xl mx-auto mb-4" />
          <h1 class="hero-title text-5xl font-bold mb-4">Horários das Missas</h1>
          <p class="text-xl text-primary-content/80">Venha celebrar conosco a Eucaristia</p>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4 py-12 space-y-12">
      <!-- Missas de Domingo -->
      <div v-if="horariosMissaDomingo.length" class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h2 class="card-title text-3xl text-primary mb-6 justify-center">
            <Icon icon="mdi:church" class="text-4xl" />
            Missas de Domingo
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div
              v-for="horario in horariosMissaDomingo"
              :key="horario.id"
              class="card bg-gradient-to-br from-primary to-primary text-primary-content shadow-md hover:shadow-xl transition-all"
            >
              <div class="card-body items-center text-center">
                <Icon icon="mdi:clock-time-four-outline" class="text-5xl mb-3" />
                <p class="text-4xl font-bold mb-2">{{ horario.horario }}</p>
                <div v-if="horario.tipo !== 'Normal'" class="badge badge-accent gap-2">
                  {{ horario.tipo }}
                </div>
                <p v-if="horario.observacao" class="text-sm mt-3 opacity-90">
                  {{ horario.observacao }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Missas da Semana -->
      <div v-if="horariosMissaSemana.length" class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h2 class="card-title text-3xl text-primary mb-6 justify-center">
            <Icon icon="mdi:calendar-week" class="text-4xl" />
            Missas Durante a Semana
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="dia in diasOrdenados"
              :key="dia"
              class="card bg-base-200 border-l-4 border-primary hover:shadow-md transition-shadow"
            >
              <div class="card-body">
                <h3 class="card-title text-xl text-primary">
                  <Icon icon="mdi:calendar-blank" class="text-2xl" />
                  {{ dia }}
                </h3>
                <div v-if="horariosPorDia[dia]" class="space-y-3">
                  <div
                    v-for="horario in horariosPorDia[dia]"
                    :key="horario.id"
                    class="flex items-center gap-3 bg-base-100 p-3 rounded-md"
                  >
                    <Icon icon="mdi:clock-outline" class="text-2xl text-primary" />
                    <span class="text-lg font-semibold text-base-content">{{ horario.horario }}</span>
                    <div v-if="horario.tipo !== 'Normal'" class="badge badge-accent ml-auto">
                      {{ horario.tipo }}
                    </div>
                  </div>
                  <div
                    v-for="horario in horariosPorDia[dia].filter(h => h.observacao)"
                    :key="`obs-${horario.id}`"
                    class="text-sm text-base-content/70 italic pl-9"
                  >
                    {{ horario.observacao }}
                  </div>
                </div>
                <div v-else class="flex items-center gap-2 text-base-content/40 italic">
                  <Icon icon="mdi:information-outline" />
                  <span>Sem missa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Informação Adicional -->
      <div class="alert alert-info shadow-lg">
        <Icon icon="mdi:information" class="text-4xl flex-shrink-0" />
        <div>
          <h3 class="font-bold text-xl mb-2">Informações Importantes</h3>
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <Icon icon="mdi:circle-small" class="text-xl flex-shrink-0 mt-1" />
              <span>Chegar com 15 minutos de antecedência</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:circle-small" class="text-xl flex-shrink-0 mt-1" />
              <span>Em dias de festa litúrgica, os horários podem sofrer alterações</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:circle-small" class="text-xl flex-shrink-0 mt-1" />
              <span>Confira sempre nossas redes sociais para informações atualizadas</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!horariosMissaDomingo.length && !horariosMissaSemana.length" class="card bg-base-100 shadow-lg">
        <div class="card-body items-center text-center py-16">
          <Icon icon="mdi:calendar-alert" class="text-6xl text-base-content/30 mb-4" />
          <p class="text-xl text-base-content/50">Nenhum horário de missa cadastrado</p>
        </div>
      </div>
    </div>
  </div>
</template>