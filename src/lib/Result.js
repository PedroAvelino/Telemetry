/*
Copyright (C) 2020 Pedro Avelino

Result is a POJS thing we can get back from a server
 */

 export default class Result{

    constructor( errorCode = -1, errorMsg = "Unknown Error", payload = {})
    {
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
        this.payload = payload;
    }

    ok(){
        
        this.error = 0;
        this.errorMsg = "";

        return this;
    }

    serialize(){

        return JSON.stringify( this );
    }
 }