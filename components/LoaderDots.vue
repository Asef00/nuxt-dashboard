<template>
  <span class="c-loader">
    <svg
      viewBox="0 0 120 30"
      xmlns="http://www.w3.org/2000/svg"
      :fill="color"
      :width="width"
      :height="height"
    >
      <circle cx="15" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="60" cy="15" r="9" fill-opacity="0.3">
        <animate
          attributeName="r"
          from="9"
          to="9"
          begin="0s"
          dur="0.8s"
          values="9;15;9"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="0.5"
          to="0.5"
          begin="0s"
          dur="0.8s"
          values=".5;1;.5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="105" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </span>
</template>

<script>
export default {
  name: "dots",
  props: {
    color: {
      type: String,
      default: "#fff",
    },
    height: {
      type: Number,
      default: 35,
    },
    width: {
      type: Number,
      default: 50,
    },
  },
};
</script>

<style lang="scss">
.c-loader {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  height: 100%;
  @include flex-center;
}
</style>
