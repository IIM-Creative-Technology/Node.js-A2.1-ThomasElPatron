const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thomas:Lemdp123@thomaselpatron.bopfink.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true });

function register(user) {
    client.connect(err => {
      const collection = client.db("test").collection("users");
      collection.insertOne(user, function(err, res) {
        console.log("User registered!");
        client.close();
      });
    });
}

function insertMessage(message) {
    client.connect(err => {
        const collection = client.db("test").collection("messages");
        collection.insertOne(message, function(err, res) {
            console.log("Message inserted!");
            client.close();
        });
    });
}

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

io.on('connection', (socket) => {
    console.log('un utilisateur c connecté')

    socket.on('disconnect', () => {
        console.log('user deconnecté')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        insertMessage({content: msg});
    })
})

app.get('/messages', (req, res) => {
    client.connect(err => {
      const collection = client.db("test").collection("messages");
      collection.find({}).toArray((err, messages) => {
        res.send(messages);
        client.close();
      });
    });
  });
  
server.listen(3000, () => {
    console.log('Port 3000 actif')
})