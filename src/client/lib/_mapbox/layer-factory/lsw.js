import geoServerUrl from '../../geoserver-url'
import wmsLayer from './wms'

const NAMESPACE = 'lsw'
const LAYER = 'krwlds_basins_009'
const LAYER_ID = 'lsw'
const REQUEST = 'GetMap'
const SERVICE = 'WMS'

const parcelsUrl = geoServerUrl({
  service: SERVICE,
  request: REQUEST,
  layers: `${NAMESPACE}:${LAYER}`,
  encode: false,
})

export default function() {
  return wmsLayer({ id: LAYER_ID, tiles: [ parcelsUrl ] })
}
