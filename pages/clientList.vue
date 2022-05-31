<template>
  <VCard title="Client List" class="c-card--fluid">
    <div class="c-datatable">
      <div class="c-datatable__toolbar">
        <div>
          <pagination-component />
        </div>
        <div class="c-search">
          <input class="c-search__input" type="text" placeholder="Search..." />
        </div>
      </div>
      <table class="c-table">
        <thead class="c-table__header">
          <tr class="c-table__row">
            <th
              v-for="col in columns"
              v-on:click="sortTable(col)"
              :key="col.id"
              v-bind:class="[
                col == sortColumn ? 'is-active' : '',
                'c-table__th',
              ]"
            >
              <template v-if="col == 'id'"> # </template>
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
          </tr>
        </thead>
        <tbody class="c-table__body">
          <tr
            :class="[
              item['note'] > 0 ? 'has-note' : '',
              'c-table__row',
            ]"
            v-for="item in items"
            :key="item.id"
          >
            <td class="c-table__cell" v-for="col in columns" :key="col.id">
              <a
                href="#"
                class="c-notification"
                v-if="col == 'note' && item[col] > 0"
              >
                <img src="/img/note.svg" alt="" />
                <span class="c-notification__badge">{{ item[col] }}</span>
              </a>
              <template v-else>
                {{ item[col] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </VCard>
</template>

<script>
import PaginationComponent from "../components/PaginationComponent.vue";

export default {
  layout: "default",
  components: { PaginationComponent },

  data() {
    return {
      ascending: false,
      sortColumn: "",
      items: [
        {
          id: 1,
          full_name: "Chandler Bing",
          source: "Realtyna.com",
          MLS: [],
          paid_so_far: "$8,400",
          email: "Chandler@gmail.com",
          status: "Inactive",
          note: null,
        },
        {
          id: 2,
          full_name: "Ross Geller",
          source: "Realtyna.com",
          MLS: [],
          paid_so_far: "$3,200",
          email: "Ross@gmail.com",
          status: "Active",
          note: null,
        },
        {
          id: 3,
          full_name: "Rachel Green",
          source: "Houzes",
          MLS: [],
          paid_so_far: "$1,400",
          email: "Rachel@gmail.com",
          status: "Active",
          note: null,
        },
        {
          id: 4,
          full_name: "Monica Geller",
          source: "Realtyna.com",
          MLS: [],
          paid_so_far: "$12,400",
          email: "Monica@gmail.com",
          status: "Inactive",
          note: 2,
        },
        {
          id: 5,
          full_name: "Joey Tribbiani",
          source: "Realtyna.com",
          MLS: [],
          paid_so_far: "$9,450",
          email: "Joey@gmail.com",
          status: "Active",
          note: null,
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
        },
      ],
    };
  },
  methods: {
    sortTable: function sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      var ascending = this.ascending;

      this.items.sort(function (a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1;
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1;
        }
        return 0;
      });
    },
  },
  computed: {
    columns: function columns() {
      if (this.items.length == 0) {
        return [];
      }
      return Object.keys(this.items[0]);
    },
  },

  created() {
    this.setTitle("Clients");
    this.setBreadcrumb([
      {
        to: "dashboard",
        name: "Dashboard",
      },
      {
        to: "clientList",
        name: "Clients",
      },
    ]);
  },
};
</script>



