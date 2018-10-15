<template>
  <parcels-table :parcels="parcels" />
</template>

<script>
import { mapState } from 'vuex'

import { ParcelsTable } from '../../components'

export default {
  middleware: [ 'require-parcels' ],
  components: { ParcelsTable },
  computed: {
    ...mapState('parcels', ['parcels']),
  },
}
</script>
