<template>
  <div class="md-content md-table nutrients-table md-theme-default">
    <div class="md-content md-table-content md-scrollbar md-theme-default">
      <table>
        <thead>
          <tr>
            <th class="md-table-head">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  Perceel
                </div>
              </div>
            </th>
            <th class="md-table-head">
              <div class="md-table-head-container">
                <div class="md-table-head-label" />
              </div>
            </th>
            <th class="md-table-cell md-numeric">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  NITRAAT (NO<small>3</small>)
                </div>
              </div>
            </th>
            <th class="md-table-cell md-numeric">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  STIKSTOF (N<small>drain</small>)
                </div>
              </div>
            </th>
            <th class="md-table-cell md-numeric">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  FOSFOR (P<small>drain</small>)
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="nutrient in nutrients"
          >
            <tr
              :key="nutrient.id"
              class="md-table-row"
            >
              <td
                class="md-table-cell"
                rowspan="3"
              >
                <div class="md-table-cell-container">{{ nutrient.id }}</div>
              </td>
              <td class="md-table-cell">
                <div class="md-table-cell-container">Referentie</div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container"><strong>{{ nutrient.properties.refno3 }}<small>mg/l</small></strong></div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container"><strong>{{ nutrient.properties.refndrain }}<small>kg/ha</small></strong></div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container"><strong>{{ nutrient.properties.refpdrain }}<small>kg/ha</small></strong></div>
              </td>
            </tr>
            <tr
              :key="nutrient.id"
              class="md-table-row"
            >
              <td class="md-table-cell">
                <div class="md-table-cell-container">&Delta; door maatregelen</div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container">xxx</div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container">xxx</div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container">xxx</div>
              </td>
            </tr>
            <tr
              :key="nutrient.id"
              class="md-table-row"
            >
              <td class="md-table-cell nutrients-table__cell--total">
                <div class="md-table-cell-container">Totaal</div>
              </td>
              <td class="md-table-cell md-numeric nutrients-table__cell--total">
                <div class="md-table-cell-container ">xxx</div>
              </td>
              <td class="md-table-cell md-numeric nutrients-table__cell--total">
                <div class="md-table-cell-container">xxx</div>
              </td>
              <td class="md-table-cell md-numeric nutrients-table__cell--total">
                <div class="md-table-cell-container">xxx</div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nutrients: {
      type: Array,
      required: true,
      default: () => [],
    }
  }
}
</script>

<style>
  .nutrients-table {
    min-width: 400px;
  }

  .nutrients-table__cell--total {
    background: #f5f5f5;
  }
</style>
