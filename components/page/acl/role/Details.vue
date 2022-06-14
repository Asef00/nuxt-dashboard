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
        <label class="c-form__label">Created At</label>
        <span class="u-text-secondary">{{ dateFormat(data.created_at) }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Updated At</label>
        <span class="u-text-secondary">{{ dateFormat(data.updated_at) }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Permissions</label>
        <span v-for="item in data.permissions"
              class="c-badge u-bg-primary">{{ item.label }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0 pt-2">
        <label class="c-form__label">Fields</label>
        <span v-for="item in data.field_names"
              class="c-badge u-bg-primary">{{ item.label }}</span>
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
      this.$store.commit('role/RESET_ERROR')
      let list = this.$store.state.role.list;
      let item = list.find(item => item.id === this.id);
      if (item !== undefined) {
        this.data = item;
      } else {
        await this.$store.dispatch("role/show", this.id);
        let err = this.handleError(this.$store.state.role.error);
        if (!err) {
          this.data = this.$store.state.role.item;
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
