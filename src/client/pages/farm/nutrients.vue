<template>
  <div class="farm-page__panel-content">
    <nutrients-table
      :parcels="features"
      :effects="effects"
    />
    <nutrients-totals
      :parcels="features"
      :effects="effects"
    />
    <portal
      to="footer-bar"
    >
      <div class="footer-bar">
        <md-button
          type="button"
          to="/farm/measures/"
        >
          <md-icon aria-hidden="true">navigate_before</md-icon> wijzig maatregelen
        </md-button>
        <md-button
          type="button"
          class="md-raised md-primary"
          to="#"
        >
          <md-icon aria-hidden="true">description</md-icon> Rapport
        </md-button>
      </div>
    </portal>
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

