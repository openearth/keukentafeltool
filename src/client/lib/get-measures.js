const API_BASE_URL = '/.netlify/functions'

export default function getMeasures() {
  // if endpoint is unavailable, use `/get-mock-measures` instead
  return fetch(`${API_BASE_URL}/get-measures`)
  .then(res => res.json())
  .then(res => res.data)
}
