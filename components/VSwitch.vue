<template>
  <div class="c-form__control">
    <label class="c-switch" :class="{ 'is-active': internalValue }">
      <span class="c-switch__label" :class="{ 'c-switch__error': hasError }">{{ label }}</span>
      <input
        type="checkbox"
        role="switch"
        class="c-switch__input"
        :disabled="disabled"
        v-model="internalValue"
      />
      <span class="c-switch__slider"></span>
    </label>
    <span v-if="hasError" class="c-form__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      internalValue: this.checked,
    };
  },
  methods: {
    hasError() {
      return this.error !== '';
    }
  },
  watch: {
    internalValue(v) {
      this.$emit("input", v);
      this.$emit("validation");
    },
  },
};
</script>

<style>
</style>
