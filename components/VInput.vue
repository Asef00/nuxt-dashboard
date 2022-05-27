<template>
  <div class="c-form__control">
    <label class="c-form__label">{{ label }}</label>
    <input @keyup="$emit('validation')" @blur="$emit('validation')"
           @keydown="$emit('validation')"
           v-bind="$attrs"
           v-bind:value="value"
           v-on:input="$emit('input', $event.target.value)"
           :type="type"
           :placeholder="placeholder"
           :class="[this.hasError() ? 'is-invalid': '','c-form__input']"
           :disabled="disabled"
    />
    <span v-if="this.hasError()" class="c-form__error">{{
        this.error
      }}</span>
  </div>
</template>

<script>
export default {
  name: "VInput",
  props: {
    value: [String, Number],
    label: {
      type: [String, Number],
      required: true
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
    return {};
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
