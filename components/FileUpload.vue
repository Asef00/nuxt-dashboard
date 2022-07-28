<template>
  <div class="c-upload">
    <!-- input label -->
    <label class="c-upload__label">
      <slot name="label"></slot>

      <input
        @input="$emit('input', $event.target.value)"
        :placeholder="placeholder"
        :class="[
          'c-upload__input',
          {
            'is-invalid': hasError(),
          },
        ]"
        :disabled="disabled"
        type="file"
      />
    </label>

    <span v-if="hasError()" class="c-form__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
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

  methods: {
    hasError() {
      return this.error !== "";
    },
  },
};
</script>

<style lang="scss">
.c-upload__input {
  display: flex;
  width: 100%;
  @include input-outline;
  cursor: pointer;

  &::file-selector-button {
    transition: 0.2s;
    height: 40px;
    padding: 0 1em;
    margin-right: 1em;
    cursor: pointer;
    border: none;

    &:hover {
      filter: brightness(0.9);
    }
  }
}
</style>