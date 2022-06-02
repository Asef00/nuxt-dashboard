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
          <template v-for="col in columns">
            <!-- NOTE: non column props should start with _ -->
            <th
              v-if="!col.startsWith('_')"
              v-bind:class="[
                col == sortColumn ? 'is-active' : '',
                col == 'note' ? 'u-text-center' : '',
                'c-table__th',
              ]"
            >
              <!-- #id column -->
              <template v-if="col == 'id'"> # </template>

              <!-- Filter icon -->
              <template v-else>
                <img
                  v-bind:src="
                    col == sortColumn
                      ? '/img/filter.is-active.svg'
                      : '/img/filter.svg'
                  "
                  alt="filter icon"
                />
                {{ col.split("_").join(" ") }}
              </template>
            </th>
          </template>
          <th class="c-table__th u-text-center">
            <img src="/img/edit.svg" alt="" />
          </th>
        </tr>
      </thead>
      <tbody class="c-table__body">
        <tr
          :class="[item['note'] > 0 ? 'has-note' : '', 'c-table__row']"
          v-for="item in items"
          :key="item.id"
        >
          <template v-for="col in columns">
            <td v-if="!col.startsWith('_')" :class="['c-table__cell']">
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
                <span v-for="tag in item[col]" class="c-badge">{{ tag }}</span>
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
  data() {
    return {
      ascending: false,
      sortColumn: "",
      items: [
        {
          id: 1,
          full_name: "Chandler Bing",
          source: "Realtyna.com",
          MLS: ["Treb", "MFR MLS", "XMLS"],
          paid_so_far: "$8,400",
          email: "Chandler@gmail.com",
          status: "Inactive",
          note: null,
          _verified: true,
          _increment: false,
        },
        {
          id: 2,
          full_name: "Ross Geller",
          source: "Realtyna.com",
          MLS: ["MFR MLS"],
          paid_so_far: "$3,200",
          email: "Ross@gmail.com",
          status: "active",
          note: null,
          _verified: false,
          _increment: true,
        },
        {
          id: 3,
          full_name: "Rachel Green",
          source: "Houzes",
          MLS: ["Treb", "MFR MLS"],
          paid_so_far: "$1,400",
          email: "Rachel@gmail.com",
          status: "active",
          note: null,
          _verified: false,
          _increment: true,
        },
        {
          id: 4,
          full_name: "Monica Geller",
          source: "Realtyna.com",
          MLS: ["XMLS"],
          paid_so_far: "$12,400",
          email: "Monica@gmail.com",
          status: "Inactive",
          note: 2,
          _verified: true,
          _increment: false,
        },
        {
          id: 5,
          full_name: "Joey Tribbiani",
          source: "Realtyna.com",
          MLS: ["ITech MLS"],
          paid_so_far: "$9,450",
          email: "Joey@gmail.com",
          status: "active",
          note: null,
          _verified: true,
          _increment: false,
        },
        {
          id: 6,
          full_name: "Phoebe Buffay",
          source: "Realtyna.com",
          MLS: [],
          paid_so_far: "$6,100",
          email: "Phoebe@gmail.com",
          status: "Inactive",
          note: null,
          _verified: false,
          _increment: true,
        },
      ],
    };
  },

  computed: {
    columns: function columns() {
      if (this.items.length == 0) {
        return [];
      }
      return Object.keys(this.items[0]);
    },
  },
};
</script>

<style>
</style>