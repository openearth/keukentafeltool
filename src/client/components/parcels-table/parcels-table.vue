<template>
  <div class="ktt-table parcels-table">
    <div class="ktt-table__container ktt-table__slide--horizontal">
      <div class="ktt-table__static-header">
        <table>
          <thead>
            <tr>
              <th>
                <div class="ktt-table__cell ktt-table__cell--w60">Perceel</div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--w125">Gewas</div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--w125 ktt-table__cell--label-select">Gewascategorie</div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--w60 ktt-table__cell--numeric">
                  Opp.<br>
                  <small>(ha)</small>
                </div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--w70">Grond</div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--label-select">Drainage</div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--w60 ktt-table__cell--numeric">
                  Kwel<br>
                  <small>(mm/jaar)</small>
                </div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--w60 ktt-table__cell--numeric">
                  GHG<br>
                  <small>(cm-mv)</small>
                </div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--w60 ktt-table__cell--numeric">
                  GLG<br>
                  <small>(cm-mv)</small>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="ktt-table__slide--vertical">
        <table>
          <tbody>
            <tr
              v-for="parcel in parcelProperties"
              :key="parcel.id">
              <td>
                <div class="ktt-table__cell ktt-table__cell--w60">{{ parcel.id }}</div>
              </td>
              <td>
                <div
                  :class="`parcels-table__vegetation--${parcel.gewascategorie.toLowerCase()}`"
                  class="ktt-table__cell ktt-table__cell--w125 parcels-table__vegetation"
                >
                  {{ parcel.gewas }}
                  <md-tooltip md-direction="right">{{ parcel.gewas }}</md-tooltip>
                </div>
              </td>
              <td>
                <div class="ktt-table__cell ktt-table__cell--w125 form-select">
                  <select
                    id="select"
                    name="select"
                    class="form-select__select"
                    @input.prevent="updateProperty({id: parcel.id, key: 'gewascategorie', value: $event.target.value})"
                  >
                    <option
                      :selected="parcel.gewascategorie === 'Grasland'"
                      value="Grasland"
                    >
                      Grasland
                    </option>
                    <option
                      :selected="parcel.gewascategorie === 'Bouwland'"
                      value="Bouwland"
                    >
                      Bouwland
                    </option>
                    <option
                      :selected="parcel.gewascategorie === 'Braakland'"
                      value="Braakland"
                    >
                      Braakland
                    </option>
                    <option
                      :selected="parcel.gewascategorie === 'Natuur'"
                      value="Natuur"
                    >
                      Natuur
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <div class="ktt-table__cell ktt-table__cell--w60 ktt-table__cell--numeric">{{ formatNumber(parcel.areaal) }}</div>
              </td>
              <td>
                <div class="ktt-table__cell ktt-table__cell--w70">
                  {{ capitalizeFirstLetter(parcel.bodemgroep.toLowerCase()) }}
                </div>
              </td>
              <td>
                <div class="ktt-table__cell form-select">
                  <select
                    class="form-select__select"
                    @input.prevent="updateProperty({id: parcel.id, key: 'drain', value: Number($event.target.value)})"
                  >
                    <option
                      :selected="parcel.drain === 2"
                      value="2"
                    >
                      Verbeterd
                    </option>
                    <option
                      :selected="parcel.drain === 1"
                      value="1"
                    >
                      Wel
                    </option>
                    <option
                      :selected="parcel.drain === 0"
                      value="0"
                    >
                      Geen
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <div class="ktt-table__cell ktt-table__cell--w60 ktt-table__cell--numeric">{{ formatNumber(parcel.kwel) }}</div>
              </td>
              <td>
                <div class="ktt-table__cell ktt-table__cell--w60 ktt-table__cell--numeric">{{ formatNumber(parcel.ghg) }}</div>
              </td>
              <td>
                <div class="ktt-table__cell ktt-table__cell--w60 ktt-table__cell--numeric">{{ formatNumber(parcel.glg) }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { FormSelect } from '../../components'
import formatNumber, { isNumber, toNumber } from '../../lib/format-number'

export default {
  components: { FormSelect },
  props: {
    parcels: {
      type: Array,
      required: true,
      default: () => [],
    }
  },
  computed: {
    parcelProperties() {
      return this.parcels.map(parcel => parcel.properties)
    },
  },
  methods: {
    formatNumber(value) { return formatNumber({ value }) },
    parcelColor() {
      return '#FF0000'
    },
    capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
    },
    updateProperty(valueProperty) {
      this.$emit('updateProperty', valueProperty)
    }
  }
}
</script>

<style>
  .parcel-type {
    width: 5px;
    height: 5px;
  }
  .parcels-table .ktt-table__static-header,
  .parcels-table .ktt-table__slide--vertical,
  .parcels-table .ktt-table__slide--horizontal {
    width: 900px;
  }
  .parcels-table__vegetation {
    position: relative;
    padding-left: 20px;
  }
  .parcels-table__vegetation::before {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    top: calc(50% - 5px);
    left: 5px;
    border: 1px solid #ccc;
  }
  .parcels-table__vegetation--grasland::before {
    background-color: #D1FFB9;
  }
  .parcels-table__vegetation--bouwland::before {
    background-color: #FFFFDE;
  }
  .parcels-table__vegetation--braakland::before {
    background-color: #EBE0CE;
  }
  .parcels-table__vegetation--natuurterrein::before {
    background-color: #9BD37F;
  }
  .parcels-table__vegetation--overige::before {
    background-color: #D8D8D8;
  }
</style>
