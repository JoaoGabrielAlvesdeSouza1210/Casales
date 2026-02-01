import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  // Rota de Login
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Login', requiresGuest: true }
  },

  // Rotas Públicas
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: 'Início' }
      },
      {
        path: 'sobre',
        name: 'sobre',
        component: () => import('@/views/SobreView.vue'),
        meta: { title: 'Sobre a Paróquia' }
      },
      {
        path: 'localizacao',
        name: 'localizacao',
        component: () => import('@/views/LocalizacaoView.vue'),
        meta: { title: 'Localização' }
      },
      {
        path: 'horarios-missas',
        name: 'horarios-missas',
        component: () => import('@/views/HorariosMissasView.vue'),
        meta: { title: 'Horários das Missas' }
      },
      {
        path: 'calendario',
        name: 'calendario',
        component: () => import('@/views/CalendarioView.vue'),
        meta: { title: 'Calendário de Eventos' }
      },
      {
        path: 'liturgia-diaria',
        name: 'liturgia-diaria',
        component: () => import('@/views/LiturgiaDiariaView.vue'),
        meta: { title: 'Liturgia Diária' }
      },
      {
        path: 'intencoes-missa',
        name: 'intencoes-missa',
        component: () => import('@/views/IntencoesMissaView.vue'),
        meta: { title: 'Intenções de Missa' }
      },
      {
        path: 'agendar-confissao',
        name: 'agendar-confissao',
        component: () => import('@/views/AgendarConfissaoView.vue'),
        meta: { title: 'Agendar Confissão' }
      },
      {
        path: 'solicitar-visita',
        name: 'solicitar-visita',
        component: () => import('@/views/SolicitarVisitaView.vue'),
        meta: { title: 'Solicitar Visita' }
      },
      {
        path: 'pastorais',
        name: 'pastorais',
        component: () => import('@/views/PastoraisView.vue'),
        meta: { title: 'Pastorais' }
      },
      {
        path: 'pastorais/:id',
        name: 'pastoral-detalhes',
        component: () => import('@/views/PastoralDetalhesView.vue'),
        meta: { title: 'Detalhes da Pastoral' }
      },
      {
        path: 'noticias',
        name: 'noticias',
        component: () => import('@/views/NoticiasView.vue'),
        meta: { title: 'Notícias' }
      },
      {
        path: 'noticias/:id',
        name: 'noticia-detalhes',
        component: () => import('@/views/NoticiaDetalhesView.vue'),
        meta: { title: 'Notícia' }
      },
    ]
  },

  // Rotas Administrativas
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { title: 'Dashboard - Admin' }
      },
      // Paróquias
      {
        path: 'paroquias',
        name: 'admin-paroquias',
        component: () => import('@/views/admin/paroquias/ParoquiasListView.vue'),
        meta: { title: 'Paróquias - Admin' }
      },
      {
        path: 'paroquias/criar',
        name: 'admin-paroquias-criar',
        component: () => import('@/views/admin/paroquias/ParoquiaFormView.vue'),
        meta: { title: 'Nova Paróquia - Admin' }
      },
      {
        path: 'paroquias/:id/editar',
        name: 'admin-paroquias-editar',
        props: true,
        component: () => import('@/views/admin/paroquias/ParoquiaFormView.vue'),
        meta: { title: 'Editar Paróquia - Admin' }
      },
      // Notícias
      {
        path: 'noticias',
        name: 'admin-noticias',
        component: () => import('@/views/admin/noticias/NoticiasListView.vue'),
        meta: { title: 'Notícias - Admin' }
      },
      {
        path: 'noticias/criar',
        name: 'admin-noticias-criar',
        component: () => import('@/views/admin/noticias/NoticiaFormView.vue'),
        meta: { title: 'Nova Notícia - Admin' }
      },
      {
        path: 'noticias/:id/editar',
        name: 'admin-noticias-editar',
        props: true,
        component: () => import('@/views/admin/noticias/NoticiaFormView.vue'),
        meta: { title: 'Editar Notícia - Admin' }
      },
      // Pastorais (placeholder - criar depois)
      {
        path: 'pastorais',
        name: 'admin-pastorais',
        component: () => import('@/views/admin/pastorais/PastoraisListView.vue'),
        meta: { title: 'Pastorais - Admin' }
      },
      {
        path: 'pastorais/criar',
        name: 'admin-pastorais-criar',
        component: () => import('@/views/admin/pastorais/PastoralFormView.vue'),
        meta: { title: 'Nova Pastoral - Admin' }
      },
      {
        path: 'pastorais/:id/editar',
        name: 'admin-pastorais-editar',
        props: true,
        component: () => import('@/views/admin/pastorais/PastoralFormView.vue'),
        meta: { title: 'Editar Pastoral - Admin' }
      },
      // Liturgia (placeholder - criar depois)
      {
        path: 'liturgia',
        name: 'admin-liturgia',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { title: 'Liturgia Diária - Admin' }
      },
      {
        path: 'liturgia/criar',
        name: 'admin-liturgia-criar',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { title: 'Nova Liturgia - Admin' }
      },
      // Intenções de Missa
      {
        path: 'intencoes',
        name: 'admin-intencoes',
        component: () => import('@/views/admin/intencoes/IntencoesListView.vue'),
        meta: { title: 'Intenções de Missa - Admin' }
      },
      // Confissões (placeholder - criar depois)
      {
        path: 'confissoes',
        name: 'admin-confissoes',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { title: 'Confissões - Admin' }
      },
      // Visitas (placeholder - criar depois)
      {
        path: 'visitas',
        name: 'admin-visitas',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { title: 'Visitas Pastorais - Admin' }
      },
      // Inscrições (placeholder - criar depois)
      {
        path: 'inscricoes',
        name: 'admin-inscricoes',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { title: 'Inscrições - Admin' }
      }
    ]
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
 * Guards de navegação
 */
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Restaura sessão do localStorage se existir
  if (!authStore.user && localStorage.getItem('auth_token')) {
    authStore.restoreSession()
  }

  // Atualiza título da página
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - Paróquia`
  }

  // Verifica se a rota requer autenticação
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // Redireciona usuários autenticados da página de login
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'admin-dashboard' })
    return
  }

  next()
})

export default router
