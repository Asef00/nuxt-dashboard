<template>
  <div class="c-form__control">
    <label class="c-form__label">{{ label }}</label>
    <textarea @keyup="$emit('validation')"
              @blur="$emit('validation')"
              @keydown="$emit('validation')"
              :class="[hasError() ? 'is-invalid': '','c-form__input c-form__input--area']"
              :placeholder="placeholder"
              v-bind="$attrs"
              v-bind:value="value"
              v-on:input="$emit('input', $event.target.value)"
              :rows="rows"
              :disabled="disabled"
    ></textarea>
    <span v-if="hasError()" class="c-form__error">{{ error }}</span>
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
    error: {
      type: String,
      default: ''
    },
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
  created() {
  },
  methods: {
    hasError() {
      return this.error !== '';
    }
  }
}
</script>

<style scoped>

</style>
