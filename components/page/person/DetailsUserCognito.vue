<template>
  <form action="" class="c-form">
    <h4 class="c-form__title mb-2">Details</h4>
    <div class="c-form__control c-form__control--inline">
      <label class="c-form__label">Id</label>
      <span class="u-text-secondary">{{ data.id }} <span :class="['c-badge',data.enabled ?'u-bg-success':'u-bg-danger']">{{
          data.enabled ? "Enabled" : "Disabled"
        }}</span></span>
    </div>
    <div class="c-form__control c-form__control--inline">
      <label class="c-form__label">Name</label>
      <span class="u-text-secondary">{{ data.name }}</span>
    </div>
    <div class="c-form__control c-form__control--inline">
      <label class="c-form__label">Family Name</label>
      <span class="u-text-secondary">{{ data.family_name }}</span>
    </div>
    <div class="c-form__control c-form__control--inline">
      <label class="c-form__label">Email</label>
      <span class="u-text-secondary">{{ data.email }} <span
        :class="['c-badge mr-0',data.email_verified ?'u-bg-success':'u-bg-danger']">{{
          data.email_verified ? "Verified" : "Not Verified"
        }}</span></span>
    </div>
    <div class="c-form__control c-form__control--inline">
      <label class="c-form__label">Status</label>
      <span class="u-text-secondary">
        <span :class="['c-badge mr-0 u-bg-info']">{{ data.status }}</span>
      </span>
    </div>
    <div class="c-form__control c-form__control--inline ">
      <label class="c-form__label">Created At</label>
      <span class="u-text-secondary">{{ dateFormat(data.created) }}</span>
    </div>
    <div class="c-form__control c-form__control--inline ">
      <label class="c-form__label">Updated At</label>
      <span class="u-text-secondary">{{ dateFormat(data.updated) }}</span>
    </div>
  </form>
</template>

<script>
export default {
  name: "Details",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
