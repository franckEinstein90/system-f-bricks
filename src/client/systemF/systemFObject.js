
const app = require('../../app').app
const ts = require('./typeSignatures').typeSignatures
const uuidv4 = require('uuid/v4')

let systemFObject = (function(){

  let systemFObject =  class{

      constructor({typeSignature}){
        this.typeSignature = typeSignature
        this.uuid = uuidv4();
      }
      
    }

  return{

    Type: class extends systemFObject{

      constructor({typeSignature, color, alias}){
        super({typeSignature});
        this.color = color
        this.pugs = [];
        this.alias = alias || typeSignature.toString();
      }
    }, 

    Pug: class extends systemFObject{

    },
 
    Connector: class extends systemFObject{

      constructor({leftNode, rightNode}){
        typeSignature = leftNode.typeSignature.apply(rightNode.typeSigna
      }

    }

 }

})();

systemFObject.Type.prototype.addPug = function({name, label}){
    this.pugs.push(new pugs.Pug({name, label, typeID:this.uuid}))
}

systemFObject.Type.prototype.toString = function(options){
    return this.typeSignature.toString(options)
}

module.exports = {

}
