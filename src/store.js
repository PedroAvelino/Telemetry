/*
VUEX Data Store.
Copyright (c) 2019. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use( Vuex, Axios )

// Modules

import Connection from './store/Connection'
import TelemetryRecord from './lib/TelemetryRecord'

const cloud = new Connection();

// Store with modules
const store = new Vuex.Store({

    state: {
        currentRec: new TelemetryRecord( 1234, "", {x:0, y:0 }),
        telemetryRAW: []
    },

    getters: {
        currentRec: state => state.currentRec,
        recordList: state => state.telemetryRAW.map( element => element.label ),
        recordCount: state => state.telemetryRAW.lenght,
        newInfo: state => state.info
    },

    actions: {
        
        // async fetchRecord({ commit }, recId ){
        //     //go fetch the record with the id and update the currentRec
        // },

        async updateRecord({ commit }, newTRec ){

            commit('SET_CURRENT', newTRec );

            //Post the info to the cloud, and get the user id 
            let id = await cloud.post('/api/telemetry', newTRec.data )
                .catch( err => {

                    console.log( err );
                    return;
                });

            commit('ADD_RAW', { id: id, label: newTRec.asString() });
            

        },

        async getRecord( { commit }, playerId ){
            
            let info = await cloud.post('/api/telemetry', playerId)
                .catch( err => {
                    console.log( err );
                    return;
                })
            console.log( info );

            commit('ADD_INFO')
        }
    },

    mutations: {

        ADD_RAW: ( state, newRaw ) => { state.telemetryRAW.push( newRaw )},
        SET_CURRENT: ( state, newTRec ) => { state.currentRec = newTRec },
        ADD_INFO: ( state, info ) => { state.info = info },
    }
});

//      OR

// Store with local definitions
//const store = new Vuex.Store({ state, mutations, actions, getters });

export default store;