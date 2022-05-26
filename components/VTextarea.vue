<template>
  <div class="c-form__control">
    <label class="c-form__label">{{ label }}</label>
    <textarea :class="[parent.hasError(keyValidation) ? 'is-invalid': '','c-form__input c-form__input--area']"
              :placeholder="placeholder"
              v-bind="$attrs"
              v-bind:value="value"
              v-on:input="$emit('input', $event.target.value)"
              :rows="rows"
              @keyup="parent.validate(keyValidation)"
              @blur="parent.validate(keyValidation)"
              @keydown="parent.validate(keyValidation)"
              :disabled="disabled"
    ></textarea>
    <span v-if="parent.hasError(keyValidation)" class="c-form__error">{{
        parent.errorMessage(keyValidation)
      }}</span>
  </div>
</template>

<script>
export default {
  name: "VTextarea",
  props: {
    value: [String, Number],
    label: {
      type: [String, Number],
      required: true
    },
    rows: {
      type: [Number],
      default: 4
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String
    },
    keyValidation: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      parent: ''
    };
  },
  watch: {
    value() {
      this.parent.validate(this.keyValidation)
    }
  },
  created() {
    this.parent = this.$parent;
  }
}
</script>

<style scoped>

</style>
