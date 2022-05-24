<template>
  <div class="c-card">
    <div class="c-card__header">
      <h2 class="c-card__title">Add Client Form</h2>
    </div>
    <div class="c-card__body">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste incidunt
        quae delectus necessitatibus? Dolorem similique dolore laborum sint a
        accusantium molestiae eius deleniti. Laborum totam nam incidunt placeat
        voluptatem molestias?
      </p>
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>
        <div class="c-form__control">
          <label class="c-form__label">Single select</label>
          <multiselect
            v-model="value"
            :options="options"
            placeholder="Select Option"
          >
          </multiselect>
        </div>

        <div class="c-form__control">
          <label class="c-form__label">Sample Label</label>
          <input class="c-form__input" type="text" placeholder="Enter..." />
        </div>

        <button class="c-btn">Save</button>
        <button class="c-btn c-btn--primary">
          <fa icon="plus" />
          Add Client
        </button>
        <button class="c-btn c-btn--outline">
          <fa icon="chevron-left" />
          Prev Step
        </button>
        <button class="c-btn c-btn--block">
          Add Note
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  name: "FooterPartial",
  data() {
    return {
      value: null,
      options: ["list", "of", "options"],
    };
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/components/card";
@import "~/assets/scss/components/form";
</style>