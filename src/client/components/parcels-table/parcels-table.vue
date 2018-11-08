<template>
  <div class="data-table parcels-table">
    <div class="data-table__container data-table__scroll-horizontal">
      <div class="data-table__static-header">
        <table class="data-table__table">
          <thead>
            <tr class="data-table__header-row">
              <th class="data-table__header-cell data-table__cell--no-border">
                <div class="data-table__content data-table__content--w60">Perceel</div>
              </th>
              <th class="data-table__header-cell">
                <div class="data-table__content data-table__content--w125">Gewas</div>
              </th>
              <th class="data-table__header-cell">
                <div class="data-table__content data-table__content--w125 data-table__label-select">Gewascategorie</div>
              </th>
              <th class="data-table__header-cell">
                <div class="data-table__content data-table__content--w60 data-table__content--numeric">
                  Opp.<br>
                  <small>(ha)</small>
                </div>
              </th>
              <th class="data-table__header-cell">
                <div class="data-table__content data-table__content--w70">Grond</div>
              </th>
              <th class="data-table__header-cell">
                <div class="data-table__content data-table__label-select data-table__content--w105">Drainage</div>
              </th>
              <th class="data-table__header-cell">
                <div class="data-table__content data-table__content--w60 data-table__content--numeric">
                  Kwel<br>
                  <small>(mm/jaar)</small>
                </div>
              </th>
              <th class="data-table__header-cell">
                <div class="data-table__content data-table__content--w60 data-table__content--numeric">
                  GHG<br>
                  <small>(cm-mv)</small>
                </div>
              </th>
              <th class="data-table__header-cell">
                <div class="data-table__content data-table__content--w60 data-table__content--numeric">
                  GLG<br>
                  <small>(cm-mv)</small>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="data-table__scroll-vertical">
        <table class="data-table__table">
          <tbody>
            <tr
              v-for="parcel in parcelProperties"
              :key="parcel.id"
            >
              <td class="data-table__cell data-table__cell--no-border">
                <div class="data-table__content data-table__content--w60">{{ parcel.id }}</div>
              </td>
              <td class="data-table__cell">
                <div
                  :class="`parcels-table__vegetation--${parcel.gewascategorie.toLowerCase()}`"
                  class="data-table__content data-table__content--w125 parcels-table__vegetation"
                >
                  {{ parcel.gewas }}
                  <md-tooltip md-direction="right">{{ parcel.gewas }}</md-tooltip>
                </div>
              </td>
              <td class="data-table__cell">
                <div class="data-table__content data-table__content--w125">
                  <div class="form-select">
                    <select
                      id="select"
                      name="select"
                      class="form-select__select"
                      @input.prevent="updateProperty({id: parcel.id, key: 'gewascategorie', value: $event.target.value})"
                    >
                      <option
                        v-for="value in categoryOptions"
                        :key="value"
                        :selected="parcel.gewascategorie === value"
                        :value="value"
                      >
                        {{ value }}
                      </option>
                    </select>
                  </div>
                </div>
              </td>
              <td class="data-table__cell">
                <div class="data-table__content data-table__content--w60 data-table__content--numeric">{{ formatNumber(parcel.areaal) }}</div>
              </td>
              <td class="data-table__cell">
                <div class="data-table__content data-table__content--w70 data-table__content--capatilize">
                  {{ parcel.bodemgroep.toLowerCase() }}
                </div>
              </td>
              <td class="data-table__cell">
                <div class="data-table__content data-table__content--w105">
                  <div class="form-select">
                    <select
                      class="form-select__select"
                      @input.prevent="updateProperty({id: parcel.id, key: 'drain', value: Number($event.target.value)})"
                    >
                      <option
                        v-for="option in drainOptions"
                        :key="option.value"
                        :selected="parcel.drain === option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                </div>
              </td>
              <td class="data-table__cell">
                <div class="data-table__content data-table__content--w60 data-table__content--numeric">{{ formatNumber(parcel.kwel) }}</div>
              </td>
              <td class="data-table__cell">
                <div class="data-table__content data-table__content--w60 data-table__content--numeric">{{ formatNumber(parcel.ghg) }}</div>
              </td>
              <td class="data-table__cell">
                <div class="data-table__content data-table__content--w60 data-table__content--numeric">{{ formatNumber(parcel.glg) }}</div>
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
  data() {
    return {
      categoryOptions: ['Grasland', 'Bouwland', 'Braakland', 'Natuur'],
      drainOptions: [
        { value: 1, label: 'Wel' },
        { value: 0, label: 'Geen' },
      ],
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
