<template>
  <div class="md-content md-table outcome-table md-theme-default">
    <div class="md-content md-table-content md-scrollbar md-theme-default">
      <table>
        <thead>
          <tr>
            <th class="md-table-head outcome-table__first-column">
              <div class="md-table-head-container">
                <div class="md-table-head-label" />
              </div>
            </th>
            <th class="md-table-head md-numeric">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  Nitraat <br>(NO<sub>3</sub> mg/l)
                </div>
              </div>
            </th>
            <th class="md-table-head md-numeric">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  Stikstof <br>(N<small>drain</small> kg/ha)
                </div>
              </div>
            </th>
            <th class="md-table-head md-numeric">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  Fosfor <br>(P<small>drain</small> kg/ha)
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="md-table-row">
            <td class="md-table-cell">
              <div class="md-table-cell-container">
                <h3>Nutriënten</h3>
                Totaal alle percelen
              </div>
            </td>
            <td class="md-table-cell md-numeric">
              <div class="md-table-cell-container"><strong>23.20</strong></div>
            </td>
            <td class="md-table-cell md-numeric">
              <div class="md-table-cell-container"><strong>43.90</strong></div>
            </td>
            <td class="md-table-cell md-numeric">
              <div class="md-table-cell-container"><strong>1.46</strong></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
  .outcome-table {
    min-width: 500px;
    border-top: 1px solid;
    border-top-color: var(--md-theme-default-divider-on-background, rgba(0, 0, 0, 0.12));
  }
  .outcome-table .md-table-head-container {
    height: 84px;
  }
  .outcome-table .md-table-head-label {
    height: 56px;
  }
  .outcome-table__first-column {
    width: 365px;
  }
</style>
