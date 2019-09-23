"use strict";

const app = require('../app.js').app
const ts = require('./systemF/typeSignatures').typeSignatures
const types = require('./systemF/types').types
const context = require('./programs/context').context

const systemF = (function(){

    let systemTypes = new Map();

    return {
        typeIterator: function(){
            return systemTypes.values()
        },

        onReady: function( ){
        },

        addType: function(signatureDescription){
            let typeSignature = ts.signature(
                context, 
                signatureDescription)

            systemTypes.set(
                typeSignature.toString(), 
                new types.Type(typeSignature) )
        },

        addTypes: function(){

        },

        addPug: function(signatureDescription, pug){
            let typeSignature = ts.signature(context, 
                signatureDescription)
            if(systemTypes.has(typeSignature.toString())){
                systemTypes.get(typeSignature.toString()).addPug(pug)
            }
        }, 

        addPugs: function(typeSignature, pugs){
            pugs.forEach(pug => {
               this.addPug(typeSignature, pug) 
            });
        }

    }
})()

module.exports = {
    systemF
}