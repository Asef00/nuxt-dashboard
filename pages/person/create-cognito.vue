<template>
  <div>
    <VCard title="Search User Form Cognito">
      <template #header>
        <VBtn to="/person/create" class="m-0 c-btn--small"> Create</VBtn>
        <VBtn to="/person" class="m-0 c-btn--small"> List</VBtn>
      </template>
      <form @submit.prevent="search" class="c-form">
        <div class="row">
          <div class="col-md-12">
            <VInput
              label="Email (username)"
              v-model="payload.username"
              @validation="validate('username')"
              :error="errorMessage('username')"
              placeholder="Please enter email"
            />
            <VBtn @action="resetError" :loader="loaderRequest">SEARCH</VBtn>
          </div>
        </div>
      </form>
    </VCard>
    <VCard :loader="loaderRequest" title="Result" v-if="!this.table.items.length <= 0">
      <VTable @actionAdd="addUser($event)" @actionDetails="detailsItem($event)" :table="table"/>
      <VBtn v-if="paginationToken" class="c-btn--block mt-5" @action="search" type="button" btn="outline">Load more
        users
      </VBtn>
    </VCard>
    <VModal :showModal="showDetails" @close="showDetails =false" title="User details">
      <Details :data="detailsData"/>
    </VModal>
  </div>
</template>

<script>
import * as Yup from "yup";
import Details from "@/components/page/person/DetailsUserCognito";

export default {
  name: "create",
  permission: "person.cognito.store",
  components: {Details},
  data() {
    return {
      paginationToken: null,
      showDetails: false,
      detailsData: {},
      table: {
        columns: [
          {key: "name", label: "Name",},
          {key: "family_name", label: "Family Name",},
          {key: "email", label: "Email"},
          {key: "action", label: '<img src="/img/gear.svg" alt="" />', class: "u-table--center",},
        ],
        items: [],
        map: {
          action(item) {
            return `<span v-on:click="action('${item.email}','Add')" class="c-badge--hover c-badge u-bg-info">Add</span> |
            <span v-on:click="action('${item.id}','Details')" class="c-badge--hover c-badge u-bg-primary">Details</span>`;
          },
          //REQUIRED
          rowClass() {
          },
        },
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
          if (this.paginationToken == null) {
            this.table.items = []
          }
          let payload = {
            key: 'email',
            value: this.payload.username,
            paginationToken: this.paginationToken,
          };
          await this.$store.dispatch("person/searchInCognito", payload);
          this.stopLoading();
          const err = this.handleError(this.$store.state.person.error);
          if (!err) {
            this.table.items = this.table.items.concat(this.$store.state.person.cognitoUsers.data);
            this.paginationToken = this.$store.state.person.cognitoUsers.pagination_token;
            if (this.table.items.length <= 0) {
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
      this.startLoading()
      this.$store.commit('person/RESET_ERROR')
      await this.$store.dispatch("person/createPersonFromCognito", {username: email});
      this.stopLoading();
      const err = this.handleError(this.$store.state.person.error);
      if (!err) {
        let data = this.$store.state.person.item;
        this.$toast.success("Person successfully created.");
        this.$router.push("/person/" + data.id);
      } else {
        this.scrollToElement(document.getElementsByTagName('form')[0]);
      }
    },
    detailsItem(id) {
      this.detailsData = this.table.items.find((item) => item.id === id)
      this.showDetails = true
    },
    validation() {
      let roles = {
        username: Yup.string().required(),
      };
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit('person/RESET_ERROR')
      this.table.items = []
      this.paginationToken = null
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
