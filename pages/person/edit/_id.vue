<template>
  <VCard title="Edit a Person">
    <form @submit.prevent="update" class="c-form">
      <div class="row">
        <div class="col-md-6">
          <VInput
            @validation="validate('name')"
            :error="errorMessage('name')"
            label="Name"
            v-model="payload.name"
            placeholder="Please enter name"
          />
        </div>
        <div class="col-md-6">
          <VInput
            @validation="validate('family_name')"
            :error="errorMessage('family_name')"
            label="Family Name"
            v-model="payload.family_name"
            placeholder="Please enter family name"
          />
        </div>
        <div class="col-md-6">
          <VSelect
            v-model="payload.role"
            @validation="validate('role')"
            :error="errorMessage('role')"
            :list="list.role"
            :multiple="true"
            placeholder="Please select role"
            track-label="label"
            track-by="id"
            :closeOnSelect="false"
            label="Role"/>
        </div>
      </div>
      <VBtn :loader="loaderRequest">SAVE</VBtn>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "edit",
  data() {
    return {
      list: {
        role: []
      },
      payload: {
        name: '',
        family_name: '',
        role: null,
      }
    };
  },
  methods: {
    update() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          let payload = {
            name: this.payload.name,
            family_name: this.payload.family_name,
            role_ids: this.payload.role.map(i => i.id),
          };
          await this.$store.dispatch("person/update", {id: this.$route.params.id, payload});
          this.stopLoading();
          const err = this.handleError(this.$store.state.person.error);
          if (!err) {
            let data = this.$store.state.person.item;
            this.$toast.success("Person successfully updated.");
            this.$router.push("/person/" + data.id);
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async show() {
      this.startLoading()
      await this.$store.dispatch("person/show", {id:this.$route.params.id});
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        let data = this.$store.state.person.item;
        this.payload.name = data.name;
        this.payload.family_name = data.family_name;
        this.payload.role = data.roles;
      }
      this.stopLoading()
    },
    async getRole() {
      await this.$store.dispatch('role/list')
      let err = this.handleError(this.$store.state.role.error)
      if (!err) {
        this.list.role = this.$store.state.role.list
      }
    },
    validation() {
      let roles = {
        name: Yup.string().required(),
        family_name: Yup.string().required(),
        role: Yup.array().nullable().min(1),
      };
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit('person/RESET_ERROR')
      this.$store.commit('role/RESET_ERROR')
      this.errors = {
        name: '',
        family_name: '',
        role: '',
      };
    },

  },
  created() {
    this.resetError()
    this.getRole()
    this.show()
    this.setTitle('Person')
    this.setBreadcrumb([
      {
        to: '/person',
        name: 'Person'
      },
      {
        to: '/person/create',
        name: 'Create'
      }
    ])
  }
}
</script>

<style scoped>

</style>
