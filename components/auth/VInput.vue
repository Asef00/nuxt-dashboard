<template>
  <div>
    <div :class="['c-login__input', { 'is-invalid': hasError() }]">
      <span class="c-login__input-icon">
        <fa :icon="icon" />
      </span>
      <input
        @keyup="$emit('validation')"
        @blur="$emit('validation')"
        @keydown="$emit('validation')"
        @input="$emit('input', $event.target.value)"
        :value="value"
        :type="type"
        :name="name"
        :placeholder="label"
      />
    </div>
    <div v-if="hasError()" class="c-form__error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "VInput",

  props: {
    value: [String, Number],
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: [Object, Array],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: "",
    },
  },

  methods: {
    hasError() {
      return this.error !== "";
    },
  },
};
</script>
