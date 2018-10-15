<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Welkom</md-dialog-title>
      <md-dialog-content>
        Met de keukentafeltool kunt u snel inzicht krijgen in wat verschillende maatregelen kunnen betekenen voor de nutrienten in uw percelen.
      </md-dialog-content>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          to="/farm"
          @click="showDialog = false">START
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DialogCustom',
    data: () => ({
      showDialog: true
    })
  }
</script>

<style>
  .md-dialog {
    max-width: 600px;
  }
</style>
