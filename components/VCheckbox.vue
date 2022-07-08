<template>
  <label :class="['c-checkbox', { 'is-active': isChecked }]">
    <input
      type="checkbox"
      class="c-checkbox__input"
      :value="inputValue"
      :disabled="disabled"
      v-model="isChecked"
    />
    {{ label }}
    <span class="c-checkbox__icon"></span>
  </label>
</template>

<script>
export default {
  name: "Checkbox",

  props: {
    label: {
      type: String,
      default: "",
    },

    //v-model: selected items list
    value: Array,
    inputValue: {
      type: [String, Number],
    },

    //initial checked
    checked: {
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
      isChecked: this.checked,
    };
  },

  watch: {
    isChecked(checked) {
      // push or remove from selected list
      if (checked) {
        this.value.push(this.inputValue);
      } else {
        this.value.remove(this.inputValue);
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/checkbox";
</style>
