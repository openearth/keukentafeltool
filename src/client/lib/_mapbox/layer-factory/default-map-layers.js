import lsw from './lsw'
import parcels from './parcels'

const DEFAULT_MAP_LAYERS = [
  lsw(),
  parcels(),
]

export default function(map) {
  DEFAULT_MAP_LAYERS.forEach(layer => map.addLayer(layer))
}
