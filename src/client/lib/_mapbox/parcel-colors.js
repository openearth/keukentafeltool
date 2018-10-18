const DEFAULT_PARCEL_COLOR = '#FF5733'
const PARCEL_COLORS = {
  grasland: '#D1FFB9',
  bouwland: '#FFFFDE',
  braakland: '#EBE0CE',
  natuurterrein: '#9BD37F',
  overige: '#D8D8D8'
}

export default function(parcelType='') {
  const color = PARCEL_COLORS[parcelType.toLowerCase()]

  if(!color) {
    return DEFAULT_PARCEL_COLOR
  }

  return color
}
