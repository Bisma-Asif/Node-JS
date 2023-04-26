const http = require ("http");
const fs = require ("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "data.text");
const server = http.createServer((req , res)=>{
      if (req.url === "/"){
        res.write("Hello world");
        res.end();
      }else if (req.url === "/form"){
        res.setHeader("content-type", "text/html")
        res.write("<form action='/submit' method='POST'><input name='data'/> <button>Submit</button></form>");
        res.end();
      }else if (req.url === "/submit"){
        let data = "";
       req.on("data" , chunk => data+=chunk);
       req.on("end",()=> {
        fs.readFile(filePath, "utf8" ,(err , filData) => {
          const newData = filData + "\n" + data ;
          fs.writeFile(filePath,newData, ()=>{
            res.write("Data Recieved");
            res.end();
          })
        })
       
       })
       
      }
      else{
        res.write("404 -NOT FOUND");
        res.end();
      }
});

server.listen(3000);
