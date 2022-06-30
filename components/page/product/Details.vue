<template>
  <form action="" class="c-form">
    <h4 class="c-form__title mb-2">Details</h4>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Id</label>
      <span class="u-text-secondary">{{ data.id }}</span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Title</label>
      <span class="u-text-secondary">{{ data.title }}</span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Slug</label>
      <span class="u-text-secondary">{{ data.slug }}</span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">Description</label>
      <span class="u-text-secondary">{{ data.description }}</span>
    </div>
    <div class="c-form__control c-form__control--inline">
      <label class="c-form__label">Fields</label>
      <span v-for="field in data.data_fields" class="c-badge u-bg-primary mr-0">
        {{ field }}
      </span>
    </div>
    <div class="c-form__control c-form__control--inline mb-0">
      <label class="c-form__label">License mode</label>
      <span class="u-text-secondary">{{ data.license_mode.label }}</span>
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
      this.$store.commit("product/RESET_ERROR");
      let list = this.$store.state.product.list;
      let item = list.data.find((item) => item.id === this.id);
      if (item !== undefined) {
        this.data = item;
      } else {
        await this.$store.dispatch("product/show", this.id);
        let err = this.handleError(this.$store.state.product.error);
        if (!err) {
          this.data = this.$store.state.product.item;
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
