/*
VUEX Data Store.
Copyright (c) 2019. Pedro Avelino, All Rights Reserved.
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
        newInfo: state => state.info,
    },

    actions: {

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
            
            let info = await cloud.post(`/api/telemetry/gettelemetry`, playerId )
                .catch( err => {
                    
                    console.log( err );

                    return;
                })
            
            if(info.errorCode != -1)
            {
                alert(info.errorMsg);
                console.log(info);
            }
            else{
                let player = info.payload;
                let myMsg = `Player Info: ${player.playerId}, X: ${player.pos.x }, Y: ${player.pos.y}, Action: ${player.action}`;
                alert(myMsg);
                commit('ADD_INFO', info.payload)
            }
            
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