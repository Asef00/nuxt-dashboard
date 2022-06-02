<template>
  <div class="c-form__control">
    <label class="c-checkbox" :class="{ 'is-active': isActive }">
      <input
        type="checkbox"
        class="c-checkbox__input"
        :value="inputValue"
        :disabled="disabled"
        v-model="checkedValue"
      />
      {{ label }}
      <span class="c-checkbox__icon"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    label: String,

    value: Array,

    inputValue: String,

    defaultState: {
      type: Boolean,
      default: false,
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