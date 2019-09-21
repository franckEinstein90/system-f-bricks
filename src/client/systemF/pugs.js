"use strict";

const app = require('../../app').app

const pugs = (function(){
    let pugs, makeTypeGroup

    pugs = [
            {
                type: "NUM->NUM->NUM", 
                elements: [ {label:'+'}, {label:'*'}, {label:"-"}]
            },
            {
                type: "NUM->NUM", 
                elements: [ {label:'cos'}, {label:'-'}, {label:"sqrt"}]
            },

            {
                type: "NUM", 
                elements: [ {label:'x'}, {label:'y'} ]
            }
        ]

    makeTypeGroup = function({type, elements}){
        let elementsView = elements.map(el => `<div style="font-size:14pt">${el.label}</div>`).join('')
        return  `<h3>${type}</h3><div class="typeGroup">${elementsView}</div>` 
    }

    return{
        Pug: function(name, label){
            this.name = name
            if(label){
                this.label = label
            }
            else{
                this.label = name
            }
        }
    }
})()

module.exports = {
    pugs
}