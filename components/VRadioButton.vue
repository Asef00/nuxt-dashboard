<template>
  <label class="c-radio">
    <input
      type="radio"
      class="c-radio__input"
      :value="radio.value"
      :name="name"
      :disabled="radio.disabled"
      @change="$parent.$emit('input', $event.target.value)"
      :checked="radio.selected"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "Radio",

  props: {
    radio: {
      required: true,
      type: Object,
      validator: function (obj) {
        return (
          obj.value &&
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
};
</script>

<style lang="scss">
// @import "~/assets/scss/components/radio";
</style>
