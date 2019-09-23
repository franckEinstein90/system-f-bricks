"use strict";

const app = (function(){
    let workspace, systemF, bricks, 
        workspaceBricks, 
        brickStatus, 
        types, 
        //helpers
        pug, 
        $typesPanel, typesPanel, typePanel, 
        pugPanel, populateSystemF, 
        report
       
    /*******   helper function ************************/
    pug = (n,l) => ({name:n, label:l})

    workspaceBricks = new Map() 

    report = function(){
        let strOut = ""
        workspaceBricks.forEach(
            (_, htmlID) => strOut += `<h2>${htmlID}</h2>`)
        $('#see').empty()
        $('#see').append(strOut)
    }

    types = [
        {   htmlID:"NUM", 
            pugs: [ pug('a','a'), 
                    pug('b','b')] ,
            signatureDescription: ["NUM"], 
            pos: {left:20, top:150}},

        {   htmlID:"NUM-NUM", 
            pugs: [ pug('minus', '- x'), 
                    pug('cos', 'cos x'), 
                    pug('sin', 'sin x') ],
            signatureDescription: ["NUM", "NUM"], 
            pos: {left:20, top:250}}, 

       {   htmlID:"NUM-NUM-NUM", 
            pugs: [ pug('minus', 'x - y'), 
                    pug('mult', 'x * y'), 
                    pug('plus', 'x + y'), 
                    pug('div', 'x / y') ],
            signatureDescription: ["NUM", ["NUM", "NUM"]], 
            pos: {left:20, top:350}}
    ],

    pugPanel = function(ty, pug){
        return [   `<div id='${pug.name}' class="pug generator">`, 
                    `${pug.label}`, 
                    `</div>`].join('')
    }, 

    typePanel = function(ty){

/*        let panelTitle, pugPanels
        panelTitle = ty.signature.toString()
        pugPanels = ty.pugs.map(pug => pugPanel(ty, pug)).join('')

        return    [ `<h3> Type: ${panelTitle} </h3>`,
                    `<div id='${ty.htmlID}' class="typePanel">`, 
                    pugPanels, 
                    `</div>`].join( "" )*/
    }

    typesPanel = function(){

        let typeIterator, tyPtr

        $typesPanel = $( '#typesPanel' )
        typeIterator = systemF.typeIterator()
        tyPtr = typeIt.next()

        while (!tyPtr.done){

            let ty = tyPtr.value;
            $typesPanel.append(typePanel(ty))
            tyPtr = typeIterator.next() 

        }

/*           drag: x => app.postMessage('m moving')


        types.forEach(ty => $typesPanel.append(createTypePanel(ty)))
        $('.pug').draggable({
            })*/
    }
/*
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
 */
    populateSystemF = function(){
        types.forEach( ty =>{ 
            systemF.addType(ty.signatureDescription);
            systemF.addPugs(ty.signatureDescription, ty.pugs);
        });
    }

    return{
        errorHandler: function({err, stage, message}) {
            console.log(err)
        },
        appStages: {
            init: x => "init:" + x, 
            running: 20
        },

        onReady: function(wks, sysF, brks){
            try{

                systemF = sysF; populateSystemF()
                workspace = wks
                bricks = brks
                typesPanel()

            } catch(err){
                throw (app.appStages.init(err))
            }
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

        updateBricks: function(BrickID, currentState){

            let newStatus
        
            if(workspaceBricks.has(BrickID)) {
                let brick = workspaceBricks.get(BrickID)
                brick.getRelativePosition()
            //    newStatus = from( oldStatus, currentStatus  )
            }
            else {
                //create a new brick and add to //workspace
                let newBrick = new bricks.Brick(BrickID, 
                                                currentState, 
                                                workspace)
        
                workspaceBricks.set(BrickID, newBrick) 
        
            }
            report()
        }, 

        addNewTSElements: function(){
            types.forEach( ts => makeNewElement(ts) ) 
        } ,

        addNewTSElement: function(idx){
            let ts = types[idx]
            makeNewElement(ts)
        } ,

        postMessage: function(msg){
           console.log('|') 
        }
    }
})()

module.exports = {
    app
}
