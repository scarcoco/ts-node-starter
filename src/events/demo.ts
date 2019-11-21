import { EventEmitter, once } from 'events'

class MyEmitter extends EventEmitter {
  private total = 0

  sum(a: number, b: number): number {
    this.total = a + b
    return this.total
  }
}

const emitter = new MyEmitter()

emitter.setMaxListeners(5)
console.log(`EventEmitter max listeners : ${emitter.getMaxListeners()}`)

emitter.on('error', (err) => {
  console.log(err)
})
emitter.on('newListener', (eventName, listener) => {
  console.log('newListener: ', eventName, listener)
})
emitter.on('removeListener', (eventName, listener) => {
  console.log('removeListener: ', eventName, listener)
})
// on
emitter.on('one', (...args) => {
  console.log('on event -> one(1): ', args)
})
emitter.on('one', (...args) => {
  console.log('on event -> one(2): ', args)
})
// once
emitter.once('two', (...args) => {
  console.log('once event -> two: ', args)
})

emitter.emit('one', 1, 2)
emitter.emit('one', 3, 4)

emitter.emit('two', 5, 6)
emitter.emit('two', 7, 8)

async function run(): Promise<any> {
  await once(emitter, 'xxxx').catch((err) => {
    console.log('catch', err)
  })
}
process.nextTick(() => {
  emitter.emit('error', new Error('xxx'))
})
run()

console.log(`event name: ${emitter.eventNames()}`)
