<template>
  <div class="o-page c-page--dashboard">
    <VCard>
      <div class="c-report">
        <div class="c-report__title">Alerts</div>
        <span class="c-report__big">536</span>
        <span class="c-report__change u-text-active">(+25%)</span>
        <span class="c-report__icon">
          <fa icon="triangle-exclamation" size="lg" />
        </span>
      </div>
      <VProgress
        bar="primary"
        title="overview of last month"
        subtitle="Monthly"
        :value="alertValue"
      />
    </VCard>

    <VCard>
      <div class="c-report">
        <div class="c-report__title">MLS Clients Active Requests</div>
        <span class="c-report__big">128</span>
        <span class="c-report__change u-text-active">(+25%)</span>
        <span class="c-report__icon">
          <fa icon="file-lines" size="lg" />
        </span>
      </div>
      <VProgress
        bar="info"
        title="overview of last month"
        subtitle="Monthly"
        :value="activeRequests0Value"
      />
    </VCard>

    <VCard>
      <div class="c-report">
        <div class="c-report__title">MLS Clients</div>
        <span class="c-report__big">1.2K</span>
        <span class="c-report__change u-text-inactive">(-11%)</span>
        <span class="c-report__icon">
          <fa icon="users" size="lg" />
        </span>
      </div>
      <VProgress
        bar="success"
        title="overview of last month"
        subtitle="Monthly"
        :value="clientsValue"
      />
    </VCard>

    <VCard :loader="loaderRequest">
      <VTable
        @changePage="changePage($event)"
        @changePerPage="changePerPage($event)"
        :table="table"
      />
    </VCard>
  </div>
</template>

<script>
export default {
  data() {
    let _this = this;
    return {
      alertValue: 40,
      activeRequests0Value: 60,
      clientsValue: 30,
      table: {
        columns: [
          { key: "id", label: "#" },
          { key: "full_name", label: "Full Name" },
          { key: "username", label: "Username" },
          { key: "status", label: "Status" },
          { key: "created_at", label: "Created At", class: "u-text-center" },
          { key: "updated_at", label: "Updated At", class: "u-text-center" },
          {
            key: "action",
            label: '<img src="/img/gear.svg" alt="" />',
            class: "u-text-center",
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
          //REQUIRED
          rowClass() {},
        },
      },
    };
  },

  methods: {
    async list(page = null, limit = null) {
      this.startLoading();
      this.$store.commit("person/RESET_ERROR");
      await this.$store.dispatch("person/list", {
        page: page ?? this.getPaginate(),
        limit: limit ?? this.getLimit(),
        paginate: 1,
      });
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.table.items = this.$store.state.person.list;
      }
      this.stopLoading();
    },
  },
  
  created() {
    this.list();
  },
};
</script>

<style lang="scss">
.c-report {
  font-weight: 600;
}
.c-report__icon {
  position: absolute;
  top: 0;
  right: 0;
  color: #e2e1ea;
  margin: $card-body-padding;
}
.c-report__big {
  @include font-size(32px);
  color: #182d49;
}
.c-report__change {
  @include font-size(14px);
}
</style>