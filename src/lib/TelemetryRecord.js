/*Copyright Pedro Avelino 2020,*/

export default class TelemetryRecord{
    constructor( buildId, playerId, pos, status ){
        
        this.data = localStorage.getItem('currentTRecData');
        
        this.data = {
            ...status,
            buildId,    //number
            playerId,   //string_ref
            pos         //{ x: Number, y: Number}
        }

        //Save at the local storage
        localStorage.setItem("currentTRecData", this.serialize() );

    }

    get buildId() { return this.data.buildId }
    set buildId( val ) { this.data.buildId = val }

    get playerId() { return this.data.playerId }
    set playerId( val ) { this.data.playerId = val }

    get pos() { return this.data.pos }
    set pos( val ) { this.data.pos = val }

    get action() { return this.data.action }
    set action( val ) { this.data.action = val }

    asString(){
        
        let formatted = `Build: ${this.data.buildId} `;
        formatted += `player: ${this.data.playerId} at`;
        formatted += ` (x: ${this.data.pos.x}, y: ${this.data.pos.y}) is doing `;
        formatted += `${this.data.action}`;

        return formatted;
    }

    serialize(){

        return JSON.stringify( this.data )
    }

    deserialize( toParse ) {
        
        this.data = JSON.parse( toParse );
    }
}