import geoServerUrl from '../../geoserver-url'
import wmsLayer from './wms'

const NAMESPACE = 'percelen'
const LAYER = 'brp_gewaspercelen_2017_concept'
const LAYER_ID = 'parcels-layer'
const REQUEST = 'GetMap'
const SERVICE = 'WMS'
const TILESIZE = 1024

const parcelsUrl = geoServerUrl({
  service: SERVICE,
  request: REQUEST,
  layers: `${NAMESPACE}:${LAYER}`,
  width: TILESIZE,
  height: TILESIZE,
  encode: false,
})

export default function() {
  return wmsLayer({ id: LAYER_ID, tiles: [ parcelsUrl ], tileSize: TILESIZE })
}
