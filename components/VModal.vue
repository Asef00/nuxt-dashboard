<template>
  <transition name="c-modal" mode="out-in">
    <div class="c-modal__mask" v-if="showModal">
      <div class="c-modal__wrapper">
        <div class="c-modal__container">
          <div class="c-modal__header">
            <h4 class="c-modal__title">{{ title }}</h4>
            <img
              class="c-modal__close"
              src="/x.svg"
              @click="$emit('close')"
              alt=""
            />
          </div>

          <div class="c-modal__body">
            <slot name="body"> Modal body </slot>
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
    showModal() {
      document.body.classList.toggle("is-modal-open");
    },
  },
};
</script>