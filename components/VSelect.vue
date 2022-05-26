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
      :class="[parent.hasError(keyValidation) ? 'is-invalid': '']"
    >
    </multiselect>
    <span v-if="parent.hasError(keyValidation)" class="c-form__error">{{
        parent.errorMessage(keyValidation)
      }}</span>
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
    keyValidation: String,
    disabled: {
      type: Boolean,
      default: true
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
      parent: ''
    }
  },
  watch: {
    internalValue(v) {
      this.$emit('input', v);
      this.parent.validate(this.keyValidation)
    }
  },
  created() {
    this.parent = this.$parent;
  }
}
</script>

<style scoped>

</style>
