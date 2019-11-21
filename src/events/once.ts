import { EventEmitter, once } from 'events'

const emitter = new EventEmitter()

async function run(): Promise<any> {
  try {
    const data = await once(emitter, 'hello')
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
run()

emitter.emit('hello', 1, 2)

// process.nextTick(() => {
//   emitter.emit('error', new Error('hello error'))
// })
