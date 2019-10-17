"use strict";

const expect = require('chai').expect
const equal = require('deep-equal')


const typeSignatures = (function(){

    let signature, isSameSignature;

    signature = function(context, typeDescription){
        return typeSignatures.signature(context, typeDescription)
    },

    isSameSignature = (sLeft, sRight) => typeSignatures.compare(sLeft, sRight) === typeSignatures.relation.same

    return{

        errors: {
            unknownTypeDescription: "Unable to construct signature from description"
        },

        categories: {
            Atomic: "Atomic Type", 
            Arrow: "Arrow Type", 
            Abstract: "Abstract Type" 
        },  

        relations: {
            same:0,
            different:1
        },

        //constructor for type signatures
        signature : function(context, typeDescription){

            if  ( Array.isArray(typeDescription) && 
                  typeDescription.length === 1  &&
                  Array.isArray(typeDescription[0]) ) {
                    return signature(context, typeDescription.flat())
            }


            return new typeSignatures.TypeSignature(context, typeDescription)
        },
        
        TypeSignature: function(context, typeDescription){

            this.context = context

            if ( typeof typeDescription === 'function'){
                this.category = typeSignatures.categories.Abstract 
                this.description = typeDescription
                return
            }

            if ( Array.isArray(typeDescription) && typeDescription.length === 1 ) {

                expect(Array.isArray(typeDescription[0])).to.eql(false)
                this.category = typeSignatures.categories.Atomic
                this.description = context.name(typeDescription[0])
                return
            }
            
            if ( Array.isArray(typeDescription) && typeDescription.length > 1 ) { //ArrowType

                this.category =   typeSignatures.categories.Arrow
                this.left     =   signature(context, [typeDescription[0]])
                this.right    =   signature(context, typeDescription.slice(1))
                return
            }

            
        },

      
        compare: function(tsLeft, tsRight){
            expect(tsLeft, "...").to.exist
            expect(tsRight, "right is undefined").to.exist
            if(typeof tsLeft.description === 'function' && typeof tsRight.description === 'function'){
                let X = Symbol()
                return typeSignatures.compare(
                    signature(tsLeft.description(X)),
                    signature(tsRight.description(X)))
            }
            if(Array.isArray(tsLeft.description) && Array.isArray(tsRight.description)){
                if(equal(tsLeft, tsRight)) {
                    return typeSignatures.relation.same
                }
                if(typeSignatures.compare(tsLeft.left, tsRight.left) === typeSignatures.relation.same){
                    return typeSignatures.compare(tsLeft.right, tsRight.right)
                }
            }
            return typeSignatures.relation.different
        },

        deduce: function({leftNode, rightNode}){ 
            //takes 2 typeSignatures and returns 
            //the result of the deduction
            //
            //deduce(X:W, A) = V[A/X]
            if ( leftNode.isAbstractType ){
                return //signature(leftNode.description(tsRight.description))
            }
            //deduce(A -> B, A) = B
            if ( leftNode.isArrowType && isSameSignature(leftNode.left, rightNode) ){
                return leftNode.right
            }
        }
    }
})();


typeSignatures.TypeSignature.prototype = {

    get key(){
        return this.toString()
    },


    mod: function({atomicCallback, abstractCallback, arrowCallback}){
    //applies a callback function to this object
    //depending on the type of object it is
         switch(this.category){
            case typeSignatures.categories.Atomic:
                  return atomicCallback.bind(this)()
            case typeSignatures.categories.Arrow:
                  return arrowCallback.bind(this)()
            case typeSignatures.categories.Abstract:
                  return abstractCallback.bind(this)()
          } 
    }, 

    toString: function(){
        let signatureDescription

        switch(this.category){
            case typeSignatures.categories.Atomic:
                signatureDescription = 
                    this.description 
                    break
            case typeSignatures.categories.Arrow:
                signatureDescription = 
                    ['(' + this.left.toString(),
                    String.fromCharCode(8594), 
                    this.right.toString() + ')'].join('')
                    break
            case typeSignatures.categories.Abstract:
                signatureDescription = "" 
                    break
        }

        return signatureDescription
    }
}

module.exports = {
    typeSignatures
}
