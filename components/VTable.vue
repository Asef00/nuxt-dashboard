<template>
  <div class="c-datatable">
    <div class="c-datatable__header">
      <div>
        <div class="c-perpage">
          Show
          <select class="c-perpage__input" name="per_page" id="per_page">
            <option v-html="per_page" :value="per_page"></option>
            <option v-html="30" value="30"></option>
            <option v-html="40" value="40"></option>
            <option v-html="50" value="50"></option>
            <option v-html="70" value="70"></option>
            <option v-html="100" value="100"></option>
          </select>
          entries
        </div>
      </div>
      <div class="c-search">
        <input class="c-search__input" type="text" placeholder="Search..." />
      </div>
    </div>
    <div class="c-datatable__body">
      <table class="c-table">
        <thead class="c-table__header">
          <tr class="c-table__row">
            <template v-for="col in table.columns">
              <th
                v-if="col.filterable"
                :key="col.key"
                :class="col.class"
                class="c-table__th c-filter"
                data-dropdown="container"
              >
                <button class="c-filter__btn" data-dropdown="btn">
                  <!-- Filter icon -->
                  <img
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
              <th
                v-else
                :key="col.key"
                v-html="col.label"
                class="c-table__th"
                :class="col.class"
              ></th>
            </template>
          </tr>
        </thead>
        <tbody class="c-table__body">
          <!-- if no data -->
          <tr v-if="!allData || !allData.length">
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
              v-for="col in table.columns"
              :key="col.key"
              class="c-table__cell"
              :class="col.class"
              v-html="showItem(row, col)"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="c-datatable__footer">
      <div class="c-pagination">
        <span class="c-pagination__arrow c-chevron c-chevron--left"></span>
        <button
          v-for="page in total_pages"
          :key="page"
          class="c-pagination__item"
          :class="page == current_page ? 'is-active' : ''"
        >
          {{ page }}
        </button>
        <span class="c-pagination__arrow c-chevron c-chevron--right"></span>
      </div>
    </div>
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
    per_page: {
      type: Number,
      default: 25,
    },
    total_pages: {
      type: Number,
    },
    current_page: {
      type: Number,
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
      let key = col.key; //based on defined structure
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
    per_page() {
      return this.table_data.per_page;
    },
    total_pages() {
      return this.table_data.total;
    },
    current_page() {
      return this.table_data.current_page;
    },
  },
};
</script>

<style  lang="scss">
@import "~/assets/scss/components/pagination";
</style>
