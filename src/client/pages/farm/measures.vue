<template>
  <div>
    <measure-list
      :measures="measures"
      @clicked="selectedMeasure" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MeasureList } from '../../components'

export default {
  components: { MeasureList },
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
