<template>
  <div class="c-form__control">
    <label class="c-checkbox" :class="{ 'is-active': internalValue }">
      <input
        type="checkbox"
        class="c-checkbox__input"
        :value="data"
        :disabled="disabled"
        v-model="internalValue"
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
    data: {
      type: [String, Number]
    },
    list: {
      type: [Array, Object]
    },
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
      internalValue: '',
    };
  },

  watch: {
    internalValue(v) {
      let d = this.data
      if (typeof (d) === 'undefined') {
        this.$emit('input', v)
      } else {
        if (v) {
          this.list.push(d)
        } else {
          this.list.remove(d)
        }
      }
    },
  },

};
</script>

<style lang="scss">
@import "~/assets/scss/components/checkbox";
</style>
