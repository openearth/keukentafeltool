<template>
  <footer-bar>
    <template v-if="parcelCount === 0">Selecteer percelen</template>
    <template v-else-if="parcelCount === 1">1 perceel geselecteerd</template>
    <template v-else>{{ parcelCount }} percelen geselecteerd</template>
    <md-button
      :disabled="parcelCount === 0"
      to="/farm/parcels"
      class="md-raised md-primary"
      type="button"
    >
      Volgende <md-icon>arrow_right_alt</md-icon>
    </md-button>
  </footer-bar>
</template>

<script>
import { mapState } from 'vuex'
import { FooterBar } from '../../components'

export default {
  components: { FooterBar },
  computed: {
    ...mapState('parcels', ['parcels']),
    parcelCount() { return this.parcels.length },
  },
}
</script>
