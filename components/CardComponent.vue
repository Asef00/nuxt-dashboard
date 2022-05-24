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
        <MultiselectComponent />
        <TextInputComponent />
      </form>
    </div>
  </div>
</template>

<script>
import MultiselectComponent from "./form/MultiselectComponent.vue";
import TextInputComponent from './form/TextInputComponent.vue';

export default {
  components: { MultiselectComponent, TextInputComponent },
  name: "FooterPartial",
};

</script>

<style scoped lang="scss">
@import "~/assets/scss/components/_card.scss";
</style>

<style lang="scss">
.c-form__title {
  font-size: 14px;
  color: $primary-color;
  font-weight: 600;
}

.c-form__control {
  margin-bottom: 1em;
}

.c-form__label {
  @include font-size(14px);
  font-weight: 500;
  color: $text-color;
  margin-bottom: 0.5em;
  display: block;
}

.c-form__input {
    height: 40px;
    border: solid 1px #e1e0ea;
    border-radius: 3px;
    padding: 0 1em;
    @include font-size(14px);
    color: $text-color;
}
</style>