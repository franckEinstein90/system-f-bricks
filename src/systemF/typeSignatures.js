"use strict";

const expect = require('chai').expect
const equal = require('deep-equal')

//const context = require('./typeContext').typeContext 

const context = (function(){
    let frameStore, extendFrame, atomicTypeNames;

    atomicTypeNames = [] 

    return{
        newName: function(atomicType){
            let newIdx = atomicTypeNames.indexOf(atomicType) 
            if(newIdx >= 0){ //name already exists
                return newIdx 
            }
            atomicTypeNames.push(atomicType)
            return atomicTypeNames.length - 1 
        }

    }
})()

const typeSignatures = (function(){
    let signature, isSameSignature;

    isSameSignature = (sLeft, sRight) => typeSignatures.compare(sLeft, sRight) === typeSignatures.relation.same
    return{

        //constructor for type signatures

        signature : function(options){
            let typeDescription = options.typeDescription
            if(Array.isArray(typeDescription)){
                if(typeDescription.length === 1) {
                    if(Array.isArray(typeDescription[0])){ 
                        return typeSignatures.signature({
                            typeDescription:typeDescription[0]
                        })
                    }
                }
                return new typeSignatures.TypeSignature({
                    typeDescription
                })
            }
        },
        
        TypeSignature: function({
            typeDescription, 
            frameRef, //a reference to a context
            alias
        }){

            if(typeof typeDescription === 'function'){
                this.isAbstractType = true
                this.description = typeDescription
                return
            }

            if(Array.isArray(typeDescription)){
                if(typeDescription.length === 1) {
                    expect(Array.isArray(typeDescription[0])).to.eql(false)
                       this.description = context.newName(typeDescription[0])
                       this.typeVariable = true
                }
                if(typeDescription.length > 1){ //ArrowType
                    this.isArrowType = true
                    this.left = typeSignatures.signature({
                            typeDescription:[typeDescription[0]]
                        })
                    this.right = typeSignatures.signature({
                        typeDescription: typeDescription.slice(1)
                        })
                    this.description = `(${this.left.description}-${this.right.description})`
                }
            }
        },

        relation:{
            same:0,
            different:1
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

typeSignatures.TypeSignature.prototype ={
    toString: function(){
        if(this.isArrowType){
            return  `(${this.left.toString()}->${this.right.toString()})`
        }
        if(this.isAbstractType){
            let strRep = this.description.toString().split('=>')
            return `TT${strRep[0].trim()}.${strRep[1].trim()}`
        }
        return this.description
    }
}

module.exports = {
    typeSignatures
}