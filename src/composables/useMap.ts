import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import L from 'leaflet'
import type { Localizacao } from '@/types'

/**
 * Composable para integração com Leaflet
 * @param elementId - ID do elemento HTML do mapa
 * @param localizacao - Dados de localização
 * @returns Objeto com referências e funções do mapa
 */
export const useMap = (elementId: string, localizacao: Localizacao) => {
  const map: Ref<L.Map | null> = ref(null)
  const marker: Ref<L.Marker | null> = ref(null)

  /**
   * Inicializa o mapa
   */
  const initMap = (): void => {
    if (!map.value) {
      map.value = L.map(elementId).setView(
        [localizacao.latitude, localizacao.longitude],
        15
      )

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map.value)

      marker.value = L.marker([localizacao.latitude, localizacao.longitude])
        .addTo(map.value)
        .bindPopup(`
          <b>${localizacao.endereco}</b><br>
          ${localizacao.cidade} - ${localizacao.estado}
        `)
    }
  }

  /**
   * Atualiza a posição do marcador
   * @param novaLocalizacao - Nova localização
   */
  const updateMarker = (novaLocalizacao: Localizacao): void => {
    if (map.value && marker.value) {
      const newLatLng = L.latLng(novaLocalizacao.latitude, novaLocalizacao.longitude)
      marker.value.setLatLng(newLatLng)
      map.value.setView(newLatLng, 15)
    }
  }

  /**
   * Abre o popup do marcador
   */
  const openPopup = (): void => {
    marker.value?.openPopup()
  }

  onMounted(() => {
    initMap()
  })

  return {
    map,
    marker,
    initMap,
    updateMarker,
    openPopup
  }
}
