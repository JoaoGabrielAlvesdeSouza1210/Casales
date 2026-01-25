import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useParoquiaStore } from './stores/paroquia'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Inicializar dados mockados da paróquia
const paroquiaStore = useParoquiaStore()
paroquiaStore.carregarParoquia('1').then(() => {
  paroquiaStore.carregarNoticias('1')
})

app.mount('#app')
