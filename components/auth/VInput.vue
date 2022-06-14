<template>
  <div>
    <div
      :class="[
        $parent.hasError(keyValidation) ? 'invalid-input' : '',
        'form-field',
        'd-flex ',
        'align-items-center',
      ]"
    >
      <span class="icon"><fa :icon="icon" /></span>
      <input
        @keyup="$parent.validate(keyValidation)"
        @blur="$parent.validate(keyValidation)"
        @keydown="$parent.validate(keyValidation)"
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        :type="type"
        :name="keyValidation"
        :placeholder="label"
      />
    </div>
    <div class="invalid-message" v-if="$parent.hasError(keyValidation)">
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

<style scoped lang="scss">
@import "assets/scss/auth.scss";
</style>
