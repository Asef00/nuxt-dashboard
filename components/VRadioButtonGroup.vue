<template>
  <div class="c-radio-group">
    <template v-for="option in options">
      <VRadioButton :key="option.index" :radio="option" :name="name" v-model="value">
        {{ option.label }}
      </VRadioButton>
    </template>
  </div>
</template>

<script>
export default {
  name: "RadioButtonGroup",

  props: {
    value: String,
    options: {
      type: Array,
      required: true,
      default: [],
    },

    name: {
      required: true,
      type: String,
    },
  },
};
</script>

