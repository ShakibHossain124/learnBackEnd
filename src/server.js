import http from 'http'
import fs from 'fs'
import path from 'path'

const server = http.createServer((req,res)=>{
    const filePath = path.join(process.cwd(),"src/index.html")
    fs.readFile(filePath, (err,data)=>{
        if(err){
            res.writeHead(500,{"content-type":"text/plain"})
            res.end("error loading index.html")
        }
        else{
            res.writeHead(200,{"content-type":"text/html"})
            res.end(data)
        }

    })
    
})

server.listen(8000, ()=> console.log("Server is running on port 8000"))