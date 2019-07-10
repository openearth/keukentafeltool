export const NETHERLANDS_CENTER_LATITUDE = 52.155242
export const NETHERLANDS_CENTER_LONGITUDE = 5.387217

export const MAP_CENTER = [
  NETHERLANDS_CENTER_LONGITUDE,
  NETHERLANDS_CENTER_LATITUDE,
]

export const MAP_ZOOM = 7

export const MAP_BASELAYERS = [
  'pulautekong/cjxunygdb3l6j1cqew198bivd',
  'pulautekong/cjxvgjxaz17qn1cmmw95gx52v',
].map(layer => ({
  style: `mapbox://styles/${layer}`,
  title: layer,
  thumbnail: `/thumbnails/${layer}.png`
}))

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0]
