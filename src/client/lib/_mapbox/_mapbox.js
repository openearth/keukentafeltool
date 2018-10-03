import 'mapbox-gl/dist/mapbox-gl.css'

let mapboxgl

if (process.browser) {
  // use old skool `require` because there is no support for dynamic `import`
  mapboxgl = require('mapbox-gl')
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2lnZ3lmIiwiYSI6ImNqbHcwcHFjNjBsdGIza3F1dW5iZjhhY2EifQ.zZkkozZlSRtmB9VgpR9HiQ'
}

export default mapboxgl
