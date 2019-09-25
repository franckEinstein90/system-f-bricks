"use strict";

let appUtils = (function(){
    return{

        isValidHtmlId: str => /^[a-z][a-z\-]+[a-z]$/.test(str), 

        StringRegistrar: function(){
            this.store = new Map()
        }
    }
}())

appUtils.StringRegistrar.prototype = {
    missing: function(str){
        if(this.store.has(str))
            {
                return false
            }
        else{
            return true; 
        }
    },
    get: function(str) {
        return this.store.get(str)
    },
    add: function(str, value) {//throws if already exists
        if(this.missing(str)){
            return this.store.set(str, value)
        }
        throw "Element already in set"
    }
}

const app = (function(){
    let workspace, systemF, bricks, 
        workspaceBricks, 
        brickStatus, 
        types, 
        //helpers
        pug, $typesPanel, renderTypesPanel, 
        populateSystemF, 
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
            color: 'yellow' ,
            pugs: [ pug('user-a','a'), 
                    pug('user-b','b')] ,
            signatureDescription: ["NUM"], 
            pos: {left:20, top:150}},

        {   htmlID:"NUM-NUM", 
            color: 'red',
            pugs: [ pug('minus', '-'), 
                    pug('cos', 'cos'), 
                    pug('sin', 'sin') ],
            signatureDescription: ["NUM", "NUM"], 
            pos: {left:20, top:250}}, 

       {    htmlID:"NUM-NUM-NUM", 
            color: 'blue',
            pugs: [ pug('minus', '-'), 
                    pug('mult', '*'), 
                    pug('plus', '+'), 
                    pug('div', '/') ],
            signatureDescription: ["NUM", ["NUM", "NUM"]], 
            pos: {left:20, top:350}}
    ],

    renderTypesPanel = function(){
        $typesPanel = $( '#typesPanel' )
        let offset = 10 
        systemF.types.forEach(ty =>{
            let typeBricks, pugBricks; 
            typeBricks = workspace.makeTypeBrickGenerator(ty)
            $typesPanel.append(
                    [`<DIV id="${ty.alias}" class="brickGenerator" `, 
                        `style='top:${offset.toString()}px;'>`,
                       typeBricks, 
                       `<table style='top:${(offset+50).toString()}px'>${pugBricks}</table>`,
                      "</DIV>"].join('')
            )
            $(ty.alias).children().css('left', "10px")
            $(ty.alias).children().css('top', offset.toString() + "px")
            $('.brick').draggable();
            offset += 150 
        })
    }

   populateSystemF = function(){
        types.forEach( ty =>{ 
            systemF.addType(ty.signatureDescription, ty.htmlID, ty.color);
            systemF.addPugs(ty.signatureDescription, ty.pugs);
        });
    }

    return{
        appUtils: appUtils, 
        errorHandler: function({err, stage, message}) {
            console.log(err)
        },
        appStages: {
            init: x => "init:" + x, 
            running: 20
        },

        onReady: function(wks, sysF){
            try{

                systemF = sysF; 
                populateSystemF()
                workspace = wks
                renderTypesPanel()

            } catch(err){
                throw (app.appStages.init(err))
            }
        } ,

        onRun: function(){
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
