'use strict';

const brickStatusCodes = (function(){
    return{
        //status codes for objects in workspace
        rendered:       0b0000001,
        inWorkspace:    0b0000010,
        moving:         0b0000100,
        grouped:        0b0001000, 
        newObject:      0b0010000, 
        destroyed:      0b1000000
    }
})()

const bricks = (function(){
    let $workspace, cssClasses

    cssClasses = {
        type:"typeBrick", 
        connector: "brick typeBrick",
        pug: "brick pugBrick", 
        group: "brick groupBrick"
    }
    return{
        setWorkspace(wks){
            $workspace = wks
        }, 

        Brick: function({htmlID, state, label, backgroundColor}){
            this.htmlID = htmlID 
            this.state = state || 0
            this.label = label
            this.backgroundColor = backgroundColor
            this.cssClasses = ["brick"]
        },

        TypeBrick: function(ty, idSuffix) {

            let brick = new bricks.Brick({
                htmlID: ty.alias + idSuffix, 
                state: 0, 
                label: ty.alias, 
                backgroundColor: ty.color})

            brick.cssClasses.push(cssClasses.type)
            return brick; 
        }, 

        ConnectorBrick: function(htmlID, brickState){

        }, 

        PugBrick: function(ty, pug, idSuffix){
            let brick = new bricks.Brick({
                htmlID: ty.alias + "_" + pug.name + idSuffix, 
                state: 0, 
                label: pug.label, 
                backgroundColor: ty.color})

        }, 

        GroupBrick: function(htmlID, brickState){

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

bricks.Brick.prototype.html = function(){
    return [`<div width='150' height='50'  `, 
            `class="${this.cssClasses.join(' ')}" `, 
            ` style='background-color:${this.backgroundColor}'>`, 
            this.label, 
            `</div>`].join('')
}

bricks.Brick.prototype.not = function( status ){
    this.status -= status
}


module.exports = {
    brickStatusCodes, 
    bricks
}
