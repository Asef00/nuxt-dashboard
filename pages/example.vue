<template>
  <div>
    <!-- table sample -->
    <VCard :loader="loaderRequest" title="Sample Table">
      <VTable
        @changePage="changePage($event)"
        @changePerPage="changePerPage($event)"
        @search="tableSearch"
        :table="table"
      />
    </VCard>
    <!-- form control samples -->
    <VCard title="Dashboard">
      <template #header> </template>
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>
        <div class="row">
          <div class="col-md-6">
            <VSelect
              @validation="validate('tag')"
              :error="errorMessage('tag')"
              :multiple="true"
              :list="options"
              placeholder="Please select tag"
              v-model="payload.tag"
              label="Tags"
            />
          </div>
          <div class="col-md-6">
            <VSelect
              @validation="validate('tag')"
              :error="errorMessage('tag')"
              :multiple="true"
              :list="options"
              placeholder="Please select tag"
              v-model="payload.tag"
              label="Tags"
              disabled
            />
          </div>
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
              @validation="validate('name')"
              :error="errorMessage('name')"
              label="Name"
              v-model="payload.name"
              placeholder="Please enter name"
              disabled
            />
          </div>
          <div class="col-md-6">
            <VInput
              @validation="validate('name')"
              :error="errorMessage('name')"
              label="DatePicker"
              type="date"
              v-model="payload.name"
              placeholder="Pick up a day"
              inline
            />
          </div>
          <div class="col-md-6">
            <VTextarea
              @validation="validate('summary')"
              :error="errorMessage('summary')"
              v-model="payload.summary"
              label="Summary"
              placeholder="Please enter summary"
            />
          </div>
          <!-- switch samples -->
          <div class="col-md-1">
            <VSwitch
              :defaultState="true"
              @change="triggerToggleEvent"
              :labelText="'Validate Response'"
            />
          </div>
          <div class="col-md-1">
            <VSwitch
              :defaultState="true"
              @change="triggerToggleEvent"
              :labelText="'Validate Response'"
              type="danger"
            />
          </div>
          <div class="col-md-1">
            <VSwitch
              :defaultState="true"
              @change="triggerToggleEvent"
              :labelText="'Validate Response'"
              type="warn"
            />
          </div>
          <div class="col-md-1">
            <VSwitch
              :defaultState="true"
              @change="triggerToggleEvent"
              :labelText="'Validate Response'"
              type="info"
            />
          </div>
          <div class="col-md-1">
            <VSwitch
              :defaultState="true"
              @change="triggerToggleEvent"
              :labelText="'Validate Response'"
              type="success"
            />
          </div>
          <!-- checkbox samples -->
          <div class="col-md-6">
            <VCheckbox label="Ali" inputValue="Ali" v-model="selectedOptions" />
            <VCheckbox
              label="Reza"
              inputValue="Reza"
              v-model="selectedOptions"
            />
            <VCheckbox
              label="Disabled"
              inputValue="foo"
              v-model="selectedOptions"
              disabled
            />
          </div>
        </div>
        <!-- button samples -->
        <VBtn
          @action="startLoading"
          :loader="loaderRequest"
          btn="simple"
          type="button"
          >SAVE</VBtn
        >
        <VBtn @action="startLoading" type="button" :loader="loaderRequest">
          <fa icon="plus" />
          Add Client
        </VBtn>
        <VBtn @action="stopLoading" btn="outline" type="button">
          <fa icon="chevron-left" />
          Prev Step
        </VBtn>
        <VBtn
          @action="startLoading"
          btn="block"
          type="button"
          :loader="loaderRequest"
        >
          Add Note
        </VBtn>
      </form>
    </VCard>
    <!-- alert samples -->
    <VCard title="Alerts">
      <VAlert class="c-alert--primary">
        A simple primary alert—check it out!
      </VAlert>
      <VAlert class="c-alert--secondary">
        A simple secondary alert—check it out!
      </VAlert>
      <VAlert class="c-alert--success">
        A simple success alert—check it out!
      </VAlert>
      <VAlert class="c-alert--danger">
        A simple danger alert—check it out!
      </VAlert>
      <VAlert class="c-alert--warning">
        A simple warning alert—check it out!
      </VAlert>
      <VAlert class="c-alert--info"> A simple info alert—check it out! </VAlert>
      <VAlert class="c-alert--light">
        A simple light alert—check it out!
      </VAlert>
      <VAlert class="c-alert--dark"> A simple dark alert—check it out! </VAlert>
    </VCard>
    <!-- inline form-control samples -->
    <VCard title="Inline Form Controls">
      <template #header>
        <VBtn size="sm" class="m-0" btn="info">Button</VBtn>
        <VBtn size="sm" class="m-0" btn="danger">Button</VBtn>
      </template>
      <form action="" class="c-form">
        <div class="row mb-3">
          <div class="col">
            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Full Name</label>
              <span class="u-text-secondary">
                Toronto Regional Real Estate Board
              </span>
            </div>

            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Feed Type</label>
              <span class="c-badge u-bg-light u-text-secondary">IDX</span>
            </div>
          </div>

          <div class="col">
            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Abbreviated</label>
              <span class="u-text-secondary">Treb MLS</span>
            </div>

            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Credentials</label>
              <NuxtLink to="/" class="u-text-info">Click to View</NuxtLink>
              <span class="c-badge u-bg-danger">Revoke</span>
            </div>
          </div>
        </div>

        <h4 class="c-form__title mb-2">Details</h4>
        <div class="row mb-3">
          <div class="col">
            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Address</label>
              <span class="u-text-secondary">
                456 Prentiss St, San Francisco, USA
              </span>
            </div>

            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Coverage Area</label>
              <span class="u-text-secondary">4617, 7819, 1012, Florida</span>
            </div>
          </div>

          <div class="col">
            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label"># of Clients</label>
              <span class="u-text-secondary">873</span>
            </div>

            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label"># of Agents</label>
              <span class="u-text-secondary">100</span>
            </div>
          </div>
        </div>

        <span class="c-form__divider"></span>

        <h4 class="c-form__title mb-2">Contact Information For IDX</h4>
        <div class="row mb-3">
          <div class="col">
            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Website</label>
              <span class="u-text-link">sitename.com/mls</span>
            </div>

            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Contact 1</label>
              <span class="u-text-secondary">00 55 369 888 3365</span>
            </div>

            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Contact 2</label>
              <span class="u-text-secondary">00 55 369 888 3366</span>
            </div>
          </div>

          <div class="col">
            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Contact Num</label>
              <span class="u-text-secondary">00 225 558 9966</span>
            </div>

            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Contact Ticket</label>
              <span class="u-text-secondary">RFK-662</span>
            </div>

            <div class="c-form__control c-form__control--inline mb-0">
              <label class="c-form__label">Contact Email</label>
              <span class="u-text-secondary">mls@trebmls.com</span>
            </div>
          </div>
        </div>

        <span class="c-badge u-bg-danger">danger</span>
        <span class="c-badge u-bg-warn">warn</span>
        <span class="c-badge u-bg-info">info</span>
        <span class="c-badge u-bg-success">success</span>
        <span class="c-badge">badge</span>
        <span class="c-badge u-bg-dark">success</span>
      </form>
    </VCard>
    <!-- modal samples -->
    <VCard title="Card Long Title Sample">
      <template #header>
        <VBtn size="sm" class="m-0" btn="success">Success</VBtn>
      </template>
      <p class="mb-3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
        eligendi quis, assumenda corporis ut error molestiae totam hic facilis
        et, nostrum culpa expedita maiores cumque amet modi delectus earum enim!
      </p>
      <VBtn @action="showModal = true">Show Modal</VBtn>
      <VBtn @action="showFormModal = true" btn="info">Show Form Modal</VBtn>
    </VCard>
    <!-- tab samples -->
    <VCard>
      <VTabs
        qKey="tabs1"
        @tab1="calendarMethod()"
        @tab2="historyMethod()"
        @tab3="paymentrMethod()"
      >
        <VTab title="calendar" tabKey="tab1">
          1. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Laudantium nostrum quis iusto perspiciatis magnam repudiandae, labore
          nobis? Voluptatum quis officia voluptas tempore, pariatur perspiciatis
          quia assumenda iste aliquam quo a?
        </VTab>
        <VTab title="history" tabKey="tab2">
          2. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Laudantium nostrum quis iusto perspiciatis magnam repudiandae, labore
          nobis? Voluptatum quis officia voluptas tempore, pariatur perspiciatis
          quia assumenda iste aliquam quo a?
        </VTab>
        <VTab title="payment" tabKey="tab3" :noteCount="2" noteType="active">
          3. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Laudantium nostrum quis iusto perspiciatis magnam repudiandae, labore
          nobis? Voluptatum quis officia voluptas tempore, pariatur perspiciatis
          quia assumenda iste aliquam quo a?
        </VTab>
        <VTab title="test" tabKey="test">
          <VTest />
        </VTab>
      </VTabs>
    </VCard>

    <!-------- Modals --------->
    <VModal
      :showModal="showModal"
      @close="showModal = false"
      title="Modal Header"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
        numquam, vel quibusdam distinctio ullam, amet saepe, ipsa adipisci
        doloribus magni officia quod ad tenetur voluptas alias ratione culpa
        consequatur voluptate.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
        numquam, vel quibusdam distinctio ullam, amet saepe, ipsa adipisci
        doloribus magni officia quod ad tenetur voluptas alias ratione culpa
        consequatur voluptate.
      </p>
      <template #footer>Modal footer</template>
    </VModal>
    <VModal
      :showModal="showFormModal"
      @close="showFormModal = false"
      title="Modal Header"
    >
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>

        <VSelect
          @validation="validate('tag')"
          :error="errorMessage('tag')"
          :multiple="true"
          placeholder="Please select tag"
          v-model="payload.tag"
          :list="options"
          label="Tags"
        />

        <VSelect
          @validation="validate('tag')"
          :error="errorMessage('tag')"
          :multiple="true"
          :list="options"
          v-model="payload.tag"
          placeholder="Please select tag"
          label="Tags"
          disabled
        />

        <VInput
          @validation="validate('name')"
          :error="errorMessage('name')"
          label="Name"
          v-model="payload.name"
          placeholder="Please enter name"
        />

        <VTextarea
          @validation="validate('summary')"
          :error="errorMessage('summary')"
          v-model="payload.summary"
          label="Summary"
          placeholder="Please enter summary"
        />

        <VSwitch
          :defaultState="true"
          @change="triggerToggleEvent"
          :labelText="'Validate Response'"
          type="success"
        />

        <VCheckbox label="Ali" inputValue="Ali" v-model="selectedOptions" />

        <VCheckbox label="Reza" inputValue="Reza" v-model="selectedOptions" />

        <VCheckbox
          label="Disabled"
          inputValue="foo"
          v-model="selectedOptions"
          disabled
        />

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
          numquam, vel quibusdam distinctio ullam, amet saepe, ipsa adipisci
          doloribus magni officia quod ad tenetur voluptas alias ratione culpa
          consequatur voluptate.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
          numquam, vel quibusdam distinctio ullam, amet saepe, ipsa adipisci
          doloribus magni officia quod ad tenetur voluptas alias ratione culpa
          consequatur voluptate.
        </p>

        <VBtn
          @action="startLoading"
          btn="block"
          type="button"
          :loader="loaderRequest"
        >
          Add Note
        </VBtn>
      </form>
      <template #footer>Modal footer</template>
    </VModal>
  </div>
</template>


<script>
import * as Yup from "yup";

export default {
  data() {
    let _this = this;

    return {
      showModal: false,
      showFormModal: false,

      payload: {
        name: "",
        tag: "",
        summary: "",
      },

      options: ["list", "of", "options", "bla"],
      toggleActive: false,
      selected: "", //for checkbox
      selectedOptions: [], //for checkbox

      table: {
        columns: [
          { key: "id", label: "#", filterType: "number" },
          { key: "full_name", label: "Full Name", sortable: true },
          { key: "username", label: "Username", sortable: true },
          {
            key: "status",
            label: "Status",
            sortable: true,
            filterType: "select",
            filterItems: [
              { label: "All", value: "all", selected: true },
              { label: "Enable", value: "enabled" },
              { label: "Disable", value: "disabled" },
            ],
          },
          {
            key: "roles",
            label: "Roles",
            filterType: "multiselect",
            filterItems: [
              { label: "Admin", value: "admin" },
              { label: "Developer", value: "developer" },
              { label: "Staff", value: "staff" },
            ],
          },
          {
            key: "created_at",
            label: "Created At",
            class: "u-table--center",
            filterType: "date",
            sortable: true,
          },
          {
            key: "updated_at",
            label: "Updated At",
            class: "u-table--center",
            filterType: "date",
            sortable: true,
          },
          {
            key: "action",
            label: '<img src="/img/gear.svg" alt="" />',
            class: "u-table--center",
          },
        ],
        items: [],
        map: {
          action(item) {
            return `<NuxtLink v-if="can('person.update')" to="/person/edit/${item.id}" class="c-badge u-bg-info">Edit</NuxtLink> |
                <NuxtLink v-if="can('person.show')" to="/person/${item.id}" class="c-badge u-bg-primary">Details</NuxtLink>`;
          },
          created_at(item) {
            return _this.dateFormat(item.created_at);
          },
          updated_at(item) {
            return _this.dateFormat(item.updated_at);
          },
          full_name(item) {
            return `${item.name} ${item.family_name}`;
          },
          status(item) {
            return item.enabled
              ? `<span class="c-badge u-bg-success">Enable</span>`
              : `<span class="c-badge u-bg-danger">Disable</span>`;
          },
          roles(item) {
            let data = "";
            for (let role of item.roles) {
              data +=
                '<span class="c-badge u-bg-primary mr-1">' +
                role.label +
                "</span>";
            }
            return data;
          },
          //REQUIRED
          rowClass() {},
        },
      },
    };
  },

  methods: {
    calendarMethod() {
      console.log("calendar tab!");
    },
    historyMethod() {
      console.log("history tab!");
    },
    paymentrMethod() {
      console.log("payment tab!");
    },

    validation() {
      return Yup.object({
        name: Yup.string().required(),
        summary: Yup.string().required(),
        tag: Yup.array().min(1),
      });
    },

    resetError() {
      this.$store.commit("me/RESET_ERROR");
      this.errors = {
        name: "",
        tag: "",
        summary: "",
      };
    },

    triggerToggleEvent(value) {
      this.toggleActive = value;
    },

    //sample table methods
    async list() {
      this.startLoading();
      this.setWith("roles");
      this.$store.commit("person/RESET_ERROR");
      await this.$store.dispatch("person/list");
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.table.items = this.$store.state.person.list;
      }
      this.stopLoading();
    },
    changePage(val) {
      this.setPaginate(val);
      this.list();
    },
    changePerPage(val) {
      this.setLimit(val);
      this.setPaginate(1);
      this.list();
    },

    tableSearch(val) {
      console.log("tableSearch:", val);
      this.resetAxiosParams();
      this.setAxiosParams(val);
      this.list();
    },
  },

  created() {
    this.setTitle("Sample Page");
    this.setBreadcrumb([
      {
        to: "/example",
        name: "Samples",
      },
    ]);
    this.list();
    this.resetError();
  },
};
</script>
