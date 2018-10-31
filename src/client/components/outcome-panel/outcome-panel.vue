<template>
  <div class="outcome-panel">
    <div class="outcome-panel__caption">
      <h2>Totaal</h2>
      <span><small>Over 6 percelen en 43,00 ha</small></span>
    </div>
    <div class="panel-outcome">
      <div class="panel-outcome__label">
        Nitraat (NO<sub>3</sub>)
      </div>
      <strong>23,20 mg/l</strong>
    </div>
    <div class="panel-outcome">
      <div class="panel-outcome__label">
        Stikstof (N<small>drain</small>)
      </div>
      <strong>-100,00 kg</strong>
    </div>
    <div class="panel-outcome">
      <div class="panel-outcome__label">
        Fosfor (P<small>drain</small>)
      </div>
      <strong>100,00 kg</strong>
    </div>
  </div>
</template>

<style>
  .outcome-panel {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 16px;
    background: #ffffff;
    /* custom boxshadow based on md elevation 4 but vertically reversed (seems that there are some strange light sources at play) */
    box-shadow: 0 -2px 4px -1px rgba(0,0,0,.2), 0 -4px 5px 0 rgba(0,0,0,.14), 0 -1px 10px 0 rgba(0,0,0,.12);
    display: flex;
    justify-content: flex-end;
  }
  .outcome-panel__caption {
    margin-right: auto
  }
  .outcome-panel__caption h2 {
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 14px;
  }
  .outcome-panel__caption span {
    color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  }
  .panel-outcome {
    height: 50px;
    margin: 0 24px;
  }
  .panel-outcome strong {
    font-size: 18px;
  }
  .panel-outcome__label {
    height: 21px;
    margin-bottom: 4px;
    color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  }
</style>
