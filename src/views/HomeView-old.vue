<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useParoquiaStore } from '@/stores/paroquia'
import { Icon } from '@iconify/vue'

const paroquiaStore = useParoquiaStore()
const paroquia = computed(() => paroquiaStore.paroquia)
const noticiasDestaque = computed(() => paroquiaStore.noticiasDestaque)
const horariosMissaDomingo = computed(() => paroquiaStore.horariosMissaDomingo)
const eventosRecorrentes = computed(() => paroquia.value?.eventosRecorrentes.slice(0, 3) || [])
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">{{ paroquia?.nome }}</h1>
        <p v-if="paroquia?.padroeiro" class="hero-subtitle">
          Padroeiro: {{ paroquia.padroeiro }}
        </p>
        <p v-if="paroquia?.descricao" class="hero-description">
          {{ paroquia.descricao }}
        </p>
        <div class="hero-actions">
          <RouterLink to="/horarios-missas" class="btn btn-primary">
            <Icon icon="mdi:clock" />
            Horários das Missas
          </RouterLink>
          <RouterLink to="/localizacao" class="btn btn-secondary">
            <Icon icon="mdi:map-marker" />
            Como Chegar
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Horários de Missa -->
    <section v-if="horariosMissaDomingo.length" class="section">
      <h2 class="section-title">Missas de Domingo</h2>
      <div class="horarios-grid">
        <div
          v-for="horario in horariosMissaDomingo"
          :key="horario.id"
          class="horario-card"
        >
          <Icon icon="mdi:clock-outline" class="horario-icon" />
          <span class="horario-time">{{ horario.horario }}</span>
          <span v-if="horario.tipo !== 'Normal'" class="horario-tipo">
            {{ horario.tipo }}
          </span>
        </div>
      </div>
      <div class="section-link">
        <RouterLink to="/horarios-missas">
          Ver todos os horários →
        </RouterLink>
      </div>
    </section>

    <!-- Eventos Recorrentes -->
    <section v-if="eventosRecorrentes.length" class="section section-alt">
      <h2 class="section-title">Eventos Regulares</h2>
      <div class="eventos-grid">
        <div
          v-for="evento in eventosRecorrentes"
          :key="evento.id"
          class="evento-card"
        >
          <Icon
            :icon="evento.icone || 'mdi:calendar'"
            class="evento-icon"
          />
          <h3 class="evento-titulo">{{ evento.titulo }}</h3>
          <p class="evento-info">
            <Icon icon="mdi:clock" />
            {{ evento.diaSemana }} - {{ evento.horario }}
          </p>
          <p v-if="evento.local" class="evento-info">
            <Icon icon="mdi:map-marker" />
            {{ evento.local }}
          </p>
        </div>
      </div>
      <div class="section-link">
        <RouterLink to="/calendario">
          Ver calendário completo →
        </RouterLink>
      </div>
    </section>

    <!-- Ações Rápidas -->
    <section class="section">
      <h2 class="section-title">Serviços Paroquiais</h2>
      <div class="servicos-grid">
        <RouterLink to="/intencoes-missa" class="servico-card">
          <Icon icon="mdi:candle" class="servico-icon" />
          <h3 class="servico-titulo">Intenções de Missa</h3>
          <p class="servico-descricao">
            Envie suas intenções para a Santa Missa
          </p>
        </RouterLink>

        <RouterLink to="/agendar-confissao" class="servico-card">
          <Icon icon="mdi:account-check" class="servico-icon" />
          <h3 class="servico-titulo">Agendar Confissão</h3>
          <p class="servico-descricao">
            Agende um horário para o sacramento da reconciliação
          </p>
        </RouterLink>

        <RouterLink to="/solicitar-visita" class="servico-card">
          <Icon icon="mdi:home-heart" class="servico-icon" />
          <h3 class="servico-titulo">Visita de Padre</h3>
          <p class="servico-descricao">
            Solicite a visita de um padre
          </p>
        </RouterLink>

        <RouterLink to="/pastorais" class="servico-card">
          <Icon icon="mdi:account-group" class="servico-icon" />
          <h3 class="servico-titulo">Pastorais</h3>
          <p class="servico-descricao">
            Conheça e participe das pastorais
          </p>
        </RouterLink>

        <RouterLink to="/liturgia-diaria" class="servico-card">
          <Icon icon="mdi:book-open-page-variant" class="servico-icon" />
          <h3 class="servico-titulo">Liturgia Diária</h3>
          <p class="servico-descricao">
            Acompanhe as leituras do dia
          </p>
        </RouterLink>

        <RouterLink to="/localizacao" class="servico-card">
          <Icon icon="mdi:map-marker" class="servico-icon" />
          <h3 class="servico-titulo">Localização</h3>
          <p class="servico-descricao">
            Veja como chegar à paróquia
          </p>
        </RouterLink>
      </div>
    </section>

    <!-- Notícias em Destaque -->
    <section v-if="noticiasDestaque.length" class="section section-alt">
      <h2 class="section-title">Notícias em Destaque</h2>
      <div class="noticias-grid">
        <RouterLink
          v-for="noticia in noticiasDestaque"
          :key="noticia.id"
          :to="`/noticias/${noticia.id}`"
          class="noticia-card"
        >
          <div
            v-if="noticia.imagem"
            class="noticia-imagem"
            :style="{ backgroundImage: `url(${noticia.imagem})` }"
          />
          <div class="noticia-content">
            <h3 class="noticia-titulo">{{ noticia.titulo }}</h3>
            <p class="noticia-resumo">{{ noticia.resumo }}</p>
            <span class="noticia-data">{{ noticia.dataPublicacao }}</span>
          </div>
        </RouterLink>
      </div>
      <div class="section-link">
        <RouterLink to="/noticias">
          Ver todas as notícias →
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  width: 100%
}

.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)
  color: white
  padding: 4rem 2rem
  border-radius: 1rem
  margin-bottom: 3rem
  text-align: center
}

.hero-content {
  max-width: 800px
  margin: 0 auto
}

.hero-title {
  font-size: 2.5rem
  color: white
  margin-bottom: 1rem
}

.hero-subtitle {
  font-size: 1.25rem
  color: #ffd700
  margin-bottom: 1rem
}

.hero-description {
  font-size: 1.1rem
  color: rgba(255, 255, 255, 0.9)
  line-height: 1.6
  margin-bottom: 2rem
}

.hero-actions {
  display: flex
  gap: 1rem
  justify-content: center
  flex-wrap: wrap
}

.btn {
  display: inline-flex
  align-items: center
  gap: 0.5rem
  padding: 0.75rem 1.5rem
  border-radius: 0.5rem
  text-decoration: none
  font-weight: 500
  transition: all 0.3s
}

.btn-primary {
  background: #ffd700
  color: #1a1a2e
}

.btn-primary:hover {
  background: #ffed4e
  transform: translateY(-2px)
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3)
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1)
  color: white
  border: 2px solid rgba(255, 255, 255, 0.3)
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2)
  transform: translateY(-2px)
}

.section {
  margin-bottom: 3rem
}

.section-alt {
  background: white
  padding: 2rem
  border-radius: 1rem
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
}

.section-title {
  font-size: 2rem
  color: var(--color-primary)
  margin-bottom: 2rem
  text-align: center
}

.section-link {
  text-align: center
  margin-top: 2rem
}

.section-link a {
  color: var(--color-primary)
  font-weight: 500
  text-decoration: none
}

.section-link a:hover {
  color: var(--color-accent)
}

.horarios-grid {
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))
  gap: 1rem
  margin-bottom: 1rem
}

.horario-card {
  display: flex
  flex-direction: column
  align-items: center
  gap: 0.5rem
  padding: 1.5rem
  background: white
  border-radius: 0.5rem
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
}

.horario-icon {
  font-size: 2rem
  color: var(--color-accent)
}

.horario-time {
  font-size: 1.25rem
  font-weight: 600
  color: var(--color-primary)
}

.horario-tipo {
  font-size: 0.875rem
  color: var(--color-accent)
}

.eventos-grid {
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
  gap: 1.5rem
}

.evento-card {
  padding: 1.5rem
  background: var(--color-background)
  border-radius: 0.5rem
  border-left: 4px solid var(--color-accent)
}

.evento-icon {
  font-size: 2rem
  color: var(--color-accent)
  margin-bottom: 0.5rem
}

.evento-titulo {
  font-size: 1.25rem
  margin-bottom: 0.5rem
}

.evento-info {
  display: flex
  align-items: center
  gap: 0.5rem
  color: var(--color-text-light)
  font-size: 0.95rem
  margin-top: 0.25rem
}

.servicos-grid {
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: 1.5rem
}

.servico-card {
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  padding: 2rem
  background: white
  border-radius: 0.5rem
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
  text-decoration: none
  transition: all 0.3s
}

.servico-card:hover {
  transform: translateY(-5px)
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15)
}

.servico-icon {
  font-size: 3rem
  color: var(--color-accent)
  margin-bottom: 1rem
}

.servico-titulo {
  font-size: 1.25rem
  color: var(--color-primary)
  margin-bottom: 0.5rem
}

.servico-descricao {
  color: var(--color-text-light)
  font-size: 0.95rem
}

.noticias-grid {
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
  gap: 1.5rem
}

.noticia-card {
  display: flex
  flex-direction: column
  background: var(--color-background)
  border-radius: 0.5rem
  overflow: hidden
  text-decoration: none
  transition: all 0.3s
}

.noticia-card:hover {
  transform: translateY(-5px)
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15)
}

.noticia-imagem {
  width: 100%
  height: 200px
  background-size: cover
  background-position: center
}

.noticia-content {
  padding: 1.5rem
}

.noticia-titulo {
  font-size: 1.25rem
  color: var(--color-primary)
  margin-bottom: 0.5rem
}

.noticia-resumo {
  color: var(--color-text-light)
  font-size: 0.95rem
  line-height: 1.6
  margin-bottom: 1rem
}

.noticia-data {
  color: var(--color-text-light)
  font-size: 0.875rem
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1.5rem
  }

  .hero-title {
    font-size: 2rem
  }

  .hero-actions {
    flex-direction: column
  }

  .btn {
    width: 100%
    justify-content: center
  }

  .section-title {
    font-size: 1.5rem
  }
}
</style>

