<template>
  <div>
    <md-dialog
      :md-active.sync="dialogIsOpen"
      class="home-page__dialog"
    >
      <md-dialog-title>Welkom</md-dialog-title>
      <md-dialog-content>
        Met de keukentafeltool kunt u snel inzicht krijgen in wat verschillende maatregelen kunnen betekenen voor de nutrienten in uw percelen.
      </md-dialog-content>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          to="/farm/"
          @click="closeDialog">start
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogIsOpen: true,
      }
    },
    methods: {
      closeDialog() {
        this.dialogIsOpen = false
      }
    }
  }
</script>

<style>
  .home-page__dialog{
    max-width: 600px;
  }
</style>
