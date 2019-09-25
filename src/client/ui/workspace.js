"use strict";

const app = require('../../app').app
const brickStatusCodes = require('./bricks').brickStatusCodes
const bricks = require('./bricks').bricks

const managedBricks = (function(){
    let _managedBricks = new Map()
    return{
        manageBrick: function(brick){
            _managedBricks.set(brick.htmlID, brick)
        }, 
        filter: function(predFunc){
            let brickIterator, 
                resultArray,
                brPtr

            brickIterator = _managedBricks.values()
            resultArray = []
            brPtr = brickIterator.next()
            while (!brPtr.done){
                if(predFunc(brPtr.value)){
                    resultArray.push(brPtr.value)
                }
                brPtr = brickIterator.next() 
            }
            return resultArray
        }, 
    }
})()

const workspace = (function(){

    let $workspace,  
        brickStatus, 
        initEventListeners, 
        pugPanel, 
        typeBrickGenerator, connectorBrickGenerator, pugBrickGenerator



    initEventListeners = function(){

        $workspace.droppable({

                drop: function(event, ui){
                    $( this ).removeClass( 'active' )
                },

                out: function(event, ui){
                   $( this ).removeClass( 'active')
                },

                over: function(event, ui){
                   $( this ).addClass('active')
                }
        })
    }

    pugPanel = function(pug){
        let pugBricks = [1,2,3,4,5,6,7]
        .map( count => pugBrick(pug, count))
        .join('')

    return [   `<div id='${pug.name}' class="pugs">`, 
                pugBricks
                `</div>`].join('')
    }
   
  
    return{

        onReady:function(workspace){
            $workspace = workspace
            initEventListeners()
       }, 
       makePugBrickGenerator: function(type, pug){

           if(this.pugIDRegistrar === undefined){
            this.pugIDRegistrar = new app.appUtils.StringRegistrar()
            }

            if(this.pugIDRegistrar.missing(pug.name)){
                this.pugIDRegistrar.add(pug.name, {count:1})
            }
            for(let i = 0; i < 10; i++){

                this.pugIDRegistrar.get(pug.name).count += 1; 
            } 

        },

        makeTypeBrickGenerator: function(type){
        let htmlCode = ""

        this.brickRegister = this.brickRegister || new app.appUtils.StringRegistrar()

        if(this.brickRegister.missing(type.alias)){
            this.brickRegister.add(type.alias, {count: 1})  
        }
        for(let i = 0; i < 10; i++){
            let idIndex = this.brickRegister.get(type.alias).count
            let newBrick = new bricks.TypeBrick(type, "_" + idIndex)
            managedBricks.manageBrick(newBrick)
            this.brickRegister.get(type.alias).count += 1
            htmlCode += newBrick.html()
            newBrick.state = brickStatusCodes.rendered
        }
        return htmlCode
 
        drawBricks = managedBricks.filter( 
            brick => brick.state === 0
            )
        //draw each brick
        return drawBricks.map(brick=>brick.html()).join('')

       }
   }
})()

module.exports = {
    workspace
}
