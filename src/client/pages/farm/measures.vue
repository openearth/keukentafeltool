<template>
  <div>
    <measure-list :measures="measures" />
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
}
</script>
