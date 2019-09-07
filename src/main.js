
const systemFBrick = (function(){
    let publicChannel, 
        typeSignatures, 
        makeNewElement, 
        startDrag, onDrag, stopDrag

    
    typeSignatures = [
        {htmlID:"NUM", numElements: 0, signature: ["NUM"], pos: {left:20, top:150}},
        {htmlID:"NUM-NUM", numElements: 0, signature: ["NUM", "NUM"], pos: {left:20, top:250}}, 
        {htmlID:"NUM-NUM-NUM", numElements: 0, signature: ["NUM", ["NUM", "NUM"]], pos: {left:20, top:350}}
    ], 

    makeNewElement = function(ts){
        let newElementID = ts.htmlID + (ts.numElements + 1)
        let newTS = [
                    `<DIV class="drag" id="${newElementID}" `,
                    `style="top:${ts.pos.top}px; left:${ts.pos.left}px"> `, 
                    `${newElementID}</DIV>`].join('')
        $( '#' + ts.htmlID ).after(newTS)
        $( '#'+ newElementID ).draggable({
            start:startDrag, 
            drag:onDrag, 
            stop:stopDrag 
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
			if(workspace.contains($( this ))){
                $('#status').text("in")
            }
            else {
                $('#status').text('out')
            }
            $( this ).removeClass('active')
/*            if( $( this ).offset().top > $garbage.offset().top){
                alert('kill')
            }*/
    }
 
    return{
         
        onReady: function(){
            systemFBrick.addNewTSElements()
        } ,

        addNewTSElements: function(){
            typeSignatures.forEach( ts => makeNewElement(ts) ) 
        } ,

        addNewTSElement: function(idx){
            let ts = typeSignatures[idx]
            makeNewElement(ts)
        } ,

        broadcastPublic: function(msg){
            publicChannel.postMessage(msg)
        }
    }
})()

const workspace = (function(){
    let $workspace
    return{
        onReady:function(){
            $workspace = $("#workspace")
            $workspace.droppable({
                drop: function(event, ui){
                    $( this ).addClass('active')
                },
                out: function(event,ui){
                    $( this ).removeClass('active')
                }
            })

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

jQuery(function($){

	let $garbage

    systemFBrick.onReady()
    workspace.onReady()


    if(!window.Worker){
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

});


