<template>
  <div class="c-datatable">
    <div class="c-datatable__toolbar">
      <div>
        <VPagination />
      </div>
      <div class="c-search">
        <input class="c-search__input" type="text" placeholder="Search..." />
      </div>
    </div>
    <table class="c-table">
      <thead class="c-table__header">
        <tr class="c-table__row">
          <th
            v-for="(col, index) in table.columns"
            :key="index"
            class="c-table__th c-filter"
            data-dropdown="container"
          >
            <button class="c-filter__btn" data-dropdown="btn">
              <!-- Filter icon -->
              <img
                v-if="col.sortable"
                :src="
                  col == sortColumn
                    ? '/img/filter.is-active.svg'
                    : '/img/filter.svg'
                "
                alt="filter icon"
              />
              <span v-html="col.label"></span>
            </button>
            <div
              class="c-filter__menu c-filter__menu--bottom"
              data-dropdown="menu"
            >
              <header class="c-filter__header">
                <input
                  class="c-filter__search"
                  type="text"
                  placeholder="Search..."
                />
                <a href="#" class="c-filter__control">Select All</a>
                <a href="#" class="c-filter__control">Clear</a>
              </header>

              <div class="c-filter__options">
                <label href="#" class="c-filter__item">
                  <input type="checkbox" name="" id="" />
                  AKMLS
                </label>
                <label href="#" class="c-filter__item">
                  <input type="checkbox" name="" id="" />
                  bridgeMLS
                </label>
                <label href="#" class="c-filter__item">
                  <input type="checkbox" name="" id="" />
                  CLAW
                </label>
                <label href="#" class="c-filter__item">
                  <input type="checkbox" name="" id="" />
                  ITech MLS
                </label>
                <label href="#" class="c-filter__item">
                  <input type="checkbox" name="" id="" />
                  Kern River Lake Isabella Board
                </label>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="c-table__body">
        <!-- if no data -->
        <tr v-if="!table.items || !table.items.length">
          <td colspan="100%" class="u-text-center">No Data</td>
        </tr>

        <tr
          v-else
          v-for="row in allData"
          :key="row.id"
          :class="table.map['rowClass'](row)"
          class="c-table__row"
        >
          <td
            v-for="(col, index) in table.columns"
            :key="index"
            class="c-table__cell"
            v-html="showItem(row, col)"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    table: {
      columns: Array,
      items: Array,
      map: Object,
    },
  },

  data() {
    return {
      sortColumn: "",
      table_data: this.table.items,
      hasPaginate: false,
    };
  },

  methods: {
    showItem(row, col) {
      let key = col.key;  //based on defined structure
      let map = this.table.map; //custom mapped data
      if (map.hasOwnProperty(key)) {
        return map[key](row);
      } else {
        //nothing special
        return row.hasOwnProperty(key) ? row[key] : "";
      }
    },
  },

  computed: {
    allData() {
      if (this.table_data.hasOwnProperty("data")) {
        this.hasPaginate = true;
        return this.table_data.data;
        //is paginated
      } else {
        this.hasPaginate = false;
        return this.table_data;
        //is not paginated
      }
    },
  },
};
</script>

<style>
</style>
