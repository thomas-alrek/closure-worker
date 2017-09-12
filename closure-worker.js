const encoding = 'UTF-8'
const regex = /[ \t]?return (.+);?/g;
const type = `text/javascript;charset=${encoding}`

/**
 * Compiles a Object URL from a function
 * 
 * @param function fn A function to compile. Arguments will be removed
 * @param object inject Variables to inject into the function
 * @return DOMString
 */
const compile = (fn, inject = {}) => {
    fn = fn.toString()
    let start = fn.indexOf('{') + 1
    let end = fn.lastIndexOf('}')
    fn = fn.substring(start, end).trim()
    let vars = ''
    for (let arg of Object.keys(inject)) {
        let val = inject[arg]
        val = JSON.stringify(val)
        vars += `let ${arg} = ${val}\n`
    }
    fn = `${vars}\n${fn}`
    let blob = new Blob([fn], { encoding, type })
    return URL.createObjectURL(blob)
}

/**
 * Extended WebWorker that works with closures
 */
class ClosureWorker extends Worker {

    /**
     * Instantiate ClosureWorker
     * 
     * @param function closure The function to run as a WebWorker
     * @param function handler onmessage handler
     * @param object inject Variables to inject
     */
    constructor (closure, handler, inject = {}) {
        super(compile(closure, inject))
        this.onmessage = handler
    }
}
