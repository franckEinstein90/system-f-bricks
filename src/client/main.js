"use strict";

const app = require('../app').app
const workspace = require('./ui/workspace').workspace

const systemF = require('./systemF').systemF
const context = require('./programs/context').context

const bricks = require('./ui/bricks.js').bricks

jQuery(function($) {

    let $workspace, init

    init = function() {
        try {
            console.log("Application Start")
            $workspace = $( '#workspace' )
            workspace.onReady($workspace)
            systemF.onReady(context)
            app.onReady(workspace, systemF, bricks)
            return true
        } catch (err) {
           app.errorHandler({
                err,
                stage: app.appStages.init
            })
            return false
        }
    }

    if (init()) {
        try {
            app.run()
        }
        catch(err){
            app.errorHandler({
                err, 
                stage: app.appStages.running
            })
        }
    }
    
})