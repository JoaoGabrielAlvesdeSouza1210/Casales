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
 * Dados da paróquia
 */
const paroquia = computed(() => paroquiaStore.paroquia)

/**
 * Notícias em destaque
 */
const noticiasDestaque = computed(() => paroquiaStore.noticiasDestaque)

/**
 * Horários de missa de domingo
 */
const horariosMissaDomingo = computed(() => paroquiaStore.horariosMissaDomingo)

/**
 * Eventos recorrentes limitados
 */
const eventosRecorrentes = computed(() => paroquia.value?.eventosRecorrentes.slice(0, 3) || [])

/**
 * Formata data para exibição
 * @param data - Data no formato string
 * @returns Data formatada
 */
const formatarData = (data: string): string => dayjs(data).format('DD/MM/YYYY')
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Hero Section com Imagem -->
    <section class="hero h-full rounded-md bg-gradient-to-r from-primary via-accent to-primary">
      <div class="hero-overlay bg-opacity-20 rounded-md"></div>
      <div class="hero-content text-center text-primary-content">
        <div class="max-w-4xl">
          <div class="mb-6">
            <Icon icon="mdi:church" class="text-8xl text-accent mx-auto" />
          </div>
          <h1 class="hero-title text-5xl md:text-6xl font-bold mb-4">{{ paroquia?.nome }}</h1>
          <p v-if="paroquia?.padroeiro" class="text-2xl md:text-3xl text-accent mb-6">
            {{ paroquia.padroeiro }}
          </p>
          <p v-if="paroquia?.descricao" class="text-lg md:text-xl leading-relaxed mb-8 opacity-90">
            {{ paroquia.descricao }}
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <RouterLink to="/horarios-missas" class="btn btn-accent gap-2 px-8">
              <Icon icon="mdi:clock-outline" class="text-xl" />
              Horários das Missas
            </RouterLink>
            <RouterLink to="/localizacao" class="btn btn-outline btn-primary-content gap-2 px-8">
              <Icon icon="mdi:map-marker-outline" class="text-xl" />
              Como Chegar
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Barra de Informações Rápidas -->
    <div class="stats stats-vertical lg:stats-horizontal shadow-lg -mt-8 relative z-20 w-full bg-base-100 rounded-t-none rounded-b-md">
      <div class="stat">
        <div class="stat-figure text-primary">
          <Icon icon="mdi:phone" class="text-4xl" />
        </div>
        <div class="stat-title">Telefone</div>
        <a :href="`tel:${paroquia?.redesSociais?.telefone}`" class="stat-value text-2xl text-primary hover:text-accent">
          {{ paroquia?.redesSociais?.telefone }}
        </a>
      </div>
      
      <div class="stat">
        <div class="stat-figure text-primary">
          <Icon icon="mdi:email" class="text-4xl" />
        </div>
        <div class="stat-title">E-mail</div>
        <a :href="`mailto:${paroquia?.redesSociais?.email}`" class="stat-value text-xl lg:text-2xl text-primary hover:text-accent break-all">
          {{ paroquia?.redesSociais?.email }}
        </a>
      </div>
      
      <div class="stat">
        <div class="stat-figure text-primary">
          <Icon icon="mdi:clock-outline" class="text-4xl" />
        </div>
        <div class="stat-title">Secretaria</div>
        <div class="stat-value text-xl text-base-content">{{ paroquia?.redesSociais?.horarioSecretaria?.split('|')[0] }}</div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12 space-y-16">
      <!-- Horários de Missa do Domingo -->
      <section v-if="horariosMissaDomingo.length">
        <div class="text-center mb-10">
          <h2 class="text-4xl font-bold text-primary mb-2">Missas de Domingo</h2>
          <p class="text-base-content/70">Venha celebrar conosco a Eucaristia</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="horario in horariosMissaDomingo"
            :key="horario.id"
            class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary"
          >
            <div class="card-body items-center text-center">
              <Icon icon="mdi:clock-time-four-outline" class="text-5xl text-primary mb-3" />
              <h3 class="card-title text-3xl text-primary mb-2">{{ horario.horario }}</h3>
              <div v-if="horario.tipo !== 'Normal'" class="badge badge-accent gap-2">
                {{ horario.tipo }}
              </div>
              <p v-if="horario.observacao" class="text-sm text-base-content/70 mt-2">{{ horario.observacao }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-8">
          <RouterLink to="/horarios-missas" class="text-primary hover:text-primary font-semibold inline-flex items-center gap-2">
            Ver todos os horários
            <Icon icon="mdi:arrow-right" class="text-xl" />
          </RouterLink>
        </div>
      </section>

      <!-- Atividades e Eventos -->
      <section v-if="eventosRecorrentes.length">
        <div class="card bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
          <div class="card-body">
            <div class="text-center mb-10">
              <h2 class="card-title text-4xl justify-center text-primary mb-2">Atividades Paroquiais</h2>
              <p class="text-base-content">Participe de nossas atividades semanais</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="evento in eventosRecorrentes"
            :key="evento.id"
            class="card bg-base-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div class="card-body">
              <div class="avatar placeholder">
                <div class="bg-primary/10 text-primary rounded-full w-16">
                  <Icon :icon="evento.icone || 'mdi:calendar'" class="text-4xl" />
                </div>
              </div>
              <h3 class="card-title text-primary">{{ evento.titulo }}</h3>
              <div class="space-y-2 text-base-content">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:calendar" class="text-primary/80" />
                  <span class="text-sm">{{ evento.diaSemana }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:clock-outline" class="text-primary/80" />
                  <span class="text-sm">{{ evento.horario }}</span>
                </div>
                <div v-if="evento.local" class="flex items-center gap-2">
                  <Icon icon="mdi:map-marker" class="text-primary/80" />
                  <span class="text-sm">{{ evento.local }}</span>
                </div>
                <p v-if="evento.descricao" class="text-sm text-base-content/70 mt-3">{{ evento.descricao }}</p>
              </div>
            </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <!-- Serviços Paroquiais -->
      <section>
        <div class="text-center mb-10">
          <h2 class="text-4xl font-bold text-primary mb-2">Serviços Paroquiais</h2>
          <p class="text-base-content/70">Estamos aqui para servir você</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink to="/intencoes-missa" class="card bg-base-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div class="card-body">
              <div class="avatar placeholder">
                <div class="bg-primary/10 text-primary rounded-full w-16 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon icon="mdi:candle" class="text-4xl" />
                </div>
              </div>
              <h3 class="card-title text-primary">Intenções de Missa</h3>
              <p class="text-base-content/70">Envie suas intenções para celebração da Santa Missa</p>
            </div>
          </RouterLink>

          <RouterLink to="/agendar-confissao" class="card bg-base-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div class="card-body">
              <div class="avatar placeholder">
                <div class="bg-primary/10 text-primary rounded-full w-16 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon icon="mdi:hands-pray" class="text-4xl" />
                </div>
              </div>
              <h3 class="card-title text-primary">Agendar Confissão</h3>
              <p class="text-base-content/70">Agende seu horário para o sacramento da reconciliação</p>
            </div>
          </RouterLink>

          <RouterLink to="/solicitar-visita" class="card bg-base-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div class="card-body">
              <div class="avatar placeholder">
                <div class="bg-primary/10 text-primary rounded-full w-16 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon icon="mdi:home-heart" class="text-4xl" />
                </div>
              </div>
              <h3 class="card-title text-primary">Visita Pastoral</h3>
              <p class="text-base-content/70">Solicite a visita de um padre para enfermos ou idosos</p>
            </div>
          </RouterLink>

          <RouterLink to="/pastorais" class="card bg-base-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div class="card-body">
              <div class="avatar placeholder">
                <div class="bg-primary/10 text-primary rounded-full w-16 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon icon="mdi:account-group" class="text-4xl" />
                </div>
              </div>
              <h3 class="card-title text-primary">Pastorais</h3>
              <p class="text-base-content/70">Conheça as pastorais e venha servir conosco</p>
            </div>
          </RouterLink>

          <RouterLink to="/liturgia-diaria" class="card bg-base-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div class="card-body">
              <div class="avatar placeholder">
                <div class="bg-primary/10 text-primary rounded-full w-16 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon icon="mdi:book-open-variant" class="text-4xl" />
                </div>
              </div>
              <h3 class="card-title text-primary">Liturgia Diária</h3>
              <p class="text-base-content/70">Acompanhe as leituras e reflexões do dia</p>
            </div>
          </RouterLink>

          <RouterLink to="/sobre" class="card bg-base-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div class="card-body">
              <div class="avatar placeholder">
                <div class="bg-primary/10 text-primary rounded-full w-16 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon icon="mdi:information-outline" class="text-4xl" />
                </div>
              </div>
              <h3 class="card-title text-primary">Sobre a Paróquia</h3>
              <p class="text-base-content/70">Conheça nossa história e missão</p>
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- Notícias em Destaque -->
      <section v-if="noticiasDestaque.length" class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <div class="text-center mb-10">
            <h2 class="card-title text-4xl justify-center text-primary mb-2">Notícias e Avisos</h2>
            <p class="text-base-content/70">Fique por dentro das novidades da paróquia</p>
          </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RouterLink
            v-for="noticia in noticiasDestaque"
            :key="noticia.id"
            :to="`/noticias/${noticia.id}`"
            class="card bg-base-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <figure v-if="noticia.imagem" class="h-48 overflow-hidden">
              <img :src="noticia.imagem" :alt="noticia.titulo" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </figure>
            <figure v-else class="h-48 bg-gradient-to-br from-primary to-primary flex items-center justify-center">
              <Icon icon="mdi:newspaper-variant" class="text-6xl text-white/50" />
            </figure>
            <div class="card-body">
              <div class="badge badge-ghost gap-2">
                <Icon icon="mdi:calendar" />
                <span>{{ formatarData(noticia.data_publicacao) }}</span>
              </div>
              <h3 class="card-title text-primary group-hover:text-accent transition-colors">{{ noticia.titulo }}</h3>
              <p class="text-base-content/70 line-clamp-3">{{ noticia.resumo }}</p>
            </div>
          </RouterLink>
        </div>
        <div class="card-actions justify-center mt-8">
          <RouterLink to="/noticias" class="btn btn-primary gap-2">
            Ver todas as notícias
            <Icon icon="mdi:arrow-right" class="text-xl" />
          </RouterLink>
        </div>
        </div>
      </section>
    </div>
  </div>
</template>