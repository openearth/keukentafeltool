import geoJsonLayer from './geojson'

export default function({ feature, fillColor='#ff6600', fillOpacity=0.5 }) {
  return geoJsonLayer({
    id: feature.id,
    data: feature,
    paint: {
      'fill-color': fillColor,
      'fill-opacity': fillOpacity,
      'fill-outline-color': fillColor,
    }
  })
}
