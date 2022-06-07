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
        <!--      <tr v-if="!table.items || !table.items.length">-->
        <!--        <td colspan="100%" class="u-text-center">No Data</td>-->
        <!--      </tr>-->

        <tr
          class="c-table__row"
          v-for="item in allData"
          :key="item.id"
          :class="item.rowClass"
        >
          <template v-for="(col, index) in table.columns">
            <td
              class="c-table__cell"
              :key="index"
              v-html="showItem(item, col)"
            ></td>
          </template>
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
      data: this.table.items,
      hasPaginate: false,
    };
  },
  methods: {
    showItem(item, col) {
      let key = col.key;
      let map = this.table.map;
      if (map.hasOwnProperty(key)) {
        return map[key](item);
      } else {
        return item.hasOwnProperty(key) ? item[key] : "";
      }
    },
  },
  computed: {
    allData() {
      if (this.data.hasOwnProperty("data")) {
        this.hasPaginate = true;
        return this.data.data;
        //is paginated
      } else {
        this.hasPaginate = false;
        return this.data;
        //is not paginated
      }
    },
  },
};
</script>

<style>
</style>
