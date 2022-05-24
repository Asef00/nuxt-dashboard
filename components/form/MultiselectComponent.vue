<template>
  <div class="c-form__control">
    <label class="c-form__label">Single select</label>

    <multiselect v-model="value" :options="options" placeholder="Select Option">
    </multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  data() {
    return {
      value: null,
      options: ["list", "of", "options"],
    };
  },
};
</script>