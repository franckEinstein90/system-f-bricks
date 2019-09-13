const typeSignatures = require('./typeSignatures').typeSignatures

const systemFBrick = (function(){
    let publicChannel,
        workspace,  
        signature, types, 
        makeNewElement, 
        startDrag, onDrag, stopDrag

    signature =  x => typeSignatures.signature(x)
    types = [
        {   htmlID:"NUM", 
            numElements: 0, 
            signature: signature({
                    typeDescription: ["NUM"]
                }), 
            pos: {left:20, top:150}},

        {   htmlID:"NUM-NUM", numElements: 0, 
            signature: signature({
                typeDescription: ["NUM", "NUM"]
            }), pos: {left:20, top:250}}, 

       {   htmlID:"NUM-NUM-NUM", 
            numElements: 0, 
            signature:signature({
                typeDescription: ["NUM", ["NUM", "NUM"]]
            }), pos: {left:20, top:350}}
    ], 

    makeNewElement = function(ts){
        let newElementID = `${ts.htmlID}_${ts.numElements + 1}`
        let newTS = [
                    `<DIV class="drag" id="${newElementID}" `,
                    `style="top:${ts.pos.top}px; left:${ts.pos.left}px"> `, 
                    `${ts.signature.description}</DIV>`].join('')
        $( '#' + ts.htmlID ).after(newTS)
        $( '#'+ newElementID )
            .draggable({
                start:startDrag, 
                drag:onDrag, 
                stop:stopDrag 
            })
            .droppable({
                over: function( event, ui){
                    if(workspace.contains($(this))){
                    let elementID = $( this ).attr('id').split("_")
                    let thisTS = types.find( type => type.htmlID === elementID[0])
                    let otherGuy = ui.draggable.attr('id')

                    console.log(`${elementID} being checked out by ${otherGuy}`)
                    }
                }
            })


        ts.numElements += 1
    },

    publicChannel = new BroadcastChannel('public'),

    startDrag = function( ev, dd ){
			$( this ).addClass('active')
    },

    onDrag = function( ev, dd ){
           $('#status').text( $(this).attr('id'))
    },

    stopDrag =   function(){
           $( this ).removeClass('active')
    }
 
    return{
        errorHandler: function(err, message) {

        },
        appStages: {
            init: 10, 
            running: 20
        },
        onReady: function(wks){
            workspace = wks
            systemFBrick.addNewTSElements()
        } ,
        run: function(){
         /*   if(!window.Worker){
                alert("this is not going to work")
            }
            
             
            $garbage = $("#garbage")
        
        
        
        
            $('.left-node').droppable({
        
            })
        
            $('.drag').draggable({
                start: function( ev, dd ){
                    systemFBrick.addNewTSElements()
                    $( this ).addClass('active')
                },
                drag: function( ev, dd ){
                   $('#status').text( $(this).attr('id'))
                },
                stop:  function(){
                    if(workspace.contains($( this ))){
                        $('#status').text("in")
                    }
                    else {
                        $('#status').text('out')
                    }
                    $( this ).removeClass('active')
                    if( $( this ).offset().top > $garbage.offset().top){
                        alert('kill')
                    }
                }
            })
        */ 
        },
        addNewTSElements: function(){
            types.forEach( ts => makeNewElement(ts) ) 
        } ,

        addNewTSElement: function(idx){
            let ts = types[idx]
            makeNewElement(ts)
        } ,

        broadcastPublic: function(msg){
            publicChannel.postMessage(msg)
        }
    }
})()

module.exports = {
    systemFBrick
}
