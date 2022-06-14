<template>
  <VCard :loader="loaderRequest" title="List Person">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/person/create">Create</NuxtLink>
      </VBtn>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/person/create-cognito">Add form Cognito</NuxtLink>
      </VBtn>
    </template>
    <VTable @actionDetails="detailsItem($event)"
            @changePage="changePage($event)"
            @changePerPage="changePerPage($event)"
            @actionDelete="deleteItem($event)"
            :table="table"/>
  </VCard>
</template>

<script>
export default {
  name: "index",
  data() {
    let _this = this;
    return {
      showDetails: false,
      detailsItemId: 0,
      table: {
        columns: [
          {key: "id", label: "#"},
          {key: "full_name", label: "Full Name",},
          {key: "username", label: "Username",},
          {key: "status", label: "Status",},
          {key: "created_at", label: "Created At", class: "u-text-center"},
          {key: "updated_at", label: "Updated At", class: "u-text-center"},
          {key: "action", label: '<img src="/img/gear.svg" alt="" />', class: "u-text-center",},
        ],
        items: [],
        map: {
          action(item) {
            return `<NuxtLink to="/person/edit/${item.id}" class="c-badge u-bg-info">Edit</NuxtLink> |
                <NuxtLink to="/person/${item.id}" class="c-badge u-bg-primary">Details</NuxtLink>`;
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
            return item.enabled ? `<span class="c-badge u-bg-success">Enable</span>` : `<span class="c-badge u-bg-danger">Disable</span>`;
          },
          //REQUIRED
          rowClass() {
          },
        },
      },
    }
  },
  methods: {
    async list(page = null, limit = null) {
      this.startLoading();
      this.$store.commit('person/RESET_ERROR')
      await this.$store.dispatch("person/list", {
        page: page ?? this.getPaginate(),
        limit: limit ?? this.getLimit(),
        paginate: 1
      });
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.table.items = this.$store.state.person.list;
      }
      this.stopLoading()
    },
    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.startLoading()
        this.$store.commit('person/RESET_ERROR')
        await this.$store.dispatch("person/delete", id);
        let err = this.handleError(this.$store.state.person.error);
        if (!err) {
          this.$toast.success('Permission successfully deleted.');
          await this.list();
        }
        this.stopLoading()
      }
    },
    detailsItem(id) {
      this.detailsItemId = id;
      this.showDetails = true;
    },
    changePage(val) {
      this.setPaginate(val);
      this.list(val, this.getLimit());
    },
    changePerPage(val) {
      this.setLimit(val);
      this.setPaginate(1);
      this.list(1, val);
    },
  },
  created() {
    this.setTitle('Person')
    this.setBreadcrumb([
      {
        to: '/person',
        name: 'Person'
      }
    ])
    this.list()
  }
}
</script>

<style scoped>

</style>
