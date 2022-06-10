<template>
  <VCard title="Search User Form Cognito">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/person/create">Create</NuxtLink>
      </VBtn>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/person">List</NuxtLink>
      </VBtn>
    </template>
    <form @submit.prevent="search" class="c-form">
      <VAlert class="c-alert--danger mt-1 mb-2" v-show="hasError('username')">{{ errorMessage('username') }}</VAlert>
      <div class="row">
        <div class="col-md-12">
          <VInput
            label="Email (username)"
            v-model="payload.username"
            placeholder="Please enter email"
          />
          <VBtn :loader="loaderRequest">SEARCH</VBtn>
        </div>
      </div>
      <div v-for="(user,index) in data.users" class="row">
        <div class="col-md-3">
          <div class="c-form__control">
            <input
              :class="['c-form__input']"
              disabled
              :value="user.name"
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="c-form__control">
            <input
              :class="['c-form__input']"
              disabled
              :value="user.family_name"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="c-form__control">
            <input
              :class="['c-form__input']"
              disabled
              :value="user.email"
            />
          </div>
        </div>
        <VBtn type="button" @action="addUser(user.email)" :loader="loaderRequest">ADD</VBtn>
      </div>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "create",
  data() {
    return {
      data: {
        users: []
      },
      payload: {
        username: '',
      }
    };
  },
  methods: {
    search() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          let payload = {
            key: 'email',
            value: this.payload.username,
          };
          await this.$store.dispatch("person/searchInCognito", payload);
          this.stopLoading();
          const err = this.handleError(this.$store.state.person.error);
          if (!err) {
            this.data.users = this.$store.state.person.cognitoUsers;
            if (this.data.users.length <= 0) {
              this.$toast.warning('No results found!');
            }
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async addUser(email) {
      await this.$store.dispatch("person/createPersonFromCognito", {username: email});
      this.stopLoading();
      const err = this.handleError(this.$store.state.person.error);
      if (!err) {
        let data = this.$store.state.person.item;
        this.$toast.success("Person successfully created.");
        this.$router.push("/person/" + data.id);
      }
    },
    validation() {
      let roles = {
        username: Yup.string().required(),
      };
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit('person/RESET_ERROR')
      this.errors = {
        username: '',
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
        to: '/person/create-cognito',
        name: 'Create Cognito'
      }
    ])
  }
}
</script>

<style scoped>

</style>
