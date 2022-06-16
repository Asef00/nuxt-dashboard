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
  </div>
</template>

<script>
export default {
  data() {
    return {
      alertValue: 40,
      activeRequests0Value: 60,
      clientsValue: 30,
    };
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