<template>
  <div>
    <VCard title="Dashboard">
      <template #header> </template>
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
          :disabled="true"
          @validation="validate('tag')"
          :error="errorMessage('tag')"
          :multiple="true"
          placeholder="Please select tag"
          v-model="payload.tag"
          :list="options"
          label="Tags"
        />
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
            <VTextarea
              @validation="validate('summary')"
              :error="errorMessage('summary')"
              v-model="payload.summary"
              label="Summary"
              placeholder="Please enter summary"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <VSwitch
              :defaultState="true"
              v-on:change="triggerToggleEvent"
              :labelText="'Validate Response'"
            />
          </div>
          <div class="col-12">
            <VCheckbox
              label="Ali"
              data="Ali"
              :list="selectedOptions"
              v-model="selected"
            />
            <VCheckbox
              label="Reza"
              data="Reza"
              :list="selectedOptions"
              v-model="selected"
            />
          </div>
          <div class="col-12">
            <VCheckbox
              label="Disabled"
              inputValue="foo"
              v-model="selectedOptions"
              :disabled="true"
            />
          </div>
        </div>
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
    <VCard title="Alert">
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

    <VCard title="MLS Information">
      <template #header>
        <VBtn class="m-0 c-btn--small" btn="info">Button</VBtn>
        <VBtn class="m-0 c-btn--small" btn="danger">Button</VBtn>
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

    <VCard title="Card Long Title Sample">
      <template #header>
        <VBtn class="m-0 c-btn--small" btn="success">Success</VBtn>
      </template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
        eligendi quis, assumenda corporis ut error molestiae totam hic facilis
        et, nostrum culpa expedita maiores cumque amet modi delectus earum enim!
      </p>
      <VBtn @action="showModal = true">Show Modal</VBtn>
      <VBtn @action="showFormModal = true" btn="info">
        Show Form Modal
      </VBtn>
    </VCard>

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
          :disabled="true"
          @validation="validate('tag')"
          :error="errorMessage('tag')"
          :multiple="true"
          placeholder="Please select tag"
          v-model="payload.tag"
          :list="options"
          label="Tags"
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
          v-on:change="triggerToggleEvent"
          :labelText="'Validate Response'"
        />

        <VCheckbox
          label="Ali"
          data="Ali"
          :list="selectedOptions"
          v-model="selected"
        />

        <VCheckbox
          label="Reza"
          data="Reza"
          :list="selectedOptions"
          v-model="selected"
        />

        <VCheckbox
          label="Disabled"
          inputValue="foo"
          v-model="selectedOptions"
          :disabled="true"
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
    };
  },

  methods: {
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
  },

  created() {
    this.setTitle("Dashboard");
    this.setBreadcrumb([]);
    this.resetError();
  },
};
</script>
