import mapboxgl from './_mapbox'
import { MAP_BASELAYERS } from './map-config'

import BaseLayerControl from './baselayer-control'
import baselayerControlComponent from './baselayer-control-component';
import GeocoderControl from './geocoder-control'


export function addDefaultControlsToMap(map) {
  map.addControl(GeocoderControl(), 'top-right')
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

  return Control
}
