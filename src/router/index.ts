import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Início' }
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('@/views/SobreView.vue'),
    meta: { title: 'Sobre a Paróquia' }
  },
  {
    path: '/localizacao',
    name: 'localizacao',
    component: () => import('@/views/LocalizacaoView.vue'),
    meta: { title: 'Localização' }
  },
  {
    path: '/horarios-missas',
    name: 'horarios-missas',
    component: () => import('@/views/HorariosMissasView.vue'),
    meta: { title: 'Horários das Missas' }
  },
  {
    path: '/calendario',
    name: 'calendario',
    component: () => import('@/views/CalendarioView.vue'),
    meta: { title: 'Calendário de Eventos' }
  },
  {
    path: '/liturgia-diaria',
    name: 'liturgia-diaria',
    component: () => import('@/views/LiturgiaDiariaView.vue'),
    meta: { title: 'Liturgia Diária' }
  },
  {
    path: '/intencoes-missa',
    name: 'intencoes-missa',
    component: () => import('@/views/IntencoesMissaView.vue'),
    meta: { title: 'Intenções de Missa' }
  },
  {
    path: '/agendar-confissao',
    name: 'agendar-confissao',
    component: () => import('@/views/AgendarConfissaoView.vue'),
    meta: { title: 'Agendar Confissão' }
  },
  {
    path: '/solicitar-visita',
    name: 'solicitar-visita',
    component: () => import('@/views/SolicitarVisitaView.vue'),
    meta: { title: 'Solicitar Visita' }
  },
  {
    path: '/pastorais',
    name: 'pastorais',
    component: () => import('@/views/PastoraisView.vue'),
    meta: { title: 'Pastorais' }
  },
  {
    path: '/pastorais/:id',
    name: 'pastoral-detalhes',
    component: () => import('@/views/PastoralDetalhesView.vue'),
    meta: { title: 'Detalhes da Pastoral' }
  },
  {
    path: '/noticias',
    name: 'noticias',
    component: () => import('@/views/NoticiasView.vue'),
    meta: { title: 'Notícias' }
  },
  {
    path: '/noticias/:id',
    name: 'noticia-detalhes',
    component: () => import('@/views/NoticiaDetalhesView.vue'),
    meta: { title: 'Notícia' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

/**
 * Guard para atualizar título da página
 */
router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - Paróquia`
  }
  next()
})

export default router
