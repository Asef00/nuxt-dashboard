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
    </div>
    <h4 class="c-form__title mb-2 mt-2">Model Permission</h4>
    <div class="row">
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Id</label>
        <span class="u-text-secondary">{{ data.permission_model ? data.permission_model.id : '' }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Model name</label>
        <span class="u-text-secondary">{{ data.permission_model ? data.permission_model.model.name : '' }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Fields</label>
        <span v-for="field in data.permission_model ? data.permission_model.fields : []"
              class="c-badge u-bg-primary">{{ field }}</span>
      </div>

      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Conditions</label>
        <span v-for="(key,value) in data.permission_model?data.permission_model.conditions : []"
              class="u-text-secondary">{{ value }} : {{ key }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Created At</label>
        <span class="u-text-secondary">{{ data.permission_model? dateFormat(data.permission_model.created_at):'' }}</span>
      </div>
      <div class=" col-md-12 c-form__control c-form__control--inline mb-0">
        <label class="c-form__label">Updated At</label>
        <span class="u-text-secondary">{{ data.permission_model?dateFormat(data.permission_model.updated_at):'' }}</span>
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
      this.$store.commit('permission/RESET_ERROR')
      let list = this.$store.state.permission.list;
      let item = list.data.find(item => item.id === this.id);
      if (item !== undefined) {
        this.data = item;
      } else {
        await this.$store.dispatch("permission/show", this.id);
        let err = this.handleError(this.$store.state.permission.error);
        if (!err) {
          this.data = this.$store.state.permission.item;
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
