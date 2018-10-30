<template>
  <div>
    <md-toolbar
      md-elevation="0"
      class="md-dense"
    />
    <nutrients-table
      :parcels="features"
      :effects="effects"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import requireFeatures from '../../lib/mixins/require-features'
import { NutrientsTable } from '../../components'


export default {
  components: { NutrientsTable },
  mixins: [ requireFeatures ],
  data() {
    return {
      effects: []
    }
  },
  computed: {
    ...mapState('mapbox/features', [ 'features' ]),
    ...mapGetters('measures', [ 'measuresPerParcel' ]),
  },
  beforeMount () {
    const { measuresPerParcel } = this
    const input = Object.keys(measuresPerParcel).map(parcelId => {
      return {
        parcelId,
        measureIds: measuresPerParcel[parcelId],
      }
    })
    fetch(`/.netlify/functions/hydrometra-parcel-effects?input=${JSON.stringify(input)}`)
      .then(res => res.json())
      .then(res => {
        console.log('effecten uit API', res.data)
        this.effects = res.data
      })
      .catch(err => console.error(err))
  },
}
</script>
