<template>
  <div>
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
          </div>
        </div>
        <footer-bar>
          <template>Kies een maatregel</template>
        </footer-bar>
      </div>
    </div>
    <div v-else>
      Error no measures found.
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
</style>
