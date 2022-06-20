<template>
  <form action="" class="c-form" :class="{'is-loading':loaderRequest}">
    <h4 class="c-form__title mb-2">Details</h4>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Id</label>
      <span class="u-text-secondary">{{ data.id }}</span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Product Title</label>
      <span class="u-text-secondary">{{ data.product ? data.product.title : '' }}</span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Status</label>
      <span class="u-text-secondary">{{ data.status }}</span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Site</label>
      <span class="u-text-secondary">{{ data.site }}</span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Version</label>
      <span class="u-text-secondary">{{ data.version }}</span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0" v-for="(value,key) in data.data">
      <label class="c-form__label">{{ key }}</label>
      <span class="u-text-secondary">{{ value }}</span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Created At</label>
      <span class="u-text-secondary">{{ dateFormat(data.created_at) }}</span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Updated At</label>
      <span class="u-text-secondary">{{ dateFormat(data.updated_at) }}</span>
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
      let list = this.$store.state.person.item;
      let item = undefined;
      if (list != null) {
        item = list.products.find((item) => item.id === this.id);
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
