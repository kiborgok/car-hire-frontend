//import Raven from "raven-js";

function init() {
    //Raven configurations
}

function log(error) {
    console.error(error)
    //Raven.captureException(error)
}

let logger = {
    init,
    log
}

export default logger;