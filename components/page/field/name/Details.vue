<template>
  <form action="" class="c-form">
    <h4 class="c-form__title mb-2">Details</h4>
    <div class="row">
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Id</label>
        <span class="u-text-secondary">{{ data.id }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Name</label>
        <span class="u-text-secondary">{{ data.name }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Label</label>
        <span class="u-text-secondary">{{ data.label }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Placeholder</label>
        <span class="u-text-secondary">{{ data.placeholder }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Default Value</label>
        <span class="u-text-secondary">{{ data.default_value }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Length</label>
        <span class="u-text-secondary">{{ data.length }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Required</label>
        <span class="u-text-secondary">{{ data.required }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Data set</label>
        <span v-for="item in data.data_set" class="c-badge c-badge--primary">{{ item }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Default access</label>
        <span v-for="item in data.default_access" class="c-badge c-badge--primary">{{ item }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Created At</label>
        <span class="u-text-secondary">{{ dateFormat(data.created_at) }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Updated At</label>
        <span class="u-text-secondary">{{ dateFormat(data.updated_at) }}</span>
      </div>
    </div>
    <h4 class="c-form__title mb-2 mt-2">Field type</h4>
    <div class="row">
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Id</label>
        <span class="u-text-secondary">{{ data.field_type.id }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Type</label>
        <span class="u-text-secondary">{{ data.field_type.type }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Label</label>
        <span class="u-text-secondary">{{ data.field_type.label }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Created At</label>
        <span class="u-text-secondary">{{ dateFormat(data.field_type.created_at) }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Updated At</label>
        <span class="u-text-secondary">{{ dateFormat(data.field_type.updated_at) }}</span>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Details",
  props: {
    id: {
      type: [Number, String],
      required: false
    }
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    async show() {
      this.startLoading()
      this.$store.commit('fieldName/RESET_ERROR')
      let list = this.$store.state.fieldName.list;
      let item = list.find(item => item.id === this.id);
      if (item !== undefined) {
        this.data = item;
      } else {
        await this.$store.dispatch("fieldName/show", this.id);
        let err = this.handleError(this.$store.state.fieldName.error);
        if (!err) {
          this.data = this.$store.state.fieldName.item;
        }
      }
      this.stopLoading()
    },
  },
  created() {
    this.show()
  }
}
</script>

<style scoped>

</style>
