<template>
  <div>
    <measures-list
      :measures="measures"
      @clicked="selectedMeasure" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MeasuresList } from '../../components'

export default {
  components: { MeasuresList },
  computed: {
    ...mapState('measures', ['measures']),
  },
  methods: {
    selectedMeasure (value) {
      alert(value)
    }
  }
}
</script>
