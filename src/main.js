"use strict";

const systemFBricks = require('./systemFBrick').systemFBrick
const workspace = require('./ui/workspace').workspace


jQuery(function($) {

    let $workspace, init

    init = function() {
        try {
            $workspace = $( '#workspace' )
            workspace.onReady($workspace)
//            systemF.onReady()
            systemFBrick.onReady(workspace)
            return true
        } catch (err) {
            systemFBrick.errorHandler({
                err,
                stage: systemFBrick.appStages.init
            })
            return false
        }
    }

    if (init()) {
        try {
            systemFBrick.run()
        }
        catch(err){
            systemFBrick.errorHandler({
                err, 
                stage: systemFBrick.appStages.running
            })
        }
    }
})