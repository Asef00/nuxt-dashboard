<template>
  <div class="o-page c-page--dashboard container-fluid">
    <div class="row">
      <div class="col-xl-4 col-md-6">
        <VCard class="mr-0 ml-0">
          <div class="c-report">
            <div class="c-report__title">
              Alerts
              <span class="c-report__icon">
                <fa icon="triangle-exclamation" size="lg" />
              </span>
            </div>
            <span class="c-report__big">536</span>
            <span class="c-report__change u-text-active">(+25%)</span>
          </div>
          <VProgress
            bar="primary"
            title="overview of last month"
            subtitle="Monthly"
            :value="alertValue"
          />
        </VCard>
      </div>

      <div class="col-xl-4 col-md-6">
        <VCard class="mr-0 ml-0">
          <div class="c-report">
            <div class="c-report__title">
              MLS Clients Active Requests
              <span class="c-report__icon">
                <fa icon="file-lines" size="lg" />
              </span>
            </div>
            <span class="c-report__big">128</span>
            <span class="c-report__change u-text-active">(+25%)</span>
          </div>
          <VProgress
            bar="info"
            title="overview of last month"
            subtitle="Monthly"
            :value="activeRequests0Value"
          />
        </VCard>
      </div>

      <div class="col-xl-4 col-md-6">
        <VCard class="mr-0 ml-0">
          <div class="c-report">
            <div class="c-report__title">
              MLS Clients
              <span class="c-report__icon">
                <fa icon="users" size="lg" />
              </span>
            </div>
            <span class="c-report__big">1.2K</span>
            <span class="c-report__change u-text-inactive">(-11%)</span>
          </div>
          <VProgress
            bar="success"
            title="overview of last month"
            subtitle="Monthly"
            :value="clientsValue"
          />
        </VCard>
      </div>

      <div class="col-xl-4">
        <VCard :loader="loaderRequest" class="mr-0 ml-0">
          <VTable :table="table" title="Overdue Payments" />
        </VCard>
      </div>

      <div class="col-xl-8">
        <VCard :loader="loaderRequest" class="mr-0 ml-0">
          <VTable :table="table" title="Multiple Missed Payments" />
        </VCard>
      </div>
    </div>
  </div>
</template>

<script>
import json from "~/static/json/dashboard.json";

export default {
  name: "dashboard",

  data() {
    return {
      alertValue: 40,
      activeRequests0Value: 60,
      clientsValue: 30,

      table: {
        columns: [
          { key: "client", label: "Client" },
          {
            key: "last_update",
            label: "Last Update",
            class: "u-table--center",
          },
          { key: "status", label: "Status" },
          {
            key: "action",
            label: '<VIcon icon="gear" />',
            class: "u-table--center",
          },
        ],
        items: json,
        map: {
          action(item) {
            return `
            <NuxtLink v-if="can('person.update')" to="/person/edit/${item.id}" title="View Details">
              <fa icon="eye" size="lg" />
            </NuxtLink>`;
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

  created() {
    this.setTitle("Dashboard");
    this.setBreadcrumb([]);
  },
};
</script>