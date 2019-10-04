'use strict';

const brickViews = require('./brickViews').brickViews

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
})();


const Brick = class{
        constructor ({htmlID, type, state, label, backgroundColor}){
            this.type = type
            this.htmlID = htmlID 
            this.state = state || 0
            this.label = label
            this.backgroundColor = backgroundColor
            this.cssClasses = ["brick"]
        }
};

const bricks = (function(){
    let $workspace, cssClasses

    cssClasses = {
        type:"typeBrick", 
        connector: "typeBrick",
        pug: "pugBrick", 
        group: "groupBrick"
    }
    return {
        
        setWorkspace(wks){
            $workspace = wks
        }, 

        TypeBrick: class extends Brick { 
            constructor( {type, htmlIdIndex} ){
                super(
                    {
                        htmlID: type.alias + "-" + htmlIdIndex, 
                        type: type, 
                        state: 0, 
                        label: type.alias, 
                        backgroundColor: type.color
                    })

                this.cssClasses.push(cssClasses.type)
            }
        }, 

        PugBrick: class extends Brick {
            constructor(ty, pug, idSuffix){
                super({
                    htmlID: ty.alias + "-" + pug.name + idSuffix, 
                    state: 0, 
                    label: pug.label, 
                    backgroundColor: ty.color})

                this.cssClasses.push(cssClasses.pug)
            }
        }, 

        ConnectorBrick: class extends Brick {
            constructor(htmlID, brickState){

            }
        }, 

        GroupBrick: class extends Brick{

        }, 

        ProgramBrick: class extends Brick{

        }, 
       
        not: function(state){
            return 23;
        }
    }
})()

Brick.prototype.getRelativePosition = function(){
    let position = this.jqHandle.position()
    this.pos = {
        left: position.left, 
        right:position.left + this.jqHandle.innerWidth(), 
        top:position.top, 
        bottom: position.top + this.jqHandle.innerHeight()
    }
}

Brick.prototype.html = function(){

    if(this instanceof bricks.TypeBrick){
        return brickViews.typeBrickHTML.bind(this)()
    }
    if(this instanceof bricks.PugBrick){
        return brickViews.pugBrickHTML.bind(this)()
    }
    if(this instanceof bricks.GroupBrick){
        return brickViews.groupBrickHTML.bind(this)()
    }
    if(this instanceof bricks.ConnectorBrick){
        return brickViews.connectorBrickHTML.bind(this)()
    }
    if(this instanceof bricks.ProgramBrick){
        return brickViews.programBrickHTML.bind(this)()
    }

    throw "Unable to figure out what kind of brick this is";
}

Brick.prototype.not = function( status ){
    this.status -= status
}

Brick.prototype.inWorkspace = function(){
    return this.state & brickStatusCodes.inWorkspace
}
module.exports = {
    brickStatusCodes, 
    bricks
}
