import baseLayerSwitcher from './baselayer-switcher'
import mapboxgl from './_mapbox'
import renderVue from '~/lib/render-vue'

import BaselayerSwitcher from '~/components/BaselayerSwitcher'

const MAP_CENTER = [ 5.10, 52.09 ]
const MAP_ZOOM = 7

export const mapBaseLayers = [
  'streets',
  'satellite',
].map(layer => ({
  style: `mapbox://styles/mapbox/${layer}-v9`,
  title: layer,
  thumbnail: `/thumbnails/${layer}.png`
}))

export default function(container) {
  const mapLayers = []

  const map = new mapboxgl.Map({
    container,
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
    style: mapBaseLayers[0].style
  })

  map.on('load', () => attachBaseLayerControl(map))

  const _addLayer = map.addLayer.bind(map)
  map.addLayer = (layer, before) => {
    mapLayers.push(layer)
    _addLayer(layer, before)
  }

  const _removeLayer = map.removeLayer.bind(map)
  map.removeLayer = (id) => {
    mapLayers = mapLayers.filter((layer) => layer.id !== id)
    _removeLayer(layer, before)
  }

  map.on('style.load', () => {
    mapLayers.forEach(layer => {
      _addLayer(layer)
    })
  })

  return map
}

function attachBaseLayerControl(map) {
  const switchControl = baseLayerSwitcher()
  const component = renderVue(BaselayerSwitcher, {
    layers: mapBaseLayers,
    switchHandler: switchControl.switchLayer.bind(switchControl)
  })
  switchControl.setContainer(component)

  map.addControl(switchControl, 'top-right')
}
