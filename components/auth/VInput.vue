<template>
  <div class="c-login__form-control">
    <div class="c-login__input">
      <span class="c-login__input-icon">
        <fa :icon="icon" />
      </span>
      <input
        @keyup="$parent.validate(keyValidation)"
        @blur="$parent.validate(keyValidation)"
        @keydown="$parent.validate(keyValidation)"
        @input="$emit('input', $event.target.value)"
        :class="[
          { 'is-invalid': $parent.hasError(keyValidation) },
        ]"
        :value="value"
        :type="type"
        :name="keyValidation"
        :placeholder="label"
      />
    </div>
    <div class="c-form__error" v-if="$parent.hasError(keyValidation)">
      {{ $parent.errorMessage(keyValidation) }}
    </div>
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
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
