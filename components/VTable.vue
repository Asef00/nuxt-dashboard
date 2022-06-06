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
        <tr v-if="!table.items">
          <td colspan="100%" class="u-text-center">No Data</td>
        </tr>
        <tr
          class="c-table__row"
          v-else
          v-for="item in table.items"
          :key="item.id"
          :class="item.rowClass"
        >
          <template v-for="(col, index) in table.columns">
            <td :key="index" v-if="false" class="c-table__cell">
              <!-- Verified icon -->
              <template v-if="col == 'full_name' && item['_verified']">
                {{ item[col] }} <img src="/img/verify.svg" alt="" />
              </template>
              <!-- Paid so far -->
              <template v-else-if="col == 'paid_so_far'">
                <template v-if="item['_increment']">
                  {{ item[col] }}
                  <img src="/img/increment.svg" alt="" />
                </template>
                <template v-else>
                  {{ item[col] }}
                  <img src="/img/decrement.svg" alt="" />
                </template>
              </template>
            </td>
            <td
              class="c-table__cell"
              :key="index"
              v-html="item[col.key]"
              v-else
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
      items: Array
    },
  },
  data() {
    return {
      sortColumn: "",
    };
  },
};
</script>

<style>
</style>