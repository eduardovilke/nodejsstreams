import axios from 'axios'
import { Transform, Writable } from 'stream'

const url = 'http://localhost:3000'

async function consume() {
  const response = await axios({
    url,
    method: 'get',
    responseType: 'stream'
  })

  return response.data
}

const stream = await consume()

stream
  .pipe(
    new Transform({
      transform(chunk, enc, cb) {
        const item = JSON.parse(chunk)
        const myNumber = /\d+/.exec(item.name)[0]
        let name = item.name

        item.name = (myNumber % 2 === 0) ? 
          name.concat(' é par') : 
          name.concat(' é impar')
        
        cb(null, JSON.stringify(item))
      }
    })
  )
  .pipe(
    new Writable({
      write(chunk, enc, cb) {
        console.log(chunk);
        console.log(chunk.toString());
        cb()
      }
    })
  )