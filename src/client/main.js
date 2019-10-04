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
            app.onReady(workspace, systemF)
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
            setInterval( app.onRun, 500)
        }

        catch(err){
            app.errorHandler({
                err, 
                stage: app.appStages.running
            })
        }
    }
    
})
