<template>
  <form action="" class="c-form" :class="{'is-loading':loaderRequest}">
    <h4 class="c-form__title mb-2">Details</h4>
    <div class="c-form__control c-form__control--inline mb-0" v-for="(value,key) in data.data">
      <label class="c-form__label">{{ key }}</label>
      <span class="u-text-secondary">{{ value }}</span>
    </div>
  </form>
</template>

<script>
export default {
  name: "Details",
  props: {
    id: {
      type: [Number, String],
      required: false,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    async show() {
      this.startLoading();
      let list = this.$store.state.dashboard.item.person_product.latest;
      this.data = list.find((item) => item.id === this.id);
      this.stopLoading();
    },
  },
  created() {
    this.show();
  },
};
</script>
