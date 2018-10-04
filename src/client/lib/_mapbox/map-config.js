export const MAP_CENTER = [ 5.10, 52.09 ]
export const MAP_ZOOM = 7

export const MAP_BASELAYERS = [
  'streets',
  'satellite',
].map(layer => ({
  style: `mapbox://styles/mapbox/${layer}-v9`,
  title: layer,
  thumbnail: `/thumbnails/${layer}.png`
}))

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0]
