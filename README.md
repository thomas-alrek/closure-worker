# ClosureWorker

ClosureWorker is a small extension of WebWorker that allows you to define a worker function inline instead of as a separate url.

It works by "compiling" the passed function, and injecting variables.
This get's turned into a Blob and then a Object URL which can be passed to a native WebWorker.

Tested on latest version of Google Chrome and Safari.

[Live demo](https://cdn.rawgit.com/thomas-alrek/closure-worker/0fde652b/index.html)

### Installation

```
yarn add closure-worker
```

```
npm install closure-worker
```

### Example

```javascript
const blocking = (n) => {
    let sum = 0
    for (let i = 0; i < n; i++) {
        sum += Math.pow(Math.random() * Math.PI, 2)
    }
    // return sum
    postMessage(sum)
}

const handler = (msg) => {
    console.log(`Worker completed, result: ${msg.data}`)
}

let worker = new ClosureWorker(blocking, handler, { n: 1000000 })
```
