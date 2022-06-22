<template>
  <VCard title="Create new Person">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/person">List</NuxtLink>
      </VBtn>
      <VBtn v-if="can('person.cognito.store')" type="button" class="m-0 c-btn--small">
        <NuxtLink to="/person/create-cognito">Add form Cognito</NuxtLink>
      </VBtn>
    </template>
    <form @submit.prevent="create" class="c-form">
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
          <VInput
            @validation="validate('username')"
            :error="errorMessage('username')"
            label="Email (username)"
            v-model="payload.username"
            placeholder="Please enter email"
          />
          <VSwitch
            label="Email Verified"
            v-model="payload.email_verified"
            :checked="payload.email_verified"
          />
          <VSwitch
            label="Set Password"
            v-model="setPassword"
            :checked="setPassword"
          />
        </div>
        <div class="col-md-6">
          <transition>
            <VInput
              v-if="setPassword"
              @validation="validate('password')"
              :error="errorMessage('password')"
              label="Password"
              v-model="payload.password"
              placeholder="Please enter password"
            />
          </transition>
        </div>
      </div>
      <VBtn :loader="loaderRequest">SAVE</VBtn>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "create",
  permission: "person.store",
  data() {
    return {
      setPassword: false,
      payload: {
        name: '',
        family_name: '',
        username: '',
        email_verified: false,
        password: '',
      }
    };
  },
  methods: {
    create() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          let payload = {
            name: this.payload.name,
            family_name: this.payload.family_name,
            username: this.payload.username,
            email_verified: this.payload.email_verified,
          };
          if (this.setPassword) {
            payload.password = this.payload.password;
          }
          await this.$store.dispatch("person/create", payload);
          this.stopLoading();
          const err = this.handleError(this.$store.state.person.error);
          if (!err) {
            let data = this.$store.state.person.item;
            this.$toast.success("Person successfully created.");
            this.$router.push("/person/" + data.id);
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    validation() {
      let roles = {
        name: Yup.string().required(),
        family_name: Yup.string().required(),
        username: Yup.string().email().required(),
        email_verified: Yup.bool().nullable(),
      };
      if (this.setPassword) {
        roles = {...roles, password: Yup.string().nullable().required()}
      }
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit('person/RESET_ERROR')
      this.errors = {
        name: '',
        family_name: '',
        username: '',
        email_verified: '',
        password: '',
      };
    },
  },
  created() {
    this.resetError()
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
