"use strict";

const app = require('../app').app
const workspace = require('./ui/workspace').workspace
const systemF = require('./systemF').systemF


jQuery(function($) {

    let $workspace, init

    init = function() {
        try {

            console.log("Application Start")
            $workspace = $( '#workspace' )
            workspace.onReady($workspace)
            systemFBrick.onReady(workspace)
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
            app.onRun()
        }
        catch(err){
            app.errorHandler({
                err, 
                stage: app.appStages.running
            })
        }
    }
    
})
