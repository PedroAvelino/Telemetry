/*
VUE App's MAIN Component.
Copyright (c) 2018. Pedro Avelino,  All Rights Reserved.
*/
'use strict';

import Vue from 'vue'
import Router from 'vue-router';
Vue.use( Router );

import pgApp from '@/App.vue'
import teledataAdmin from './views/Admin.vue'


export default new Router({
    routes: [
        { path:"/",             name:"Lobby", component: pgApp}, 
        { path:"/admin",        name:"Admin", component: teledataAdmin}, 
    ]
});