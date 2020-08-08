//FIREBASE
/* eslint-disable */
import * as firebase from 'firebase/app'

//Add firebase services
/* eslint-disable */
import 'firebase/auth'
/* eslint-disable */
import 'firebase/firestore'

import Result from '../lib/Result'
import Axios from 'axios'


/* Copyright (C) 2020 Pedro Avelino, All rights reserved */

'use strict';

export default class Connection{

    constructor(local = false){
        //TODO:initialize connection to firebase
        const my = this._private_ = {
            local,
            firebaseConfig: {
                apiKey: "AIzaSyDSooZGnwi4Hd12iG_iTjhUKU1v6Gm92sY",
                authDomain: "ltsonar.firebase.com",
                databaseURL: "https://ltsonar.firebase.com",
                projectId: "ltsonar",
                storageBucket: "ltsonar.appspot.com",
                messagingSenderId: "417789009359",
            }
        }

        firebase.initializeApp( my.firebaseConfig )
        my.db = firebase.firestore();

    }

    
    post( edge = '/api/game/update/:gameiD', data = {} ) {
        
        const my = this._private_;

        const response = new Result();
        
        
        /* eslint-disable */
        return new Promise( async ( resolve, reject ) => {

            if(my.local){
                
                let data = await Axios.post( edge, data );
                response.payload( data ).ok();
            
            } else {
                
                //Firebase stuff
                let cmd = this._parseEdge( edge );
                const collection = my.db.collection( cmd.collection );
                
                if(cmd.collection == "gettelemetry"){

                }
                else if(cmd.command != "update"){
                    //use firebase add()
                    
                    /* eslint-disable */
                    const docRef = await collection.add( data )
                                

                    response.payload = docRef.id;
                    response.ok();
                    resolve( response );
                
                
                } else {
                    //update game state
                    const query = collection.where("id","==", cmd.params[0]);
                    
                    /* eslint-disable */
                    let docRef = await query.set( data, { merge: true })
                                .catch( err => reject( response ));

                    response.payload = docRef.id;
                    response.ok();
                    resolve( response );
                }
            }
        })
    }


    _parseEdge( edge = "/"){
        
        const COLLECTION = 2;
        const COMMAND = 3;

        const paramList = edge.split("/");
        
        return{
            collection: paramList[COLLECTION],
            command: paramList[COMMAND],
            params: paramList.slice( COMMAND + 1),
        }
    }

}