<template>
  <div class="c-login__form-control">
    <div class="c-login__input">
      <span class="c-login__input-icon">
        <fa :icon="icon" />
      </span>
      <input
        @keyup="$emit('validation')"
        @blur="$emit('validation')"
        @keydown="$emit('validation')"
        @input="$emit('input', $event.target.value)"
        :class="[{ 'is-invalid': hasError() }]"
        :value="value"
        :type="type"
        :name="keyValidation"
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
    type: {
      type: String,
      default: "text",
    },
    keyValidation: String,
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
