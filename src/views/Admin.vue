<template>
  <div id="app">

    <div>
      <form @submit.prevent="saveRec(myData)">

          <label for='fbuild'>Build ID:</label>
          <input type='text' id="fbuild" value='1' v-model="myData.buildNo">

          <label for='fbuild'>Player ID:</label>
          <input type='text' id="fbuild" value='1' v-model="myData.playerId">

          <label for='fposx'>Posisition X:</label>
          <input type='text' id="fposx" value='' v-model="myData.position.x">

          <label for='fposy'>Posisition X:</label>
          <input type='text' id="fposy" value='' v-model="myData.position.y">

          <label for='faction'>Action: </label>
          <input type='text' id="faction" value='' v-model="myData.status.actions">

          <input type="submit" value="FETCH!">
      </form>
    </div>

     <div>
      <form @submit.prevent="goGetIt(myData)">
          <label for='fplayerid'>Player ID:</label>
          <input type='text' id="fplayerid" value='' v-model="myData.playerId">
          <input type="submit" value="GO!">
      </form>
    </div>

  </div>
</template>

<script>
import TelemetryRecord from "../lib/TelemetryRecord";
import Controller from "../lib/controller";


class AdminController extends Controller {

    constructor(name, subComponentList = []) {
        super(name, subComponentList);
        
        this.vm = {
            localRec: new TelemetryRecord( 1234, "", {x:0, y:0 }),
            savedRecords: [],
            
            myData: {
              buildNo: 1,
              
              position: {
                x: 0,
                y: 0
              },
              
              status: {
                actions: 0
              },

              playerId: 0
            },
        };

        this.props = [];

        this.injectActions(["updateRecord", "getRecord"]);
        this.injectGetters(["currentRec", "recordList", "recordCount"]);
    }

    goGetIt( myData ) {
      
      console.log(myData.playerId);

      let payload = {
        playerId:  myData.playerId
      }
      this.getRecord( payload );
    }

    saveRec( myData ) {

    
        let trec = new TelemetryRecord(myData.buildNo, myData.playerId, myData.position, myData.status.actions);
        this.updateRecord(trec);

        let recString = trec.asString();
        this.savedRecords.push(recString);
    }
}

    export default new AdminController("teledataAdmin");
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