"use strict"; 

const uuidv4 = require('uuid/v4')
const pugs = require('./pugs.js').pugs

const types = (function(){
    let that = this

    return{

        Type: function(typeSignature, {alias, color}){
            this.typeSignature = typeSignature;
            this.color = color
            this.pugs = [];
            this.alias = alias || typeSignature.toString();
            this.uuid = uuidv4();
        }

    }
})();

types.Type.prototype.addPug = function({name, label}){
    this.pugs.push(new pugs.Pug({name, label, typeID:this.uuid}))
}
types.Type.prototype.toString = function(options){
    return this.typeSignature.toString(options)
}
module.exports = {
    types
}