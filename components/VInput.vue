<template>
  <div class="c-form__control">
    <label v-if="label || this.$slots.label" class="c-form__label">
      <slot name="label">{{ label }}</slot>
    </label>
    <div class="d-flex align-items-center">
      <datepicker
        v-if="type == 'date'"
        @selected="$emit('changeDate')"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        input-class="c-form__input"
      ></datepicker>
      <input  v-else
        @keyup="$emit('validation')"
        @blur="$emit('validation')"
        @keydown="$emit('validation')"
        @input="$emit('input', $event.target.value)"
        :value="value"
        :type="isPassword ? computedType : type"
        :placeholder="placeholder"
        :class="{
          'is-invalid': hasError(),
          'c-form__password': isPassword,
        }"
        :disabled="disabled"
        class="c-form__input"
      />
      <span
        v-if="type == 'password'"
        @click="togglePassword()"
        class="c-form__visiblity"
      >
        <fa :icon="showPassword ? 'eye' : 'eye-slash'" />
      </span>
    </div>
    <span v-if="hasError()" class="c-form__error">{{ error }}</span>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  name: "VInput",

  components: {
    Datepicker,
  },

  props: {
    value: [String, Number, Boolean, Date],
    label: {
      type: [String, Number],
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
    },
    error: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showPassword: false,
      isPassword: this.type == "password",
    };
  },

  computed: {
    computedType() {
      return this.showPassword ? "text" : "password";
    },
  },

  methods: {
    hasError() {
      return this.error !== "";
    },

    //toggle visibility
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
