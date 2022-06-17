<template>
  <div class="c-bar">
    <span class="c-bar__title">{{ title }}</span>
    <div class="c-bar__shell">
      <div
        :class="['c-bar__progress', barClass]"
        :style="{ width: value + '%' }"
      ></div>
    </div>
    <div class="c-bar__info">
      <span>{{ subtitle }}</span>
      <span>{{ value + '%' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    bar: {
      type: String,
      default: "",
    },
  },

  computed: {
    barClass() {
      return `c-bar__progress--${this.bar}`;
    },
  },
};
</script>

<style lang="scss">
.c-bar {
  @include flex-column;
}

.c-bar__shell {
  position: relative;
  display: block;
  width: 100%;
  height: 5px;
  background-color: #e2e1ea;
  border-radius: 10px;
  overflow: hidden;
}

.c-bar__title {
  @include font-size(14px);
  margin-bottom: .5em;
  color: #182d49;

  &::first-letter {
    text-transform: uppercase;
  }
}

.c-bar__progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $primary-color;

  &--success {
    background-color: $success-color;
  }
  &--info {
    background-color: $info-color;
  }
  &--warn {
    background-color: $warn-color;
  }
  &--danger {
    background-color: $danger-color;
  }
}

.c-bar__info {
  @include flex-between;
  @include font-size(12px);
  color: $placeholder-color;
}
</style>