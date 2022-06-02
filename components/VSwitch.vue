<template>
  <div class="c-form__control">
    <label class="c-switch" :class="{ 'is-active': isActive }">
      <span class="c-switch__label" :class="{ 'c-switch__error': hasError() }">{{ label }}</span>
      <input
        type="checkbox"
        role="switch"
        class="c-switch__input"
        :disabled="disabled"
        v-model="checkedValue"
      />
      <span class="c-switch__slider"></span>
    </label>
    <span v-if="hasError()" class="c-form__error">{{ error }}</span>
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
      currentChecked: this.checked,
    };
  },

  watch: {
    checked() {
      this.currentChecked = Boolean(this.checked);
      this.$emit("validation");
    },
  },

  computed: {
    isActive() {
      return this.currentChecked;
    },

    checkedValue: {
      get() {
        return this.currentChecked;
      },
      set(v) {
        this.currentChecked = v;
        this.$emit("change", v);
        this.$emit("validation");
      },
    },
  },
};
</script>

<style>
</style>
