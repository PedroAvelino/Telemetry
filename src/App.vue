<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Admin/>
  </div>
</template>

<script>

import Controller from './lib/controller'

import Admin from './views/Admin.vue'

class AppController extends Controller {

  constructor( name, subComponentList = []) {

    super( name, subComponentList );
    this.vm = {
      title: 'Super Awesome Crazy Hyper Mega Cool App',
      subtitle: 'ok'
    }

    this.components = {
      Admin
    }
  }

}

export default new AppController('pgApp');

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
