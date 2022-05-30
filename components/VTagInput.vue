<template>
  <div class="c-form__control">
    <label class="c-form__label">{{ label }}</label>
    <client-only>
      <vue-tags-input
        v-model="internalValue"
        :tags="internalList"
        @tags-changed="(newTags) => (this.internalList = newTags)"
        :class="[hasError() ? 'is-invalid' : '']"
      >
      <template slot="ti-input">
      </template>
      </vue-tags-input>
    </client-only>
    <span v-if="hasError()" class="c-form__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "VTagInput",
  props: {
    value: [String, Number],
    list: [String, Number, Array, Object],
    label: {
      type: [String, Number],
      required: true,
    },
    error: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      internalValue: this.value,
      internalList: this.list,
    };
  },
  created() {},
  watch: {
    internalValue(v) {
      this.$emit("input", v);
      this.$emit("validation");
    },
    internalList(v) {
      this.$emit("list", v);
      this.$emit("validation");
    },
  },
  methods: {
    hasError() {
      return this.error !== "";
    },
  },
};
</script>

<style scoped>
</style>
