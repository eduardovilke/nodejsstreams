import { randomUUID } from 'crypto'
import http from 'http'
import { Readable } from 'stream'

function handler(request, response){
  const readable = new Readable({
    read() {
      for (let i = 0; i <= 99; i++) {
        const data = {
          id: randomUUID(),
          name: `Eduardo-${i}`
        }
        this.push(JSON.stringify(data) + "\n")
      }
      // para informar que os dados acabaram
      this.push(null)
    }
  })
  readable.pipe(response)
}

http.createServer(handler)
  .listen(3000)
  .on('listening', () => console.log('Server running at 3000 🚀'))