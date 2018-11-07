<template>
  <div>
    <md-dialog
      :md-active.sync="dialogIsOpen"
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
      class="home-page__dialog"
    >
      <md-dialog-title>Welkom</md-dialog-title>
      <md-dialog-content>
        Met de keukentafeltool kunt u snel inzicht krijgen in wat verschillende maatregelen kunnen betekenen voor de nutrienten in uw percelen.
        <div class="home-page__logos-container">
          <md-subheading class="home-page__logos-title">Mogelijk gemaakt door:</md-subheading>
          <img
            src="../assets/images/logos/deltares_logo--color.png"
            class="home-page__logo"
          >
          <img
            src="../assets/images/logos/min-infra-water_logo.png"
            class="home-page__logo"
          >
          <img
            src="../assets/images/logos/wur_logo.svg"
            class="home-page__logo"
          >
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button
          class="md-primary md-raised md-primary"
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
  .home-page__logos-container {
    padding-top: 30px;
  }
  .home-page__logo {
    width: 32%;
  }
  .home-page__logos-title {
    color: grey;
    display: block;
    margin-bottom: 20px;
  }
</style>
