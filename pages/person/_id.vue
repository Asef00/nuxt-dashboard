<template>
  <VCard title="Person Details">
    <template #header>
      <VBtn class="m-0 c-btn--small">
        <NuxtLink to="/person">List</NuxtLink>
      </VBtn>
    </template>
    <div class="row">
      <h4 class="c-form__title">Person</h4>
    </div>
  </VCard>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      data: {
        person: []
      }
    };
  }
  ,
  methods: {
    async show() {
      this.startLoading()
      await this.$store.dispatch("person/show", {id:this.$route.params.id,product:true});
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.data.person = this.$store.state.person.item;
      }
      this.stopLoading()
    },
    resetError() {
      this.$store.commit("person/RESET_ERROR");
    },
  },
  created() {
    this.resetError();
    this.setTitle('Person')
    this.show();
    this.setBreadcrumb([
      {
        to: '/person',
        name: 'Person'
      },
      {
        to: `/person/${this.$route.params.id}`,
        name: 'Details'
      }
    ])
  }
}
</script>

<style scoped>

</style>
