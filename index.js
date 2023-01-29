const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thomas:Lemdp123@thomaselpatron.bopfink.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/login.html`)
})

io.on('connection', (socket) =>{
console.log('un utilisateur c connecté')

socket.on('disconnect', () => {
    console.log('user deconnecté')
})

socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
})
})

app.get('/', (req, res) => {
    res.send("Page d'accueil");
});

app.get('/register', (req, res) => res.sendFile(__dirname + '/public/register.html'))

app.get('/login', (req, res) => res.sendFile(__dirname + '/public/login.html'))

const userSchema = new mongoose.Schema({
username: String,
email: String,
password: String
});
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', (req, res) => {
const user = new User({
username: req.body.username,
email: req.body.email,
password: req.body.password
});
user.save((err) => {
if (err) {
console.log("finito")
} else {
// rediriger vers une page de confirmation
res.redirect('/');
}
});

if (req.method === 'POST' && req.url === '/login') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello World!' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }


});

server.listen(3000, () => {
console.log('Port 3000 actif')
})