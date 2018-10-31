<template>
  <section class="nutrients-totals">
    <div class="nutrients-totals__caption">
      <h2 class="nutrients-totals__title">Totaal</h2>
      <small class="nutrients-totals__description">Over 6 percelen en 43,00 ha</small>
    </div>
    <div class="nutrients-totals__metric">
      <div class="nutrients-totals__metric-label">
        Nitraat (NO<sub>3</sub>)
      </div>
      <strong class="nutrients-totals__metric-value"><nobr>23,20 mg/l</nobr></strong>
    </div>
    <div class="nutrients-totals__metric">
      <div class="nutrients-totals__metric-label">
        Stikstof (N<small>drain</small>)
      </div>
      <strong class="nutrients-totals__metric-value"><nobr>-100,00 kg</nobr></strong>
    </div>
    <div class="nutrients-totals__metric">
      <div class="nutrients-totals__metric-label">
        Fosfor (P<small>drain</small>)
      </div>
      <strong class="nutrients-totals__metric-value"><nobr>100,00 kg</nobr></strong>
    </div>
  </section>
</template>

<style>
  .nutrients-totals {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 12px 16px 12px 24px;
    background: #ffffff;
    /* custom boxshadow based on md elevation 4 but vertically reversed (seems that there are some strange light sources at play) */
    box-shadow: 0 -2px 4px -1px rgba(0,0,0,.2), 0 -4px 5px 0 rgba(0,0,0,.14), 0 -1px 10px 0 rgba(0,0,0,.12);
    display: flex;
    justify-content: flex-end;
  }
  .nutrients-totals__caption {
    margin-right: auto
  }
  .nutrients-totals__title {
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 14px;
  }
  .nutrients-totals__description {
    color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  }
  .nutrients-totals__metric {
    min-height: 50px;
    margin: 0 8px;
  }
  .nutrients-totals__metric:last-child {
    margin-right: 0;
  }
  .nutrients-totals__metric-label {
    font-size: 12px;
    min-height: 24px;
    margin-bottom: 4px;
    color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  }
  @media only screen and (min-width: 1200px) {
    .nutrients-totals {
      padding: 16px;
    }
    .nutrients-totals__metric-label {
      font-size: 14px;
    }
    .nutrients-totals__metric {
      margin: 0 18px;
    }
    .nutrients-totals__metric-value {
      font-size: 18px;
    }
  }
</style>
