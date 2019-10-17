"use strict";

const app = require('../../app').app
const brickStatusCodes = require('./bricks').brickStatusCodes
const bricks = require('./bricks').bricks

const managedBricks = (function() {
    let _managedBricks = new Map()

    return {
        manageBrick: function(brick){
            _managedBricks.set(brick.htmlID, brick)
        },
        includes: function({htmlID}){
            return _managedBricks.has(htmlID)
        },
        get: function({htmlID}){
            return _managedBricks.get(htmlID)
        },

        filter: function(predFunc) {
            let brickIterator = _managedBricks.values()
            let resultArray = []
            let brPtr = brickIterator.next()
            while (!brPtr.done) {
                if (predFunc(brPtr.value)) {
                    resultArray.push(brPtr.value)
                }
                brPtr = brickIterator.next()
            }
            return resultArray
        }
    }
})()

const workspace = (function() {

    let $workspace,
        brickStatus,
        initEventListeners, onReceiveObject, onHover, onObjectExit, 
        pugPanel,
        typeBrickGenerator, connectorBrickGenerator, pugBrickGenerator

    
    onHover = function(event, ui) {
        let $hoverObject = ui.draggable
        let htmlID = ui.draggable.attr('id')
        if(managedBricks.includes({htmlID})){
            let brick = managedBricks.get({htmlID})
            if(!brick.inWorkspace()){

            }
        }
        workspace.dirtyBit = true; 
    }, 
                
    onObjectExit = function(event, ui){
        let htmlID = ui.draggable.attr('id')
        let brick = managedBricks.get({ htmlID })
        brick -= brickStatusCodes.inWorkspace
        workspace.dirtyBit = true;  
    }, 
        
    onReceiveObject = function(event, ui) {
        let $droppedObject = ui.draggable
        let htmlID = ui.draggable.attr('id')
        let statusMsg
        if (htmlID === undefined) {
            statusMsg = "dropped unknown object"
        } else {
            statusMsg = "dropped " + htmlID
            if (managedBricks.includes({
                    htmlID
                })) {
                statusMsg += " which is managed"
                let brick = managedBricks.get({
                    htmlID
                })
                if (!brick.inWorkspace()) { //add brick to workspace
                    brick.state += brickStatusCodes.inWorkspace
                    workspace.makeTypeBrickGenerator(brick.type)
                    $droppedObject.detach()
                    $workspace.append($droppedObject)
                }
            }
        }
        workspace.dirtyBit = true;
    }

    initEventListeners = function() {

        $workspace.droppable({

            drop: function(event, ui) {
                $(this).removeClass('active')
                onReceiveObject(event, ui)
            },

            out: function(event, ui) {
                $(this).removeClass('active')
                onObjectExit(event, ui)
            },

            over: function(event, ui) {
                $(this).addClass('active')
                onHover(event, ui)
            }
        })
    }

    pugPanel = function(pug) {
        let pugBricks = [1, 2, 3, 4, 5, 6, 7]
            .map(count => pugBrick(pug, count))
            .join('')

        return [`<div id='${pug.name}' class="pugs">`,
            pugBricks `</div>`
        ].join('')
    }


    return {

        dirtyBit: true,  

        onReady: function(workspace) {
            $workspace = workspace
            initEventListeners()
        },

        bricks: managedBricks, 

        makePugBricksGenerator: function(ty) {

            this.counter = this.counter || new app.appUtils.StringRegistrar()

            let createAndManageNewPugBrick = function(pug, elementIndex) {
                let newPugBrick = new bricks.PugBrick(ty, pug, elementIndex)
                managedBricks.manageBrick(newPugBrick)
                newPugBrick.state = brickStatusCodes.rendered
                return newPugBrick.html()
            }

            let htmlCode = ""
            ty.pugs.map(pug => {
                if (this.counter.missing(pug.name)) {
                    this.counter.add(pug.name, {
                        count: 1
                    });
                }
                for (let i = 0; i < 1; i++) {
                    let idSuffix = this.counter.get(pug.name).count;
                    this.counter.get(pug.name).count += 1;
                    htmlCode += createAndManageNewPugBrick(pug, idSuffix);
                }
            })
            return htmlCode
        },

        makeTypeBrickGenerator: function(type) {

            let createAndManageNewTypeBrick = function(idIndex) {
                let newBrick = new bricks.TypeBrick({
                    type: type,
                    htmlIdIndex: idIndex
                })
                managedBricks.manageBrick(newBrick)
                newBrick.state = brickStatusCodes.rendered
                return newBrick.html()
            }
            //counter, keeps track of the number of bricks
            //created of each differnt types
            this.brickRegister = this.brickRegister || new app.appUtils.StringRegistrar()
            if (this.brickRegister.missing(type.alias)) {
                this.brickRegister.add(type.alias, {
                    count: 1
                })
            }

            let idIndex = this.brickRegister.get(type.alias).count
            let $generatorContainer = $('#' + type.alias)
            $generatorContainer.prepend(createAndManageNewTypeBrick(idIndex))
            this.brickRegister.get(type.alias).count += 1
            $('.brick').draggable();

        }
    }
})()

module.exports = {
    workspace
}
