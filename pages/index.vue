<template>
  <card-component title="Dashboard">
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste incidunt
      quae delectus necessitatibus? Dolorem similique dolore laborum sint a
      accusantium molestiae eius deleniti. Laborum totam nam incidunt placeat
      voluptatem molestias?
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste incidunt
      quae delectus necessitatibus? Dolorem similique dolore laborum sint a
      accusantium molestiae eius deleniti. Laborum totam nam incidunt placeat
      voluptatem molestias?
    </p>
  </card-component>
</template>

<script>
import CardComponent from "../components/CardComponent.vue";

export default {
  layout: "default",
  CardComponent,
  created() {
    this.setTitle('Dashboard')
    this.setBreadcrumb([
      {
        to: "dashboard",
        name: "Dashboard"
      },
    ])
  }
};
</script>

<style lang="scss">
</style>
