"use strict";

const systemFBricks = require('../systemFBricks').systemFBricks

const workspace = (function(){
    let $workspace, drawingContext,  
    workspaceObjects, objectStatus, getPos, 
    update, addObject, removeObject, 
    initEventListeners

    workspaceObjects = new Map()

    objectStatus = {
        moving: 10, 
        static: 20
    }
    getPos = function(elementID){
        return {
            top : document.getElementById(elementID).offsetTop,
            left: document.getElementById(elementID).offsetLeft
        }
    }
    update = function(){
        workspaceObjects.forEach((val, htmlID)=>{
            
        })
        $('#out').empty()
        workspaceObjects.forEach(function(val, htmlID){
            $('#out').append( `<p>${htmlID}: ${val.status} : (${val.pos.top}, ${val.pos.left})</p>`)
        })
    }

    addObject = function(objectID, status){
        workspaceObjects.set(objectID, status)
        workspaceObjects.forEach((val, htmlID)=>{
       /*     if(collides(objectID, htmlID)){
                addToCollideList(objectID, htmlID)
            }
            else{
                removeFromCollideList(objectID, htmlID)
            }*/
        })
    }

    removeObject = function(htmlID){
        workspaceObjects.delete(htmlID)
    }

    initEventListeners = function(){
        $workspace.droppable({
                drop: function(event, ui){
                    let elementID = ui.draggable.attr('id')
                    addObject( elementID, {status:objectStatus.static, pos:getPos(elementID)} )
                    $( this ).removeClass('active')
                    update()
                },
                out: function(event,ui){
                    let elementID = ui.draggable.attr('id')
                    removeObject( elementID )
                    $( this ).removeClass('active')
                    update()
                },
                over: function(event, ui){
                    let elementID = ui.draggable.attr('id')
                    addObject( elementID, {status:objectStatus.moving, pos:getPos(elementID)})
                    $( this ).addClass('active')
                    update()
                }
        })
    }
 
    return{

        onReady:function(workspace){
            $workspace = workspace
            let c = document.getElementById("workbench")
            drawingContext = c.getContext("2d")
            drawingContext.moveTo(0, 0);
drawingContext.lineTo(200, 100);
drawingContext.stroke();
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
