"use strict";

const app = require('../../app').app
const ts = require('./typeSignatures').typeSignatures

const pugs = (function(){
   
   
    return{

        Pug: function({name, label, typeUuid}){

            if(name === undefined){
                throw pugs.errors.invalidName
            }
            if(!app.appUtils.isValidHtmlId(name)){
                throw pugs.errors.invalidName
            }
            this.name = name
            this.typeUuid = typeUuid || null
            this.label = label || name
        }, 

        errors:{
            invalidName: "Invalid Pug Name"
        }
    }
})()

module.exports = {
    pugs
}
