<template>
  <div class="c-form__control">
      <label class="c-switch" :class="{ 'is-active': isActive }">
        {{ labelText }}
        <input
          type="checkbox"
          role="switch"
          class="c-switch__input"
          :disabled="disabled"
          v-model="checkedValue"
        />
        <span class="c-switch__slider"></span>
      </label>
  </div>
</template>

<script>
export default {
  props: {
    defaultState: {
      type: Boolean,
      default: false,
    },

    labelText: {
      type: String,
      default: "off",
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentState: this.defaultState,
    };
  },

  watch: {
    defaultState: function defaultState() {
      this.currentState = Boolean(this.defaultState);
    },
  },

  computed: {
    isActive() {
      return this.currentState;
    },

    checkedValue: {
      get() {
        return this.currentState;
      },
      set(newValue) {
        this.currentState = newValue;
        this.$emit("change", newValue);
      },
    },
  },
};
</script>

<style>
</style>