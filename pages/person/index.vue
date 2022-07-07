<template>
  <VCard :loader="loaderRequest" title="List Persons">
    <template #header>
      <VBtn
        to="/person/create"
        v-if="can('person.store')"
        class="m-0 c-btn--small"
      >
        Create New
      </VBtn>
      <VBtn
        to="/person/create-cognito"
        v-if="can('person.cognito.store')"
        class="m-0 c-btn--small"
      >
        Add From Cognito
      </VBtn>
    </template>
    <VTable
      @changePage="changePage($event)"
      @changePerPage="changePerPage($event)"
      @search="search($event)"
      :table="table"
      isSearchable
    />
  </VCard>
</template>

<script>
export default {
  name: "index",
  permission: "person.index",
  data() {
    let _this = this;
    return {
      showDetails: false,
      detailsItemId: 0,
      table: {
        columns: [
          {key: "id", label: "#"},
          {key: "full_name", label: "Full Name"},
          {key: "username", label: "Username"},
          {key: "status", label: "Status"},
          {key: "roles", label: "Roles"},
          {
            key: "created_at",
            label: "Created At",
          },
          {key: "updated_at", label: "Updated At",},
          {
            key: "action",
            label: '<img src="/img/gear.svg" alt="" />',
            class: "u-table--center",
          },
        ],
        items: [],
        map: {
          action(item) {
            return `<NuxtLink v-if="can('person.update')" to="/person/edit/${item.id}" class="c-badge u-bg-info">Edit</NuxtLink> |
                <NuxtLink v-if="can('person.show')" to="/person/${item.id}" class="c-badge u-bg-primary">Details</NuxtLink>`;
          },
          created_at(item) {
            return _this.dateFormat(item.created_at);
          },
          updated_at(item) {
            return _this.dateFormat(item.updated_at);
          },
          full_name(item) {
            return `${item.name} ${item.family_name}`;
          },
          status(item) {
            return item.enabled
              ? `<span class="c-badge u-bg-success">Enable</span>`
              : `<span class="c-badge u-bg-danger">Disable</span>`;
          },
          roles(item) {
            let data = ''
            for (let role of item.roles) {
              data += '<span class="c-badge u-bg-primary mr-1">' + role.label + '</span>'
            }
            return data;
          },
          //REQUIRED
          rowClass() {
          },
        },
        searchKeys: ['name', 'family_name', 'username']
      },
    };
  },
  methods: {
    async list() {
      this.startLoading();
      this.setWith('roles')
      this.$store.commit("person/RESET_ERROR");
      await this.$store.dispatch("person/list");
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.table.items = this.$store.state.person.list;
      }
      this.stopLoading();
    },
    changePage(val) {
      this.setPaginate(val);
      this.list();
    },
    changePerPage(val) {
      this.setLimit(val);
      this.setPaginate(1);
      this.list();
    },
    search(val) {
      this.resetAxiosParams()
      this.setAxiosParams(val)
      this.list()
    }
  },
  created() {
    this.setTitle("Manage Persons");
    this.setBreadcrumb([
      {
        to: "/person",
        name: "Person",
      },
    ]);
    this.resetAxiosParams();
    this.list();
  },
};
</script>
