<template>
  <VCard title="Client List" class="c-card--fluid">
    <div class="c-datatable">
      <div class="c-datatable__toolbar">
        <div>
          <pagination-component />
        </div>
        <div class="c-search">
          <input class="c-search__input" type="text" placeholder="Search..."/>
        </div>
      </div>
      <table class="c-table">
        <thead class="c-table__header">
          <tr class="c-table__row">
            <th
              class="c-table__th"
              v-for="col in columns"
              v-on:click="sortTable(col)"
              :key="col.id"
              v-bind:class="col == sortColumn ? 'is-active' : ''"
            >
              <img
                v-bind:src="
                  col == sortColumn
                    ? '/img/filter.is-active.svg'
                    : '/img/filter.svg'
                "
                alt="filter icon"
              />
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody class="c-table__body">
          <tr class="c-table__row" v-for="row in rows" :key="row.id">
            <td class="c-table__cell" v-for="col in columns" :key="col.id">
              {{ row[col] }}
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
      rows: [
        {
          id: 1,
          name: "Chandler Bing",
          phone: "305-917-1301",
          profession: "IT Manager",
          email: "Chandler@gmail.com",
          source: "Realtyna.com",
        },
        {
          id: 2,
          name: "Ross Geller",
          phone: "210-684-8953",
          profession: "Paleontologist",
          email: "Ross@gmail.com",
          source: "Realtyna.com",
        },
        {
          id: 3,
          name: "Rachel Green",
          phone: "765-338-0312",
          profession: "Waitress",
          email: "Rachel@gmail.com",
          source: "Houzes",
        },
        {
          id: 4,
          name: "Monica Geller",
          phone: "714-541-3336",
          profession: "Head Chef",
          email: "Monica@gmail.com",
          source: "Realtyna.com",
        },
        {
          id: 5,
          name: "Joey Tribbiani",
          phone: "972-297-6037",
          profession: "Actor",
          email: "Joey@gmail.com",
          source: "Realtyna.com",
        },
        {
          id: 6,
          name: "Phoebe Buffay",
          phone: "760-318-8376",
          profession: "Masseuse",
          email: "Phoebe@gmail.com",
          source: "Realtyna.com",
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

      this.rows.sort(function (a, b) {
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
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
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



