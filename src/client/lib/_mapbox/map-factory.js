import mapboxgl from './_mapbox'
import { addDefaultControlsToMap } from './default-controls'
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYER_DEFAULT } from './map-config'

export default function(container) {
  const mapLayers = []

  const map = new mapboxgl.Map({
    container,
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
    style: MAP_BASELAYER_DEFAULT.style
  })

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

  map.on('load', () => addDefaultControlsToMap(map))
  map.on('style.load', () => {
    mapLayers.forEach(layer => {
      _addLayer(layer)
    })
  })

  return map
}
