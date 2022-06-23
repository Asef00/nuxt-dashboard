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
      this.$store.commit("person/RESET_ERROR");
      this.$store.commit("person/product/RESET_ERROR");
      let list = this.$store.state.person.product.list;
      let item = undefined;
      if (list != null) {
        item = list.find((item) => item.id === this.id);
      }
      if (item !== undefined) {
        this.data = item;
      } else {
        await this.$store.dispatch("person/product/show", this.id);
        let err = this.handleError(this.$store.state.person.product.error);
        if (!err) {
          this.data = this.$store.state.person.product.item;
        }
      }
      this.stopLoading();
    },
  },
  created() {
    this.show();
  },
};
</script>
