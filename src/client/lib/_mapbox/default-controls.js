import BaseLayerControl from './baselayer-control'
import baselayerControlComponent from './baselayer-control-component';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { MAP_BASELAYERS } from './map-config'

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export function addDefaultControlsToMap(map) {
  map.addControl(new MapboxGeocoder({
    accessToken: process.env.MAPBOX_TOKEN
  }), 'top-right')
  map.addControl(createBaseLayerControl(), 'top-right')
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
}

function createBaseLayerControl() {
  const Control = new BaseLayerControl()
  const component = baselayerControlComponent({
    layers: MAP_BASELAYERS,
    switchHandler: Control.switchLayer.bind(Control)
  })
  Control.setContainer(component)
}
