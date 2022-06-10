import Vue from "vue";

const mixin = {
  data() {
    return {
      constants: {
        FULL_NAME_COL: "full_name",
        NOTIFICATION_COL: "note",
        PAID_SO_FAR_COL: "paid_so_far",
        MLS_COL: "MLS",
        STATUS_COL: "status",

        VERIFIED_PROP: "_verified",
        INCREMENT_PROP: "_increment",
      },
    };
  },
};

Vue.mixin(mixin);
