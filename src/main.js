/* Copyright Pedro Avelino 2020 */

'use strict'

import Vue from 'vue'

import store from '@/store'
import App from './App.vue'
import router from './router'

class MainApp {

  constructor( ){
    new Vue({
      router,
      store,
      components: { App },
      render: h => h( App ),
    }).$mount('#app')
  }
}

/* eslint-disable */
// Main entry point of the application
document.addEventListener('DOMContentLoaded', event => {

  const app = new MainApp();
});
