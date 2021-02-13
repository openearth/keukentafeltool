<template>
  <div class="measures-list">
    <template v-if="measures">
      <section
        v-for="(measureGroup, groupIndex) in measures"
        :key="measureGroup.title"
        class="measures-list__group">
        <h2 class="measures-list__group-title">{{ measureGroup.title }}</h2>
        <md-card
          v-for="(measure, index) in measureGroup.items"
          :key="measure.title"
          :class="{ 'measures-list__measure--active': selectedMeasure && selectedMeasure.id === measure.id }"
          class="measures-list__measure"
        >
          <div class="measures-list__measure-header" >
            <strong class="measures-list__measure-title">{{ measure.title }}</strong>
            <md-button
              v-if="measure.link && measure.link.length > 0"
              :href="measure.link"
              target="_blank"
              rel="noopener"
            >
              Info
            </md-button>
            <md-button
              class="md-raised"
              @click="selectMeasure({groupIndex, index})"
            >
              {{ selectedMeasureId === measure.id ? 'Klaar' : 'Kies percelen' }}
            </md-button>
          </div>
          <div
            v-if="parcelsPerMeasure[measure.id]"
            class="measures-list__selected-parcels"
          >
            <md-chip
              v-for="parcelId in parcelsPerMeasure[measure.id]"
              :key="parcelId"
              class="measures-list__selected-parcel"
              md-deletable
              @md-delete="$emit('removeSelectedParcel', { measure, id: parcelId })"
            >
              {{ parcelId }}
            </md-chip>
          </div>
        </md-card>
      </section>
    </template>
    <template v-else>
      Geen maatregelen gevonden.
    </template>
  </div>
</template>

<script>

export default {
  props: {
    measures: {
      type: Array,
      default: () => []
    },
    parcelsPerMeasure: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedMeasure: undefined,
    }
  },
  computed: {
    selectedMeasureId() {
      return this.selectedMeasure
        ? this.selectedMeasure.id
        : undefined
    }
  },
  methods: {
    selectMeasure({index, groupIndex}) {
      const measure = this.measures[groupIndex].items[index]

      if(this.selectedMeasure && this.selectedMeasure.id === measure.id) {
        this.selectedMeasure = undefined
      } else {
        this.selectedMeasure = measure
      }

      this.$emit('selectMeasure', this.selectedMeasure)
    }
  }
}
</script>

<style>
  .measures-list {
    padding: 10px;
    overflow-y: scroll;
  }
  .measures-list__group-title {
    color: #666666;
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }

  .measures-list__group:first-child .measures-list__group-title {
    margin-top: 0;
  }

  .measures-list__measure {
    padding: 10px;
    margin-bottom: 10px;
    border-left: 5px solid transparent;
  }

  .measures-list__measure--active {
    border-left: 5px solid #FD6A02;
  }

  .measures-list__measure-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .measures-list__measure-title {
    width: 60%;
  }

  .measures-list__selected-parcels{
    margin-top: 10px;
    /* correction for the bottom margin of the chips */
    margin-bottom: -5px;
  }

  /* overwrite default material design styles */
  .measures-list .md-chip {
    margin-bottom: 5px;
    margin-left: 0 !important;
    margin-right: 5px !important;
  }

  /* overwrite default material design styles */
  .measures-list .md-chip:first-child {
    margin-right: 5px !important;
  }
</style>
