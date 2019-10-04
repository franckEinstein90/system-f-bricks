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


const report = (function(){

  let messages=[]

  return{
    addMsg: function(msg){
      messages.push(msg)
    }, 
    clear: function(){
      messages.length = 0
    }, 
    display: function(){
        $('#status').text(statusMsg);
    }
  }
})()

const app = (function(){
    let workspace, systemF, bricks, 
        workspaceBricks, 
        brickStatus, 
        types, 
        //helpers
        pug, $typesPanel, renderTypesPanel, 
        populateSystemF
       
    /*******   helper function ************************/
    pug = (n,l) => ({name:n, label:l})
    
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
            color: 'beige',
            pugs: [ pug('minus', '-'), 
                    pug('mult', '*'), 
                    pug('plus', '+'), 
                    pug('div', '/') ],
            signatureDescription: ["NUM", ["NUM", "NUM"]], 
            pos: {left:20, top:350}}
    ]

    renderTypesPanel = function(){
        systemF.types.forEach(
            ty =>{ 
              workspace.makeTypeBrickGenerator(ty)
              workspace.makePugBricksGenerator(ty)
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
            if(workspace.dirtyBit === false) return; //nothing changed
            let bricksInWorkspace = workspace.bricks.filter(
                      function(brick){ 
                        return brick.inWorkspace()
                      })
            bricksInWorkspace.forEach(brick => console.log(brick.htmlID))
            workspace.dirtyBit = false 
        }
    }
})()

module.exports = {
    app
}
