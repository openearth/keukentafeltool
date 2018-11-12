export default function(input) {
  return fetch(`/.netlify/functions/hydrometra-parcel-effects?input=${JSON.stringify(input)}`)
    .then(res => res.json())
    .catch(err => console.error(err))
}
