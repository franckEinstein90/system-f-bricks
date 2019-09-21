"use strict";

const app = require('../../app').app
const bricks = require('./bricks').bricks
const workspace = (function(){

    let $workspace,  
        brickStatus, 
        initEventListeners

    
   
    initEventListeners = function(){

        $workspace.droppable({

                drop: function(event, ui){

                    app.updateBricks( ui.draggable.attr('id'),  
                        bricks.brickStatus.inWorkspace | 
                        bricks.not(bricks.brickStatus.moving) ) 

                    $( this ).removeClass( 'active' )
                },

                out: function(event, ui){
                    app.updateBricks( ui.draggable.attr('id'), 
                        not( bricks.brickStatus.inWorkSpace ))
                         
                    $( this ).removeClass( 'active')
                },

                over: function(event, ui){
                     console.log("enter")
                     app.updateBricks( ui.draggable.attr('id'),
                        bricks.brickStatus.inWorkspace | 
                        bricks.brickStatus.moving ) 

                    $( this ).addClass('active')
                }
        })
    }
 
    return{

        onReady:function(workspace){

            $workspace = workspace
            initEventListeners()

       }

   }
})()

module.exports = {
    workspace
}
