<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { Icon } from '@iconify/vue'

const { user, logout } = useAuth()
const router = useRouter()

// Estado da sidebar
const isSidebarOpen = ref(true)

// Menu items
const menuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi:view-dashboard',
    route: 'admin-dashboard'
  },
  {
    title: 'Paróquias',
    icon: 'mdi:church',
    route: 'admin-paroquias'
  },
  {
    title: 'Notícias',
    icon: 'mdi:newspaper',
    route: 'admin-noticias'
  },
  {
    title: 'Pastorais',
    icon: 'mdi:account-group',
    route: 'admin-pastorais'
  },
  {
    title: 'Liturgia Diária',
    icon: 'mdi:book-open-page-variant',
    route: 'admin-liturgia'
  },
  {
    title: 'Intenções de Missa',
    icon: 'mdi:candle',
    route: 'admin-intencoes'
  },
  {
    title: 'Confissões',
    icon: 'mdi:calendar-check',
    route: 'admin-confissoes'
  },
  {
    title: 'Visitas Pastorais',
    icon: 'mdi:home-heart',
    route: 'admin-visitas'
  },
  {
    title: 'Inscrições',
    icon: 'mdi:clipboard-text',
    route: 'admin-inscricoes'
  }
]

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

async function handleLogout() {
  await logout()
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header/Navbar Full Width -->
    <header class="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div class="flex-none lg:hidden">
        <label for="admin-drawer" class="btn btn-square btn-ghost">
          <Icon icon="mdi:menu" class="text-2xl" />
        </label>
      </div>
      
      <div class="flex-1">
        <a class="btn btn-ghost text-xl font-bold">
          <Icon icon="mdi:shield-crown" class="text-primary text-2xl" />
          Painel Administrativo
        </a>
      </div>

      <div class="flex-none gap-2">
        <!-- Notificações -->
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <Icon icon="mdi:bell" class="text-2xl" />
              <span class="badge badge-xs badge-primary indicator-item">3</span>
            </div>
          </div>
          <div
            tabindex="0"
            class="card compact dropdown-content bg-base-100 rounded-box z-[1] w-64 shadow-xl mt-3"
          >
            <div class="card-body">
              <h3 class="font-bold">Notificações</h3>
              <div class="divider my-0"></div>
              <div class="space-y-2">
                <div class="flex items-start gap-2 p-2 hover:bg-base-200 rounded cursor-pointer">
                  <Icon icon="mdi:email" class="text-info text-xl mt-1" />
                  <div class="flex-1">
                    <p class="text-sm font-medium">Nova intenção de missa</p>
                    <p class="text-xs opacity-60">Há 5 minutos</p>
                  </div>
                </div>
                <div class="flex items-start gap-2 p-2 hover:bg-base-200 rounded cursor-pointer">
                  <Icon icon="mdi:calendar" class="text-warning text-xl mt-1" />
                  <div class="flex-1">
                    <p class="text-sm font-medium">Agendamento de confissão</p>
                    <p class="text-xs opacity-60">Há 15 minutos</p>
                  </div>
                </div>
                <div class="flex items-start gap-2 p-2 hover:bg-base-200 rounded cursor-pointer">
                  <Icon icon="mdi:account-plus" class="text-success text-xl mt-1" />
                  <div class="flex-1">
                    <p class="text-sm font-medium">Nova inscrição pastoral</p>
                    <p class="text-xs opacity-60">Há 1 hora</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Perfil do Usuário -->
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar"
          >
            <div
              class="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <span class="text-lg font-bold">
                {{ user?.name?.charAt(0).toUpperCase() }}
              </span>
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
          >
            <li class="menu-title">
              <div class="flex flex-col">
                <span class="font-semibold">{{ user?.name }}</span>
                <span class="text-xs opacity-60">{{ user?.email }}</span>
              </div>
            </li>
            <div class="divider my-1"></div>
            <li>
              <a>
                <Icon icon="mdi:account-circle" />
                Meu Perfil
              </a>
            </li>
            <li>
              <a>
                <Icon icon="mdi:cog" />
                Configurações
              </a>
            </li>
            <li>
              <a>
                <Icon icon="mdi:help-circle" />
                Ajuda
              </a>
            </li>
            <div class="divider my-1"></div>
            <li>
              <button @click="handleLogout" class="text-error">
                <Icon icon="mdi:logout" />
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- Main Content com Drawer -->
    <div class="drawer lg:drawer-open flex-1">
      <input
        id="admin-drawer"
        v-model="isSidebarOpen"
        type="checkbox"
        class="drawer-toggle"
      />
      
      <div class="drawer-content bg-base-200">
        <!-- Conteúdo da página -->
        <main class="p-4 lg:p-8">
          <RouterView />
        </main>
      </div>

      <!-- Sidebar -->
      <div class="drawer-side">
        <label for="admin-drawer" class="drawer-overlay"></label>
        <aside class="bg-base-100 min-h-full p-4 shadow-xl">
          <!-- Menu -->
          <ul class="menu">
            <li
              v-for="item in menuItems"
              :key="item.route"
            >
              <RouterLink
                :to="{ name: item.route }"
                class="flex items-center gap-3"
                active-class="active"
              >
                <Icon :icon="item.icon" class="text-xl" />
                <span>{{ item.title }}</span>
              </RouterLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>

    <!-- Footer Full Width -->
    <footer class="footer footer-center bg-base-100 text-base-content p-4 shadow-inner">
      <aside class="grid grid-flow-col gap-4">
        <p class="flex items-center gap-2">
          <Icon icon="mdi:copyright" />
          <span>{{ new Date().getFullYear() }} - Sistema de Gestão Paroquial</span>
        </p>
        <div class="divider divider-horizontal"></div>
        <a class="link link-hover flex items-center gap-1">
          <Icon icon="mdi:file-document" />
          Documentação
        </a>
        <a class="link link-hover flex items-center gap-1">
          <Icon icon="mdi:shield-check" />
          Termos de Uso
        </a>
        <a class="link link-hover flex items-center gap-1">
          <Icon icon="mdi:email" />
          Suporte
        </a>
      </aside>
    </footer>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.drawer-side a.active {
  @apply bg-primary text-primary-content;
}
</style>
