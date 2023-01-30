const http = require('http');
const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const port = 3000;


const io = new Server(httpServer, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

let messages = [];

app.use(express.json());
app.use(cors());

app.post('/message', (req, res) => {
  messages.push(req.body.message);
  io.emit('message', req.body.message);
  res.sendStatus(200);
});

app.get('/messages', (req, res) => {
  res.send(messages);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log('message: ', message);
    io.emit('message', message);
  });
});

httpServer.listen(port, () => {
  console.log('Server started on http://localhost:3000');
});