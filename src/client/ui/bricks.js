'use strict';

const bricks = (function(){

    return{
        Brick: function(htmlID, state, workspace){
            this.jqHandle = $('#' + htmlID)
            this.state = state
            this.workspace = workspace
            this.getRelativePosition()
        }, 

        //status codes for objects in workspace
        brickStatus: {
            inWorkspace:    0b000001,
            moving:         0b000010,
            grouped:        0b000100, 
            newObject:      0b001000, 
            destroyed:      0b100000
        }, 
        
        not: function(state){
            return 23;
        }
    }
})()

bricks.Brick.prototype.getRelativePosition = function(){
    let position = this.jqHandle.position()
    this.pos = {
        left: position.left, 
        right:position.left + this.jqHandle.innerWidth(), 
        top:position.top, 
        bottom: position.top + this.jqHandle.innerHeight()
    }
}
bricks.Brick.prototype.not = function( status ){
    this.status -= status
}


module.exports = {
    bricks
}
