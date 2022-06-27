<template>
  <transition name="c-modal" mode="out-in">
    <div class="c-modal__mask" v-if="showModal">
      <div class="c-modal__wrapper">
        <div class="c-modal__container">
          <div class="c-modal__header">
            <h4 class="c-modal__title">{{ title }}</h4>
            <VIcon class="c-modal__close" icon="x" @action="$emit('close')" />
          </div>

          <div class="c-modal__body">
            <slot> Modal body </slot>
          </div>

          <div class="c-modal__footer" v-if="this.$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: String,
    showModal: Boolean,
  },

  watch: {
    showModal(value) {
      if (value) {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = "fixed";
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/modal";
</style>
