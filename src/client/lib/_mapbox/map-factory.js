import BaseLayerControl from './baselayer-control'
import baselayerControlComponent from './baselayer-control-component';
import getFeatureInfo from '../get-feature-info'
import mapboxgl from './_mapbox'
import parcelLayer from './layer-factory/parcel'
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYERS, MAP_BASELAYER_DEFAULT } from './map-config'

export default function(container) {
  const mapLayers = []

  const map = new mapboxgl.Map({
    container,
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
    style: MAP_BASELAYER_DEFAULT.style
  })

  // We overwrite the addLayer method of the map.
  // We do this to keep track of the layers that are currently visible on the map.
  // This way we can re-render the layers when we switch baselayers/styles
  const _addLayer = map.addLayer.bind(map)
  map.addLayer = (layer, before) => {
    mapLayers.push(layer)
    _addLayer(layer, before)
  }

  // We overwrite the removeLayer method of the map.
  // We do this to keep track of the layers that are currently visible on the map.
  // This way we can re-render the layers when we switch baselayers/styles
  const _removeLayer = map.removeLayer.bind(map)
  map.removeLayer = (id) => {
    mapLayers = mapLayers.filter((layer) => layer.id !== id)
    _removeLayer(layer, before)
  }

  map.on('load', () => addDefaultControlsToMap(map))
  map.on('click', mapClickHandler)
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

function mapClickHandler({ point, target }) {
  const canvas = target.getCanvas()
  const { _ne, _sw } = target.getBounds()
  const { x, y } = point

  getFeatureInfo({
    layer: 'percelen:brp_gewaspercelen_2017_concept',
    ne: _ne,
    sw: _sw,
    width: canvas.offsetWidth,
    height: canvas.offsetHeight,
    x,
    y,
  })
    .then(geoJson => {
      const feature = geoJson.features[0]

      if(!feature || target.getLayer(feature.id)) {
        return
      }

      target.addLayer(parcelLayer({ feature }))
    })
}
