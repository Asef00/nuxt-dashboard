<template>
  <div class="c-datatable">
    <div class="c-datatable__header">
      <div class="c-datatable__title" v-if="title">{{ title }}</div>
      <div
        class="c-perpage"
        v-else-if="preferredPerPage === 25 ? hasPaginate : true"
      >
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
      <div v-else></div>
      <div v-if="isSearchable" class="c-search">
        <VInput
          inputClass="c-search__input"
          placeholder="Search..."
          class="m-0"
          v-model="searchVal"
          @enter="filter"
        >
          <template #btn>
            <VBtn size="sm" class="c-search__btn" @action="filter">
              Filter
            </VBtn>
          </template>
        </VInput>
      </div>
    </div>

    <div class="c-datatable__body" ref="dataTable__body">
      <!-- <vue-custom-scrollbar> -->
      <table class="c-table" ref="table">
        <thead class="c-table__header">
          <tr class="c-table__row">
            <template v-for="col in table.columns">
              <th :key="col.key" class="c-table__th">
                <div :class="['c-table__th-wrapper', col.class]">
                  <!-- if filterable -->
                  <VDropdown
                    isFilter
                    wrapper="span"
                    position="bottom"
                    menuStyle="none"
                    v-if="col.filterType"
                    :key="col.key"
                    :class="[
                      col.class,
                      { 'u-width-auto': col.filterType == 'number' },
                    ]"
                    @toggleShow="fix()"
                  >
                    <!-- Filter icon -->
                    <template #btn>
                      <VIcon
                        :icon="
                          col == filterColumn ? 'filter.is-active' : 'filter'
                        "
                      />
                    </template>

                    <template #menu>
                      <!-- switch (filter-type)-->
                      <!-- case "number": -->
                      <NumberFilter
                        v-if="col.filterType == 'number'"
                        @filter="
                          filterNumber(
                            $event,
                            col.filterKey ? col.filterKey : col.key
                          )
                        "
                      />
                      <!-- case "date": -->
                      <DateFilter
                        v-else-if="col.filterType == 'date'"
                        @filter="
                          filterDate(
                            $event,
                            col.filterKey ? col.filterKey : col.key
                          )
                        "
                      />
                      <!-- case "multiselect": -->
                      <MultiselectFilter
                        v-else-if="col.filterType == 'multiselect'"
                        @filter="
                          filterMultiselect(
                            $event,
                            col.filterKey ? col.filterKey : col.key
                          )
                        "
                        :items="col.filterItems"
                      />
                      <!-- case "select": -->
                      <SelectFilter
                        v-else-if="col.filterType == 'select'"
                        @filter="
                          filterNumber(
                            $event,
                            col.filterKey ? col.filterKey : col.key
                          )
                        "
                        :items="col.filterItems"
                      />
                    </template>
                  </VDropdown>

                  <span v-html="col.label"></span>

                  <span v-if="col.sortable" class="c-sort">
                    <VChevron class="c-sort__item" dir="up" />
                    <VChevron class="c-sort__item" dir="down" />
                  </span>
                </div>
              </th>
            </template>
          </tr>
        </thead>
        <tbody class="c-table__body">
          <!-- if no data -->
          <tr v-if="!list || !list.length">
            <td
              colspan="100%"
              style="height: 10em; font-size: 16px"
              class="u-text-center"
            >
              No Data Available
            </td>
          </tr>
          <!-- else -->
          <tr
            v-else
            v-for="(row, index) in list"
            :key="index"
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
      <!-- </vue-custom-scrollbar> -->
    </div>

    <div class="c-datatable__footer" v-if="hasPaginate">
      <div class="c-pagination">
        <!-- prev btn -->
        <VChevron
          :class="current_page === 1 ? 'is-disabled' : ''"
          class="c-pagination__arrow"
          @click="changePage(current_page - 1)"
          type="chevron"
          dir="left"
        />

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
        <VChevron
          :class="current_page === totalPaginate ? 'is-disabled' : ''"
          class="c-pagination__arrow"
          @click="changePage(current_page + 1)"
          type="chevron"
          dir="right"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template";
import DateFilter from "./filter/DateFilter.vue";
import NumberFilter from "./filter/NumberFilter.vue";
import MultiselectFilter from "./filter/MultiselectFilter.vue";
import SelectFilter from "./filter/SelectFilter.vue";

export default {
  components: {
    VRuntimeTemplate,
    DateFilter,
    NumberFilter,
    MultiselectFilter,
    SelectFilter,
  },

  props: {
    title: String,
    table: {
      columns: Array,
      items: Array,
      map: Object,
      searchKeys: Array,
    },
    isSearchable: {
      type: Boolean,
      default: false,
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
      filterColumn: "",

      selected: "", //for checkbox
      selectedOptions: [], //for checkbox

      startDate: "",
      endDate: "",

      dropdownIsActive: false,
      searchVal: "",
    };
  },

  methods: {
    fix() {
      this.$nextTick(() => {
        this.dropdownIsActive = !this.dropdownIsActive;
      });
    },

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
      this.hasPaginate = this.totalPaginate > 1;
    },

    applyList(list) {
      if (list.hasOwnProperty("data")) {
        this.list = list.data;
        //get payload data
        this.per_page = list.per_page;
        this.current_page = list.current_page;
        this.total_pages = list.total;
        this.applyPaginate();
      } else {
        this.list = list;
      }
    },

    //search filter
    filter() {
      if (this.table.searchKeys !== undefined) {
        let search = {};
        for (let item of this.table.searchKeys) {
          search[item + "_like"] = this.searchVal;
        }
        this.$emit("search", search);
      }
    },

    ////////column filters/////////
    filterDate(val, key) {
      console.log(key, val);
    },
    filterNumber(val, key) {
      console.log(key, val);
    },
    filterMultiselect(val, key) {
      console.log(key, val);
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
      this.scrollToElement(this.$refs.table);
    },
    preferredPerPage(val) {
      this.$emit("changePerPage", val);
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/datatable";
@import "~/assets/scss/components/table";
@import "~/assets/scss/components/pagination";
@import "~/assets/scss/components/search";
@import "~/assets/scss/components/radio";
</style>
