const url = 'http://tl-ng044.xtr.deltares.nl/geoserver/percelen/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&STYLES&LAYERS=percelen%3Abrp_gewaspercelen_2017_concept&exceptions=application%2Fvnd.ogc.se_inimage&SRS=EPSG:3857&WIDTH=256&HEIGHT=256&bbox={bbox-epsg-3857}'

export default function wmsLayer({ id, tiles=[], tileSize=256, paint={} }) {
  return {
    id,
    type: 'raster',
    source: {
      type: 'raster',
      tiles,
      tileSize,
    },
    paint
  }
}

export function parcelsLayer() {
  return wmsLayer({ id: 'parcels-layer', tiles: [ url ] })
}
