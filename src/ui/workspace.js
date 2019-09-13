"use strict";

const systemFBricks = require('../systemFBricks').systemFBricks

const workspace = (function(){
    let $workspace, workspaceObjects, 
    update, addObject, removeObject, 
    initEventListeners

    update = function(){

    }

    addObject = function(htmlID){

    }

    removeObject = function(htmlID){

    }

    initEventListeners = function(){
        $workspace.droppable({
                drop: function(event, ui){
                    let elementID = ui.draggable.attr('id')
                    addObject( $( elementID ) )
                    $( this ).removeClass('active')
                    update()
                },
                out: function(event,ui){
                    let elementID = ui.draggable.attr('id')
                    removeObject( $( elementID ) )
                    $( this ).removeClass('active')
                    update()
                },
                over: function(event, ui){
                    let elementID = ui.draggable.attr('id')
                    addObject( $ ( elementID ) )
                    $( this ).addClass('active')
                    update()
                }
        })
    }
 
    return{

        onReady:function(workspace){
            $workspace = workspace
            initEventListeners() 
       },

        contains:function(element){
            let workspaceLeft = $workspace.offset().left 
            let workspaceTop = $workspace.offset().top

            if  ( element.offset().top < workspaceTop ){
                return false
            }
            if ( element.offset().left < workspaceLeft){
                return false
            }
            if ( element.offset().left > workspaceLeft + $workspace.outerWidth()) {
                return false
            }
            if ( element.offset().top > workspaceTop + $workspace.outerHeight()){
                return false
            }
            return true
        }
    }
})()

module.exports = {
    workspace
}