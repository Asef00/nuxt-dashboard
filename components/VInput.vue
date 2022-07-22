<template>
  <div class="c-form__control">
    <!-- input label -->
    <label v-if="label || this.$slots.label" class="c-form__label">
      <slot name="label">{{ label }}</slot>
    </label>

    <div class="d-flex align-items-center">
      <!-- if date type -->
      <datepicker
        v-if="type == 'date'"
        @selected="selectedDate($event)"
        :placeholder="placeholder"
        :value="value"
        :inline="inline"
        :disabled="disabled"
        :format="datePickerFormat"
        :input-class="['c-form__input', { 'is-invalid': hasError() }]"
        wrapper-class="c-datepicker"
        calendar-class="c-datepicker__calendar"
        typeable
      ></datepicker>

      <!-- else -->
      <input
        v-else
        @keyup="$emit('validation')"
        @keyup.enter="$emit('enter')"
        @blur="$emit('validation')"
        @keydown="$emit('validation')"
        @input="$emit('input', $event.target.value)"
        :value="value"
        :type="isPassword ? computedType : type"
        :placeholder="placeholder"
        :class="[
          inputClass,
          {
            'is-invalid': hasError(),
            'c-form__password': isPassword,
          },
        ]"
        :disabled="disabled"
      />

      <!-- if password type -->
      <span
        v-if="type == 'password'"
        @click="togglePassword()"
        class="c-form__visiblity"
      >
        <fa :icon="showPassword ? 'eye' : 'eye-slash'" />
      </span>

      <slot name="btn"></slot>
    </div>
    <span v-if="hasError()" class="c-form__error">{{ error }}</span>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker3";

export default {
  name: "VInput",

  components: {
    Datepicker,
  },

  props: {
    value: {
      type: [String, Number, Boolean, Date],
      default: "",
    },
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
    datePickerFormat: {
      type: String,
      default: "MM/dd/yyyy",
    },
    inline: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: "c-form__input",
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
    selectedDate(v) {
      this.$emit("input", v);
      this.$emit("changeDate");
      this.$emit("validation");
    },

    //toggle visibility
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
