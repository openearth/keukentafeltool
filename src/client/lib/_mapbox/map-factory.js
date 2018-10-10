import getFeatureInfo from '../get-feature-info'
import mapboxgl from './_mapbox'
import layerFactory from  './layer-factory'
import { addDefaultControlsToMap } from './default-controls'
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYER_DEFAULT } from './map-config'

export default function(container) {
  let mapLayers = []

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
    _removeLayer(id)
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
      if(!feature) {
        return
      }

      if(target.getLayer(feature.id)) {
        target.removeLayer(feature.id)
        target.removeSource(feature.id)
        target.fire('parcels/removeFeature', { id: feature.id })
      } else {
        target.addLayer(layerFactory.parcel({ feature }))
        target.fire('parcels/addFeature', { feature })
      }
    })
}
