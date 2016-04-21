"use strict";

import Vue from "vue"

Vue.config.devtools = true

new Vue({
  el: 'body',
  data: {
    sidebar: {
      displaying: false,
    }
  },
  methods: {
    callSidebar() {
      this.sidebar.displaying = !this.sidebar.displaying;
    }
  }
})
