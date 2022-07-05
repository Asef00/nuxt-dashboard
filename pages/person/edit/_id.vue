<template>
  <VCard title="Edit Details">
    <template #header>
      <VBtn type="button"
        @action="showChangePasswordModal = true"
        class="m-0 c-btn--small">
        Change Password
      </VBtn>
      <VBtn :to="`/person/${id}`" class="m-0 c-btn--small"> View Details </VBtn>
      <VBtn :to="`/person-product/create/${id}`" class="m-0 c-btn--small">
        Assign Product
      </VBtn>
      <VBtn to="/person" class="m-0 c-btn--small"> List Persons </VBtn>
    </template>
    <form @submit.prevent="update" class="c-form">
      <div class="row">
        <div class="col-md-6">
          <VInput
            @validation="validate('first_name')"
            :error="errorMessage('first_name')"
            label="First Name"
            v-model="payload.first_name"
            placeholder="Please enter first name"
          />
        </div>
        <div class="col-md-6">
          <VInput
            @validation="validate('last_name')"
            :error="errorMessage('last_name')"
            label="Last Name"
            v-model="payload.last_name"
            placeholder="Please enter last name"
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
            label="Role"
          />
        </div>
        <div class="col-md-6">
          <VSelect
            v-model="payload.group"
            @validation="validate('group')"
            :error="errorMessage('group')"
            :list="list.group"
            :multiple="true"
            placeholder="Please select group"
            track-label="label"
            track-by="id"
            :closeOnSelect="false"
            label="Group"
          />
        </div>
       <div class="container-fluid">
         <div class="row mt-2">
           <div class="col-auto">
             <VSwitch
               label="Email Verified"
               v-model="payload.email_verified"
               :checked="payload.email_verified"
               inline
             />
           </div>
           <div class="col-auto">
             <VSwitch
               label="Enabled"
               v-model="payload.enable"
               :checked="payload.enable"
               inline
             />
           </div>
         </div>
       </div>
      </div>
      <template v-if="list.fields.length">
        <h4 class="c-form__title">More Info</h4>
        <div class="row">
          <template v-for="(field, index) in list.fields">
            <div
              :key="index"
              class="col-md-6"
              v-if="field.field_type.type == 'varchar'"
            >
              <VInput
                @validation="validate(field.name)"
                :error="errorMessage(field.name)"
                :label="field.label"
                v-model="payload[field.name]"
                :placeholder="
                        field.placeholder == null
                          ? `Enter your ${field.label.toLowerCase()}`
                          : field.placeholder
                      "
              />
            </div>
            <div
              :key="index"
              class="col-md-6"
              v-if="field.field_type.type == 'date_time'"
            >
              <VInput
                type="date"
                @validation="validate(field.name)"
                :error="errorMessage(field.name)"
                :label="field.label"
                v-model="payload[field.name]"
                :placeholder="
                        field.placeholder == null
                          ? `Enter your ${field.label.toLowerCase()}`
                          : field.placeholder
                      "
              />
            </div>
            <div
              :key="index"
              class="col-md-6"
              v-if="field.field_type.type == 'select'"
            >
              <VSelect
                v-model="payload[field.name]"
                @validation="validate(field.name)"
                :error="errorMessage(field.name)"
                :list="field.data_set"
                :placeholder="
                        field.placeholder == null
                          ? `Select your ${field.label.toLowerCase()}`
                          : field.placeholder
                      "
                :label="field.label"
              />
            </div>
          </template>
        </div>
      </template>
      <div class="mt-5">
        <VBtn :loader="loaderRequest">SAVE</VBtn>
        <VBtn btn="danger" to="/person" :loader="loaderRequest">CANCEL</VBtn>
      </div>
    </form>
    <ChangePassword
      @show="changePasswordModal($event)"
      :show="showChangePasswordModal"
      :id="id"
    />
  </VCard>
</template>

<script>
import * as Yup from "yup";
import ChangePassword from "@/components/page/person/ChangePassword";

export default {
  name: "edit",
  permission: "person.update",
  components: {
    ChangePassword,
  },
  data() {
    return {
      showChangePasswordModal: false,
      id: this.$route.params.id,
      list: {
        role: [],
        group: [],
        fields: [],
      },
      payload: {
        first_name: "",
        last_name: "",
        email_verified: false,
        enable: false,
        role: null,
        group: null,
      },
    };
  },
  methods: {
    changePasswordModal(show) {
      this.showChangePasswordModal = show;
    },
    update() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          let fields = [];
          for (let field of this.list.fields) {
            fields.push({
              field_name_id: field.id,
              access: field.value == null ? field.default_access : field.value.access,
              value: this.payload[field.name] instanceof Date ? this.payload[field.name].toLocaleDateString() : this.payload[field.name]
            })
          }
          let payload = {
            name: this.payload.first_name,
            family_name: this.payload.last_name,
            email_verified:this.payload.email_verified,
            enabled:this.payload.enable,
            role_ids: this.payload.role.map((i) => i.id),
            group_ids: this.payload.group.map((i) => i.id),
            fields: fields,
          };
          await this.$store.dispatch("person/update", {id: this.id, payload});
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
      this.startLoading();
      await this.$store.dispatch("person/show", {id: this.id});
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        let data = this.$store.state.person.item;
        this.payload.first_name = data.name;
        this.payload.last_name = data.family_name;
        this.payload.enable = data.enabled;
        this.payload.email_verified = data.cognito.email_verified;
        this.payload.role = data.roles;
        this.payload.group = data.groups;
        this.list.fields = data.fields;
        for (let field of this.list.fields) {
          this.errors[field.name] = "";
          this.payload[field.name] = field.value != null ? field.value.value : field.value;
        }
      }
      this.stopLoading();
    },
    async getRole() {
      await this.$store.dispatch("role/listLabel");
      let err = this.handleError(this.$store.state.role.error);
      if (!err) {
        this.list.role = this.$store.state.role.list;
      }
    },
    async getGroup() {
      await this.$store.dispatch("group/list");
      let err = this.handleError(this.$store.state.group.error);
      if (!err) {
        this.list.group = this.$store.state.group.list;
      }
    },
    validation() {
      let roles = {
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        role: Yup.array().nullable().min(1),
        group: Yup.array().nullable(),
        email_verified: Yup.boolean().nullable(),
        enable: Yup.boolean().nullable(),
      };
      for (let field of this.list.fields) {
        roles[field.name] = field.required
          ? Yup.string().nullable().required()
          : Yup.string().nullable();
      }
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit("person/RESET_ERROR");
      this.$store.commit("role/RESET_ERROR");
      this.$store.commit("group/RESET_ERROR");
      this.errors = {
        first_name: "",
        last_name: "",
        email_verified: "",
        enable: "",
        role: "",
        group: "",
      };
    },
  },
  async created() {
    this.resetError();
    this.setTitle("Manage Persons");
    this.setBreadcrumb([
      {
        to: "/person",
        name: "Person",
      },
      {
        to: "/person/edit/" + this.id,
        name: "Edit",
      },
    ]);
    await this.show();
    this.getRole();
    this.getGroup();
  },
};
</script>

<style scoped>
</style>
