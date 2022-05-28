<template>
  <div class="c-form__control">
    <label class="c-form__label">{{ label }}</label>
    <multiselect
      class="c-form__select"
      v-model="internalValue"
      :options="list"
      :multiple="multiple"
      :select-label="'Selected'"
      :deselect-label="'Hit to remove'"
      :placeholder="placeholder"
      :disabled="disabled"
      :track-by="trackBy"
      :class="[hasError() ? 'is-invalid': '']"
    >
    </multiselect>
    <span v-if="hasError()" class="c-form__error">{{ error }}</span>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "VSelect",
  components: {Multiselect},
  props: {
    value: [String, Number, Array, Object],
    label: {
      type: [String, Number],
      required: true
    },
    list: {
      type: [Object, Array],
      required: false
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
    },
    multiple: {
      type: Boolean,
      default: false
    },
    trackBy: {
      type: String
    }
  },
  data() {
    return {
      internalValue: this.value,
    }
  },
  watch: {
    internalValue(v) {
      this.$emit('input', v);
      this.$emit('validation')
    }
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
