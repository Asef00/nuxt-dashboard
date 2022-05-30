<template>
  <div class="c-form__control">
    <label class="c-form__label">{{ label }}</label>
    <client-only>
      <vue-tags-input
        v-model="internalValue"
        :placeholder="placeholder"
        :tags="internalList"
        @tags-changed="(newTags) => (this.internalList = newTags)"
        :class="[hasError() ? 'is-invalid' : '']"
      >
        <template slot="ti-input">
        </template>
      </vue-tags-input>
    </client-only>
    <span v-if="hasError()" class="c-form__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "VTagInput",
  props: {
    value: [String, Number],
    data: [String, Number, Array, Object],
    label: {
      type: [String, Number],
      required: true,
    },
    error: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Please add",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      internalValue: '',
      internalList: [],
      isWatching: true,
    };
  },
  created() {
  },
  watch: {
    internalValue(v) {
      this.$emit("input", v);
      this.$emit("validation");
    },
    internalList(v) {
      let arr = [];
      for (let value of v) {
        arr.push(value.text);
      }
      this.$emit("list", arr);
      this.$emit("validation");
    },
    data(v) {
      if (this.isWatching) {
        let arr = [];
        for (let value of v) {
          arr.push({
            text: value
          });
        }
        this.isWatching = false;
        this.internalList = arr
      }
    }
  },
  methods: {
    hasError() {
      return this.error !== "";
    },
  },
};
</script>

<style scoped>
</style>
