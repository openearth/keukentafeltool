<template>
  <md-card
    class="md-card--parcel-info"
    md-with-hover >
    <button
      class="md-card-header__button"
      @click="isExpanded = !isExpanded">
      <md-card-header>
        <div class="md-title">{{ index+1 + '. ' + parcel.properties.gws_gewas }}</div>
        <div class="md-subhead">perceel nummer: {{ parcel.id }}</div>
        <md-icon class="md-card-header__icon">keyboard_arrow_down</md-icon>
      </md-card-header>
    </button>
    <transition name="slide-fade">
      <div v-if="isExpanded">
        <md-card-content>
          <md-field
            v-for="(value, key) in parcel.properties"
            :key="key" >
            <label for="input">{{ key }}</label>
            <md-input
              id="id"
              :type="text"
              :disabled="true"
              :value="value"
              name="input" />
          </md-field>
        </md-card-content>
      </div>
    </transition>
  </md-card>
</template>

<script>
export default {
  name: 'ParcelCard',
  props: {
    index: {
      type: Number,
      default: 0
    },
    parcel: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      isExpanded: false
    }
  }
}
</script>

<style>
  .md-card--parcel-info {
    margin-bottom: 16px;
    border-left: 4px solid var(--md-theme-default-primary);
  }
  .md-card-header .md-card-media.md-card-media--small {
    width: 21px;
    height: 21px;
    flex: 0 0 21px;
  }
  .md-card-header__button {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    width: 100%;
    cursor: pointer;
    text-align: left;
    position: relative;
    padding-right: 30px;
  }
  .md-card-header__icon {
    position: absolute;
    top: 16px;
    right: 16px;
    margin: 0;
  }
  .parcel-card .md-field.md-theme-default.md-disabled:after {
    background: none;
  }
  .slide-fade-enter-active {
    transition: all .4s ease;
  }
  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
