const express = require("express");
const path = require("path");
const app = express()
const http = require('http');
const port = process.env.PORT || 4000
const server = http.createServer(app);
const io = require("socket.io")(server)



app.use(express.static(path.join(__dirname,"public")))
app.set("views", path.join(__dirname,"public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.use("/",(req,res)=>{
    res.render("index.html")
})



let mensagens = []
io.on("connection",(socket)=>{
    console.log(socket.id)
    socket.emit("mensagensAnteriores",mensagens)
    socket.on("msg", (data)=>{
        mensagens.push(data)
        socket.broadcast.emit("mensagemRecebida", data)
    })

   
})
server.listen(port);