<template>
  <div class="measures-list">
    <template v-if="measures">
      <div
        v-for="(measureGroup, groupIndex) in measures"
        :key="measureGroup.title"
        class="measures-list__group">
        <h2 class="measures-list__group-title">{{ measureGroup.title }}</h2>
        <div
          v-for="(measure, index) in measureGroup.items"
          :key="measure.title">
          <button
            class="measures-list__select"
            @click="selectMeasure({groupIndex, index})">
            <strong>{{ measure.title }}</strong>
            <span class="measures-list__select-caption">KIES</span>
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      Geen maatregelen gevonden.
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectedMeasure: {},
    }
  },
  computed: {
    ...mapState('measures', ['measures']),
  },
  methods: {
    selectMeasure({index, groupIndex}) {
      const measure = this.measures[groupIndex].items[index]
      this.$emit('selectMeasure', measure),
      this.selectedMeasure = measure
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
  }
  .measures-list__group:first-child .measures-list__group-title {
    margin-top: 0;
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
    border: 1px solid #000000;
  }
  .measures-list__select:hover .measures-list__select-caption {
    color: #666666;
    transition: color ease-in-out 400ms;
    transition-delay: 100ms;
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
</style>
