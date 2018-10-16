<template>
  <div
    v-if="measures"
    class="measures-list">
    <div
      v-for="(measuregroup, index) in measures"
      :key="index"
      class="measure-group">
      <h2 class="measure-group__title">{{ measuregroup.group }}</h2>
      <div
        v-for="(measure, index) in measuregroup.measures"
        :key="index">
        <div
          class="measure-select">
          <div class="measure-select__button">
            <div class="measure-select__header">
              <strong>{{ measure.title }}</strong>
              <div class="measure-select__caption">KIES</div>
            </div>
          </div>
          <div class="measure-select__parcels">
            <span class="measure-select__label">PERCELEN:</span>
            <div class="parcel-chip">36452735 <md-icon class="parcel-chip__icon">clear</md-icon></div>
          </div>
        </div>
      </div>
      <footer-bar>
        <template>Kies een maatregel</template>
        <template v-if="measure">Klik op een perceel om deze maatregel toe te voegen</template>
      </footer-bar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { FooterBar } from '../../components'

export default {
  components: { FooterBar },
  computed: {
    ...mapState('measures', ['measures']),
  },
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
  }
  .measure-select__button {
    padding: 12px 18px;
    background: #ffffff;
    border: 1px solid #ffffff;
    cursor: pointer;
  }
  .measure-select__button:hover {
    border: 1px solid #000000;
  }
  .measure-select:hover .measure-select__caption {
    color: #666666;
    transition: color ease-in-out 400ms;
    transition-delay: 100ms;
  }
  .measure-select--active {
    border: 1px solid #0038FF;
  }
  .measure-select__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .measure-select__parcels {
    padding: 12px 18px;
    font-size: 12px;
    color: #666666;
    background: #ececec;
  }
  .measure-select__label {
    margin-right: 5px;
  }
  .parcel-chip {
    border-radius: 2px;
    padding: 0 5px;
    display: inline-block;
    color: #000000;
    background: #C4C4C4;
    border: 1px solid #B0B0B0;
    cursor: pointer;
  }
  .parcel-chip:hover {
    color: #ffffff;
    background: #0038FF;
    border-color: #0038FF;
    transition: all ease-in-out 240ms;
  }
  .parcel-chip:hover .md-icon {
    color: #ffffff;
  }
  .parcel-chip__icon {
    width: 14px;
    min-width: 14px;
    height: 14px;
    font-size: 14px!important;
    vertical-align: text-bottom;
  }
</style>
