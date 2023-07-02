const { Socket } = require("dgram")
const express = require("express")
const app = express()

const PORT=5000

const http = require('http').createServer(app)

app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

        // socket


const io = require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('connected...')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})

app.listen(process.evn.PORT || port,()=>console.log(`getting the port ${port}`))
