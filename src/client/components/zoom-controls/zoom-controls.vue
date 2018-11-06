<template>
  <ul class="zoom-controls">
    <li
      v-for="action in actions"
      :key="action.event"
      class="zoom-controls__item"
    >
      <md-button
        :aria-label="action.text"
        class="md-icon-button md-raised"
        @click="$emit(action.event)"
      >
        <md-icon aria-hidden="true">{{ action.icon }}</md-icon>
        <md-tooltip md-direction="right">{{ action.text }}</md-tooltip>
      </md-button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      actions: [
        { event: 'auto-focus', icon: 'center_focus_strong', text: 'Focus op selectie' },
        { event: 'zoom-in', icon: 'add', text: 'Inzoomen' },
        { event: 'zoom-out', icon: 'remove', text: 'Uitzoomen' },
      ]
    }
  }
}
</script>

<style>
  .zoom-controls {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .zoom-controls__item {
    margin-top: 5px;
  }
</style>
