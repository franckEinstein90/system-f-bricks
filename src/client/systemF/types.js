"use strict"; 

const types = (function(){

    return{
        Type: function(typeSignature){
            this.typeSignature = typeSignature;
            this.pugs = [];
        }
    }
})();

types.Type.prototype.addPug = function(pug){
    this.pugs.push(pug)
}
module.exports = {
    types
}