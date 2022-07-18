<template>
  <div class="c-datatable">
    <!-- Header -->
    <div class="c-datatable__header">
      <!-- Title -->
      <div class="c-datatable__title" v-if="title">{{ title }}</div>

      <!-- Perpage -->
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
      <!-- Hack to fix flex box -->
      <div v-else></div>

      <!-- Search -->
      <div v-if="isSearchable" class="c-search">
        <VInput
          inputClass="c-search__input c-form__input c-form__input--sm"
          placeholder="Search..."
          class="m-0"
          v-model="searchVal"
          @enter="search()"
        >
          <template #btn>
            <VBtn size="sm" class="c-search__btn" @action="search()">
              Filter
            </VBtn>
          </template>
        </VInput>
      </div>
    </div>
    <!-- Body -->
    <div class="c-datatable__body" ref="dataTable__body">
      <!-- <vue-custom-scrollbar> -->
      <table class="c-table" ref="table">
        <thead class="c-table__header">
        <tr class="c-table__row">
          <template v-for="col in table.columns">
            <th :key="col.key" class="c-table__th">
              <div :class="['c-table__th-wrapper', col.class]">
                <!-- if filterable -->
                <template v-if="col.filterType">
                  <VDropdown
                    isFilter
                    wrapper="span"
                    position="bottom"
                    menuStyle="none"
                    :class="col.class"
                    :hideKey="dropdownHideKey"
                    fixed
                  >
                    <!-- Filter icon -->
                    <template #btn>
                      <!-- we only check first key as convention  -->
                      <VIcon
                        :icon="
                            activeFilters.includes(getFilterKey(col))
                              ? 'filter.is-active'
                              : 'filter'
                          "
                      />
                    </template>

                    <template #menu>
                      <!-- switch (filter-type)-->
                      <!-- case "number": -->
                      <NumberFilter
                        v-if="col.filterType == 'number'"
                        @filter="filterNumber($event, getFilterKey(col))"
                      />
                      <!-- case "date": -->
                      <DateFilter
                        v-else-if="col.filterType == 'date'"
                        @filter="filterDate($event, getFilterKey(col))"
                      />
                      <!-- case "multiselect": -->
                      <MultiselectFilter
                        v-else-if="col.filterType == 'multiselect'"
                        @filter="filterSelect($event, getFilterKey(col))"
                        :items="col.filterItems"
                      />
                      <!-- case "select": -->
                      <SelectFilter
                        v-else-if="col.filterType == 'select'"
                        @filter="filterSelect($event, getFilterKey(col))"
                        :items="col.filterItems"
                      />
                      <!-- case "search": -->
                      <SearchFilter
                        v-else-if="col.filterType == 'search'"
                        @filter="filterSearch($event, getFilterKey(col))"
                      />
                    </template>
                  </VDropdown>
                </template>

                <span v-html="col.label"></span>

                <span v-if="col.sortable" class="c-sort">
                    <VChevron
                      :class="[
                        'c-sort__item',
                        {
                          'is-active':
                            activeSort.key == getFilterKey(col) &&
                            activeSort.order == 'desc',
                        },
                      ]"
                      dir="up"
                      @click="toggleSort(getFilterKey(col), 'desc')"
                    />
                    <VChevron
                      :class="[
                        'c-sort__item',
                        {
                          'is-active':
                            activeSort.key == getFilterKey(col) &&
                            activeSort.order == 'asc',
                        },
                      ]"
                      dir="down"
                      @click="toggleSort(getFilterKey(col), 'asc')"
                    />
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
    <!-- Footer -->
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
// filter components
import DateFilter from "./filter/DateFilter.vue";
import NumberFilter from "./filter/NumberFilter.vue";
import MultiselectFilter from "./filter/MultiselectFilter.vue";
import SelectFilter from "./filter/SelectFilter.vue";
import SearchFilter from "./filter/SearchFilter.vue";

export default {
  components: {
    VRuntimeTemplate,
    DateFilter,
    NumberFilter,
    MultiselectFilter,
    SelectFilter,
    SearchFilter,
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
      activeFilters: [],
      activeSort: {
        key: "",
        order: "",
      },

      searchVal: "",
      //a key to watch in VDropdown
      dropdownHideKey: 0,
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

    hideDropdown() {
      //change the key to trigger watch in VDropdown
      this.dropdownHideKey++;
    },

    //search filter
    search() {
      if (this.table.searchKeys !== undefined) {
        let search = {};
        for (let item of this.table.searchKeys) {
          search[item + "_like"] = this.searchVal;
        }
        this.$emit("search", search);
      }
    },
    ////////column filters/////////
    filterNumber({val, op}, k) {
      let filterVal = {};
      let result = this.getFilterResult(val, k, {operator: op});
      for (let r of result) {
        let o = r.operator;
        let v = r.value === "" ? null : r.value;

        let queryArr = ["_in", "_lt", "_gt", "_lte", "_gte", "_notIn"];
        queryArr.forEach((item) => {
          this.dropOldFilter(r.key + item);
        });
        // add new filter
        switch (o) {
          case "=":
            filterVal[r.key + "_in"] = v;
          case "<":
            filterVal[r.key + "_lt"] = v;
          case ">":
            filterVal[r.key + "_gt"] = v;
          case "<=":
            filterVal[r.key + "_lte"] = v;
          case ">=":
            filterVal[r.key + "_gte"] = v;
          case "!=":
            filterVal[r.key + "_notIn"] = v;
        }
      }
      this.filter(result, filterVal);
    },
    filterDate(val, k) {
      let filterVal = {};
      let result = this.getFilterResult(val, k);
      for (let r of result) {
        let v = r.value.split(",");
        let start = v[0];
        let end = v[1];
        this.dropOldFilter(r.key + "_date");
        this.dropOldFilter(r.key + "_dateBetween");
        if (r.value !== "") {
          if (end === undefined) {
            filterVal[r.key + "_date"] = this.dateFormat(start, "yyyy-MM-dd");
          } else {
            filterVal[r.key + "_dateBetween"] =
              this.dateFormat(start, "yyyy-MM-dd") +
              "," +
              this.dateFormat(end, "yyyy-MM-dd");
          }
        }
      }
      this.filter(result, filterVal);
    },
    filterSelect(val, k) {
      let filterVal = {};
      let result = this.getFilterResult(val, k);
      for (let r of result) {
        let k = r.key.split(",");
        if (k[1] === "with") {
          let v = `${k[0]}=>${k[2]}_in=${r.value}`;
          let params = this.$store.state.axiosParams["with"];
          if (params === undefined) {
            filterVal["with"] = v;
          } else {
            this.dropOldFilter("with");
            filterVal["with"] = r.value === "" ? null : v;
          }
        } else {
          this.dropOldFilter(k[0]);
          filterVal[k[0]] = r.value === "" ? null : r.value;
        }
      }
      this.filter(result, filterVal);
    },
    filterSearch(val, k) {
      let filterVal = {};
      let result = this.getFilterResult(val, k);
      for (let r of result) {
        let key = r.key + '_like';
        this.dropOldFilter(key);
        filterVal[key] = r.value === "" ? null : r.value;
      }
      this.filter(result, filterVal);
    },
    // front-line filter method
    filter(arr, filterVal = {}) {
      //push new filters
      this.$emit("filter", filterVal);
      // to check activeness:
      /// we only check first key as convention

      // if at least one value has been set
      if (arr.some((obj) => obj.value)) {
        this.activeFilters.push(arr[0].key);
      } else {
        this.activeFilters = this.activeFilters.filter(
          (item) => item !== arr[0].key
        );
      }
      this.hideDropdown();
    },
    // sort methods
    toggleSort(k, o) {
      if (this.activeSort.key == k && this.activeSort.order == o) {
        this.activeSort.key = "";
        this.activeSort.order = "";
      } else {
        this.activeSort.key = k;
        this.activeSort.order = o;
      }
      let sort =
        this.activeSort.order === ""
          ? {sort: null}
          : {sort: `${this.activeSort.key}:${this.activeSort.order}`};
      this.$emit("filter", sort);
    },
    //----------UTILITIES------------
    dropOldFilter(key) {
      delete this.$store.state.axiosParams[key];
    },
    getFilterResult(val, k, obj = {}) {
      let result = [];
      // if multiple keys
      if (Array.isArray(k)) {
        for (let item of k) {
          result.push(
            Object.assign(
              {
                key: item,
                value: val,
              },
              obj
            )
          );
        }
      }
      // else
      else {
        result.push(
          Object.assign(
            {
              key: k,
              value: val,
            },
            obj
          )
        );
      }
      // console.log(result);
      return result;
    },
    getFilterKey(col) {
      if (col.filterKey) {
        return Array.isArray(col.filterKey) ? col.filterKey[0] : col.filterKey;
      } else return col.key;
    },
  },

  watch: {
    "table.items": {
      handler(val) {
        this.applyList(val);
      },
      immediate: true,
      deep: true,
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
@import "~/assets/scss/components/sort";
@import "~/assets/scss/components/pagination";
@import "~/assets/scss/components/search";
@import "~/assets/scss/components/radio";
</style>
