"use strict";

const app = require('../../app').app

const pugs = (function(){
   
   
    return{

        Pug: function({name, label, typeID}){
            if(name === undefined){
                throw pugs.errors.invalidName
            }
            if(!app.appUtils.isValidHtmlId(name)){
                throw pugs.errors.invalidName
            }
            this.name = name
            this.typeID = typeID || null
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