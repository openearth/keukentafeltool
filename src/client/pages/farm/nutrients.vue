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
    <nutrients-totals
      :parcels="features"
      :effects="effects"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import initMapState from '../../lib/mixins/init-map-state'
import requireFeatures from '../../lib/mixins/require-features'
import { NutrientsTable, NutrientsTotals } from '../../components'

export default {
  components: { NutrientsTable, NutrientsTotals },
  mixins: [
    initMapState,
    requireFeatures,
  ],
  data() {
    return {
      effects: [],
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
        this.effects = res.data
      })
      .catch(err => console.error(err))
  },
  methods: {
    initMapState() {
      this.$emit('fitFeatures')
    },
  }
}
</script>
