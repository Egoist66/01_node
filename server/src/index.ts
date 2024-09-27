import http from 'http'
import fs from 'fs'
import path from 'path'




const __dirname = path.resolve('./')
const PORT: number = 3003

const app = http.createServer((req, res) => {

    if(req.url === '/favicon.ico') {
       
        return
    }

    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.readFile(path.join(__dirname, '/client/index.html'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        res.end(data)

    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

