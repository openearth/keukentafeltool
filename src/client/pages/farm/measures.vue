<template>
  <div>
    <measures-list
      :measures="measures"
      @selectMeasure="selectMeasure"
    />
    <footer-bar>
      <template v-if="selectedMeasure">Klik op een perceel om deze maatregel toe te voegen</template>
      <template v-else>Kies een maatregel</template>
    </footer-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import requireFeatures from '../../lib/mixins/require-features'

import { MeasuresList } from '../../components'
import { FooterBar } from '../../components'

export default {
  components: { MeasuresList, FooterBar },
  mixins: [ requireFeatures ],
  data() {
    return {
      selectedMeasure: undefined,
    }
  },
  computed: {
    ...mapState('measures', ['measures']),
  },
  methods: {
    selectMeasure (measure) {
      this.selectedMeasure = measure
      console.log(measure)
    }
  }
}
</script>
