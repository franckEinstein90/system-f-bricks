"use strict";

const systemFBrick = require('./systemFBrick').systemFBrick
const workspace = require('./ui/workspace').workspace
const systemF = require('./systemF').systemF


jQuery(function($) {

    let $workspace, init
    init = function() {
        try {
            systemF.onReady()
            workspace.onReady($workspace)
            systemFBrick.onReady(workspace, systemF)
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
        systemFBrick.run()
    }

});