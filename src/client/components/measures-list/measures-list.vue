<template>
  <div class="measures-list">
    <template v-if="measures">
      <div
        v-for="(measuregroup, index) in measures"
        :key="index"
        class="measure-group">
        <h2 class="measure-group__title">{{ measuregroup.title }}</h2>
        <div
          v-for="(measure, index) in measuregroup.items"
          :key="index">
          <button
            class="measure-select"
            @click="selectMeasure(measure.title)">
            <strong>{{ measure.title }}</strong>
            <span class="measure-select__caption">KIES</span>
          </button>
        </div>
        <footer-bar>
          <template v-if="selectedMeasure">Klik op een perceel om deze maatregel toe te voegen</template>
          <template v-else>Kies een maatregel</template>
        </footer-bar>
      </div>
    </template>
    <template v-else>
      Geen maatregelen gevonden.
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { FooterBar } from '../../components'

export default {
  components: { FooterBar },
  data() {
    return {
      selectedMeasure: '',
    }
  },
  computed: {
    ...mapState('measures', ['measures']),
  },
  methods: {
    selectMeasure(value) {
      this.$emit('clicked', value),
      this.selectedMeasure = value
    }
  }
}
</script>

<style>
  .measure-group__title {
    color: #666666;
    font-size: 14px;
    margin-top: 24px;
    margin-bottom: 14px;
  }
  .measure-group:first-child .measure-group__title {
    margin-top: 0;
  }
  .measure-select {
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
  .measure-select:hover {
    border: 1px solid #000000;
  }
  .measure-select:hover .measure-select__caption {
    color: #666666;
    transition: color ease-in-out 400ms;
    transition-delay: 100ms;
  }
  .measure-select__caption {
    float: right;
    padding: 0;
    min-width: 0;
    margin-right: 0;
    vertical-align: baseline;
    font-size: 12px;
    color: transparent;
  }
</style>
