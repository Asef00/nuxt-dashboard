<template>
  <div>
    <div class="c-form__control">
      <label class="c-form__label">{{ label }}</label>
      <input @keyup="parent.validate(keyValidation)" @blur="parent.validate(keyValidation)"
             @keydown="parent.validate(keyValidation)"
             v-bind="$attrs"
             v-bind:value="value"
             v-on:input="$emit('input', $event.target.value)"
             :type="type"
             :name="keyValidation"
             :placeholder="placeholder"
             :class="[parent.hasError(keyValidation) ? 'is-invalid': '','c-form__input']"
      />
      <span v-if="parent.hasError(keyValidation)" class="c-form__error">{{
          parent.errorMessage(keyValidation)
        }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DInput",
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
    keyValidation: String,
  },
  data() {
    return {
      parent: ''
    };
  },
  created() {
    this.parent = this.$parent.$parent;
  }
}
</script>

<style scoped>

</style>
