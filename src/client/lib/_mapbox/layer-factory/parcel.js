import geoJsonLayer from './geojson'

export default function({ feature, fillColor="#ff0000", fillOpacity=0.8 }) {
  return geoJsonLayer({
    id: feature.id,
    data: feature,
    paint: {
      'fill-color': fillColor,
      'fill-opacity': fillOpacity,
    }
  })
}
