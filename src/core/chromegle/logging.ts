export const Logger = {

    ERROR: (module: string, message: string, ...formatting: any[]) => {
        log(LogLevel.ERROR, module, message, ...formatting)
    },

    INFO: (module: string, message: string, ...formatting: any[]) => {
        log(LogLevel.INFO, module, message, ...formatting)
    },

    DEBUG: (module: string, message: string, ...formatting: any[]) => {
        log(LogLevel.DEBUG, module, message, ...formatting)
    },

    WARNING: (module: string, message: string, ...formatting: any[]) => {
        log(LogLevel.WARNING, module, message, ...formatting)
    },


}

function stringInterpolation(input: string, formatting: string[]) {
    const _r = function (p: string, c: string) {
        return p.replace(/%s/, c);
    }
    return formatting.reduce(_r, input);
}

function log(logLevel: { label: string, color: string }, module: string, message: string, ...formatting: any[]) {
    console.log(`%c[${logLevel["label"]}] (Chromegle<${module}>) ${stringInterpolation(message, formatting)}`, `color: ${logLevel["color"]};`)
}


const LogLevel = {
    INFO: {
        "label": "INFO",
        "color": "#ceaa07"
    },
    ERROR: {
        "label": "ERROR",
        "color": "#ff0000"
    },
    DEBUG: {
        "label": "DEBUG",
        "color": "#158a39"
    },
    WARNING: {
        "label": "WARN",
        "color": "#bd7000"
    }
}



