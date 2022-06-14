<template>
  <transition>
    <div v-if="showAlert" class="c-alert" role="alert">
      <slot />
      <button class="c-alert__close" @click="showAlert = false"></button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showAlert: true,
    };
  },
};
</script>