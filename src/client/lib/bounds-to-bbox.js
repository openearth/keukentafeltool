import proj4 from 'proj4'

const DEFAULT_PROJECTION = process.env.DEFAULT_PROJECTION
const LAT_LNG_PROJECTION = 'EPSG:4326'

export default function({ ne, sw }, projection) {
  const minCoordinates = proj4(LAT_LNG_PROJECTION, projection || DEFAULT_PROJECTION, [ sw.lng, sw.lat ])
  const maxCoordinates = proj4(LAT_LNG_PROJECTION, projection || DEFAULT_PROJECTION, [ ne.lng, ne.lat ])

  return [
    minCoordinates[0],
    minCoordinates[1],
    maxCoordinates[0],
    maxCoordinates[1]
  ]
}
