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
            v-for="(col, index) in columns"
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
              <!-- {{ col.split("_").join(" ") }} -->
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
        <tr v-if="!items">
          <td colspan="100%" class="u-text-center">No Data</td>
        </tr>
        <tr
          v-else
          :class="[item['note'] > 0 ? 'has-note' : '', 'c-table__row']"
          v-for="item in items"
          :key="item.id"
        >
          <template v-for="(col, index) in columns">
            <td :class="['c-table__cell']" :key="index">
              <!-- NOTE: non column props should start with _ -->

              <!-- notifications -->
              <a
                href="#"
                class="c-notification"
                v-if="col == 'note' && item[col] > 0"
              >
                <img src="/img/note.svg" alt="" />
                <span class="c-notification__badge">{{ item[col] }}</span>
              </a>
              <!-- Verified icon -->
              <template v-else-if="col == 'full_name' && item['_verified']">
                {{ item[col] }} <img src="/img/verify.svg" alt="" />
              </template>
              <!-- MLS tags -->
              <template v-else-if="col == 'MLS'">
                <span
                  v-for="(tag, index) in item[col]"
                  :key="index"
                  class="c-badge"
                  >{{ tag }}</span
                >
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
              <!-- Status -->
              <template v-else-if="col == 'status'">
                <span
                  :class="[
                    item[col] == 'active'
                      ? 'c-status--active'
                      : 'c-status--inactive',
                    'c-status',
                  ]"
                >
                  {{ item[col] }}
                </span>
              </template>
              <!-- Nothing special -->
              <template v-else>
                {{ item[col] }}
              </template>
            </td>
          </template>
          <td class="c-table__cell u-text-center">
            <a href="#" class="c-table__link">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
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