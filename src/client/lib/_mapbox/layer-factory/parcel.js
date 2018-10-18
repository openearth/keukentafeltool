import geoJsonLayer from './geojson'

export default function({ feature, fillColor='#FF5733', fillOutlineColor='#111111', fillOpacity=0.7 }) {
  return geoJsonLayer({
    id: feature.id,
    data: feature,
    paint: {
      'fill-color': fillColor,
      'fill-opacity': fillOpacity,
      'fill-outline-color': fillOutlineColor,
    }
  })
}
