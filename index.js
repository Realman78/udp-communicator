const express = require('express')
const WebSocketServer = require('websocket').server;
const http = require('http')
const path = require('path')
const os = require('os')
const cluster = require('cluster')
cluster.schedulingPolicy = cluster.SCHED_RR


if (cluster.isPrimary){
    for (let i = 0; i < os.cpus().length; i++){
        cluster.fork()
    }
}else{
    const app = express()
    app.use(express.static(path.join(__dirname, 'public')))
    const server = http.createServer(app)
    const wss = new WebSocketServer({
        httpServer: server
    })
    
    let connection;
    
    wss.on("request", request => {
        connection = request.accept(null, request.origin)
        connection.on("message", message => {
            console.log(`Received message ${message.utf8Data}`)
        })
    })
    
    app.get('/', (req,res)=>{
        res.sendFile('index.html')
    })
    server.listen(8080)
    
    //udp
    const dgram = require('dgram')
    const socket = dgram.createSocket('udp4')
    
    socket.on('message', (msg,info)=>{
        //console.log(msg.toString())
        if (connection){
            if (msg.toString() == 'right')
                connection.send('right')
            else if (msg.toString() == 'left')
                connection.send('left')
            else if (msg.toString() == 'up')
                connection.send('up')
            else if (msg.toString() == 'down')
                connection.send('down')
            else
                connection.send('change')
        }
        //socket.send('This is the response', 5000, info.address)
    })
    
    socket.bind(5000) 
}
