"use strict";

const expect = require('chai').expect
const equal = require('deep-equal')

//const context = require('./typeContext').typeContext 


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

        combine: function(tsLeft, tsRight){
            if ( tsLeft.isAbstractType ){
                return signature(tsLeft.description(tsRight.description))
            }
            if ( tsLeft.isArrowType && isSameSignature(tsLeft.left, tsRight) ){
                return tsLeft.right
            }
        }
    }
})();


typeSignatures.TypeSignature.prototype = {
    get key(){
        return this.toString()
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