import BaseLayerControl from './baselayer-control'
import mapboxgl from './_mapbox'
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYERS, MAP_BASELAYER_DEFAULT } from './map-config'

import baselayerControlComponent from './baselayer-control-component';

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

  map.on('*', () => console.log('alllllll'))

  map.on('load', () => addDefaultControlsToMap(map))
  map.on('style.load', () => {
    mapLayers.forEach(layer => {
      _addLayer(layer)
    })
  })

  return map
}

function addDefaultControlsToMap(map) {
  const Control = new BaseLayerControl()
  const component = baselayerControlComponent({
    layers: MAP_BASELAYERS,
    switchHandler: Control.switchLayer.bind(Control)
  })
  Control.setContainer(component)

  map.addControl(Control, 'bottom-right')
  map.addControl(new mapboxgl.NavigationControl(), 'top-right')
}
