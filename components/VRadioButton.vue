<template>
  <label class="c-radio">
    <input
      type="radio"
      class="c-radio__input"
      :value="radio.value"
      :name="name"
      :disabled="radio.disabled"
      @change="$parent.$emit('input', $event.target.value)"
      :checked="isChecked"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "Radio",

  props: {
    value: String,

    radio: {
      required: true,
      type: Object,
      validator: function (obj) {
        // default selected could have empty value
        return (
          (obj.value || obj.selected) &&
          typeof obj.value == "string" &&
          (typeof obj.disabled == "boolean" ||
            typeof obj.disabled == "undefined") &&
          (typeof obj.selected == "boolean" ||
            typeof obj.selected == "undefined")
        );
      },
    },

    name: {
      required: true,
      type: String,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      //initial checked
      isChecked: this.radio.selected,
    };
  },

  watch: {
    value() {
      this.isChecked = this.value == this.radio.value;
    },
  },
};
</script>

<style lang="scss">
// @import "~/assets/scss/components/radio";
</style>
