<template>
  <div class="c-form__control">
    <label class="c-form__label">{{ label }}</label>
    <multiselect
      class="c-form__select"
      v-model="internalValue"
      :options="taggable ? [] : list"
      :multiple="(taggable ? true : multiple)"
      select-label="Selected"
      deselect-label="Hit to remove"
      :placeholder="placeholder"
      :disabled="disabled"
      :track-by="trackBy"
      :label="trackLabel"
      :taggable="taggable"
      :searchable="(taggable ? true : searchable)"
      :closeOnSelect="(taggable ? false : closeOnSelect)"
      @tag="addTag"
      :class="[hasError() ? 'is-invalid' : '']"
    >
      <template slot="caret">
        <div class="multiselect__select c-chevron c-chevron--bottom"></div>
      </template>
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
    value: {
      type: [Array, Object, String, Number]
    },
    label: {
      type: [String, Number],
      required: true,
    },
    list: {
      type: [Object, Array],
      required: false,
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
    multiple: {
      type: Boolean,
      default: false,
    },
    trackBy: {
      type: String,
    },
    trackLabel: {
      type: String,
    },
    searchable: {
      type: Boolean,
      default: true
    },
    taggable: {
      type: Boolean,
      default: false
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },

  },
  data() {
    return {
      internalValue: this.value,
      firstLoad: false,
    };
  },
  watch: {
    internalValue: {
      handler(v) {
        this.$emit("input", v);
        this.$emit("validation");
      },
      deep: true
    },
    list(v) {
      if (this.taggable) {
        if (!this.firstLoad) {
          for (let i of v) {
            this.addTag(i)
          }
          this.firstLoad = true
        }
      }
    }
  },
  methods: {
    hasError() {
      return this.error !== "";
    },
    addTag(newTag) {
      this.internalValue.push(newTag)
      this.internalValue = [...new Set(this.internalValue)];
    }
  },
};
</script>

<style scoped>
</style>
