import http from 'http'
//import fs from 'fs' callback style
import fs from 'fs/promises'
import path, { dirname } from 'path'
import url from 'url'

const PORT = process.env.PORT

const server = http.createServer(async (req,res)=>{
    try{
        if(req.method==="GET")
        {
            //const filePath = path.join(process.cwd(),"src",req.url === "/" || req.url.toLowerCase() === "/home"?"index.html":req.url) //relative path

            const __filename = url.fileURLToPath(import.meta.url)
            const __dirname = path.dirname(__filename)
            let filePath = path.join(__dirname, req.url === "/" || req.url.toLowerCase() === "/home" ? "index.html":req.url) //static path

            console.log(filePath)
            /* fs.readFile(filePath, (err,data)=>{
            if(err){
                res.writeHead(404,{"content-type":"text/plain"})
                res.end("error loading index.html")
            }
            else{
                res.writeHead(200,{"content-type":"text/html"})
                res.end(data)
            }

            }); */ // older method... call back style

            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
                ".html": "text/html",
                ".css": "text/css",
                ".js": "text/javascript",
                ".json": "application/json",
                ".png": "image/png",
                ".jpg": "image/jpeg"
            };

            try{
                const data = await fs.readFile(filePath)
                res.writeHead(200,{"content-type": mimeTypes[ext] || "text/plain"})
                res.end(data)
            }catch(e){
                console.log(e)
                res.writeHead(404,{"content-type": mimeTypes[ext] || "text/plain"})
                res.end("File not found")
            }

        }
        else
        {
            throw new Error("Not a valid method")
        }

    }catch(e)
    {
        console.log(e);
    }
    
})

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))