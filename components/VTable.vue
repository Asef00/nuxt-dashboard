<template>
  <div class="c-datatable">
    <div class="c-datatable__header">
      <div class="c-datatable__title" v-if="title">{{ title }}</div>
      <div class="c-perpage" v-else-if="per_page">
        Show
        <select
          class="c-perpage__input"
          name="per_page"
          v-model="preferredPerPage"
        >
          <option v-for="(op, index) in perPageArray" :key="index" :value="op">
            {{ op }}
          </option>
        </select>
        entries
      </div>

      <div class="c-search">
        <input class="c-search__input" type="text" placeholder="Search..." />
      </div>
    </div>

    <div class="c-datatable__body">
      <table class="c-table" ref="table">
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
          <tr v-if="!list || !list.length">
            <td colspan="100%" class="u-text-center">No Data</td>
          </tr>
          <tr
            v-else
            v-for="row in list"
            :key="row.id"
            :class="table.map['rowClass'](row)"
            class="c-table__row"
          >
            <td
              v-for="col in table.columns"
              :key="col.key"
              class="c-table__cell"
              :class="col.class"
            >
              <v-runtime-template
                :template="String(showItem(row, col))"
              ></v-runtime-template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="c-datatable__footer">
      <div class="c-pagination" v-if="hasPaginate">
        <!-- prev btn -->
        <span
          :class="current_page === 1 ? 'is-disabled' : ''"
          class="c-pagination__arrow c-chevron c-chevron--left"
          @click="changePage(current_page - 1)"
        ></span>

        <!-- prev page dots -->
        <template v-if="hasPreDots">
          <button class="c-pagination__item" @click="changePage(1)">1</button>
          <span>...</span>
        </template>

        <!-- page numbers -->
        <template v-for="page in totalPaginate">
          <button
            v-if="Math.abs(page - current_page) < 3"
            :key="page"
            class="c-pagination__item"
            :class="page === current_page ? 'is-active' : ''"
            @click="page !== current_page ? changePage(page) : ''"
          >
            {{ page }}
          </button>
        </template>

        <!-- next page dots -->
        <template v-if="hasNextDots">
          <span>...</span>
          <button class="c-pagination__item" @click="changePage(totalPaginate)">
            {{ totalPaginate }}
          </button>
        </template>

        <!-- next btn -->
        <span
          :class="current_page === totalPaginate ? 'is-disabled' : ''"
          class="c-pagination__arrow c-chevron c-chevron--right"
          @click="changePage(current_page + 1)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template";

export default {
  components: {
    VRuntimeTemplate,
  },

  props: {
    title: String,
    table: {
      columns: Array,
      items: Array,
      map: Object,
    },
  },

  data() {
    return {
      list: [],
      per_page: 25,
      total_pages: 1,
      current_page: 1,
      hasPaginate: false,
      totalPaginate: 0,
      hasPreDots: false,
      hasNextDots: false,
      preferredPerPage: 25,
      perPageArray: [25, 50, 100],
      sortColumn: "",
    };
  },

  methods: {
    showItem(row, col) {
      let key = col.key; //based on defined structure
      let map = this.table.map; //custom mapped data
      if (map.hasOwnProperty(key)) {
        // using wrapper to fix functoin output for runtime template
        return `<span>${
          map[key](row) === undefined ? "" : map[key](row)
        }</span>`;
      } else {
        //nothing special
        return `<span>${
          row.hasOwnProperty(key)
            ? row[key] === undefined
              ? ""
              : row[key]
            : ""
        }</span>`;
      }
    },
    action(data, action) {
      this.$emit(`action${action}`, data);
    },
    changePage(target) {
      this.current_page = target;
      this.$emit("changePage", target);
    },
    applyPaginate() {
      this.totalPaginate = Math.ceil(this.total_pages / this.per_page);
      this.hasPreDots = this.current_page > 4;
      this.hasNextDots = this.current_page + 4 <= this.totalPaginate;
    },
    applyList(list) {
      if (list.hasOwnProperty("data")) {
        this.list = list.data;
        //is paginated
        this.hasPaginate = true;
        //get payload data
        this.per_page = list.per_page;
        this.current_page = list.current_page;
        this.total_pages = list.total;
        this.applyPaginate();
      } else {
        this.list = list;
      }
    },
  },

  watch: {
    "table.items": {
      handler(val) {
        this.applyList(val);
      },
      immediate: true,
    },
    current_page() {
      this.applyPaginate();
      // window.scrollTo({ top: this.$refs.table.offsetTop, behavior: 'smooth' })
      this.scrollToElement(this.$refs.table);
    },
    preferredPerPage(val) {
      this.$emit("changePerPage", val);
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/pagination";
</style>
