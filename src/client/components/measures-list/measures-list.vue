<template>
  <div class="measures-list">
    <template v-if="measures">
      <div
        v-for="(measureGroup, groupIndex) in measures"
        :key="measureGroup.title"
        class="measures-list__group">
        <h2 class="measures-list__group-title">{{ measureGroup.title }}</h2>
        <md-card
          v-for="(measure, index) in measureGroup.items"
          :key="measure.title"
          :class="{ 'measures-list__measure--active': selectedMeasure.id === measure.id }"
          class="measures-list__measure"
        >
          <div class="measures-list__measure-header" >
            <strong class="measures-list__measure-title">{{ measure.title }}</strong>
            <md-button
              class="measures-list__measure-select"
              @click="selectMeasure({groupIndex, index})"
            >
              {{ selectedMeasure.id === measure.id ? 'Klaar' : 'Kies percelen' }}
            </md-button>
          </div>
          <div class="measures-list__selected-parcels">
            <template v-if="parcelsPerMeasure[measure.id]">
              <div
                v-for="parcel in parcelsPerMeasure[measure.id]"
                :key="parcel"
                :class="{ 'measures-list__selected-parcel--active': selectedMeasure.id === measure.id }"
                class="measures-list__selected-parcel"
              >
                {{ parcel }}
                <button
                  class="measures-list__remove-selected-parcel"
                  @click="$emit('removeSelectedParcel', { measure, id: parcel })"
                >
                  X
                </button>
              </div>
            </template>
          </div>
        </md-card>
      </div>
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
      selectedMeasure: {},
    }
  },
  methods: {
    selectMeasure({index, groupIndex}) {
      const measure = this.measures[groupIndex].items[index]

      if(this.selectedMeasure.id === measure.id) {
        this.selectedMeasure = {}
      } else {
        this.selectedMeasure = measure
      }

      this.$emit('selectMeasure', this.selectedMeasure)
    }
  }
}
</script>

<style>
  .measures-list__group-title {
    color: #666666;
    font-size: 14px;
    margin-top: 24px;
    margin-bottom: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .measures-list__group:first-child .measures-list__group-title {
    margin-top: 0;
  }

  .measures-list__measure {
    padding: .5rem 1rem;
    margin-bottom: .75rem;
  }

  .measures-list__measure--active {
    background-color: rgba(253, 106, 2, .2) !important;
  }

  .measures-list__measure-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .measures-list__measure-title {
    width: 60%;
  }

  .measures-list__select {
    margin-bottom: 12px;
    padding: 12px 18px;
    background: #ffffff;
    border: 1px solid #ffffff;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .measures-list__select:hover {
    border: 1px solid var(--border-light);
  }

  .measures-list__select:hover .measures-list__select-caption {
    color: #666666;
    transition: color ease-in-out 200ms;
    transition-delay: 100ms;
  }

  .measures-list__select--selected {
    border: 1px solid #000000 !important;
  }

  .measures-list__select-caption {
    float: right;
    padding: 0;
    min-width: 0;
    margin-right: 0;
    vertical-align: baseline;
    font-size: 12px;
    color: transparent;
  }

  .measures-list__selected-parcel {
    display: inline-block;
    background-color: #F4F4F4;
    padding: 0 .5rem;
    margin-right: 1rem;
    margin-bottom: .5rem;
    border: 1px solid #757575;
    border-radius: 3px;
  }

  .measures-list__selected-parcel--active {
    background-color: #FD6A02;
  }

  .measures-list__remove-selected-parcel {
    cursor: pointer;
    background: transparent;
    border: 0;
    font-size: 14px;
    padding: 0;
    margin-left: 1rem;
  }
</style>
