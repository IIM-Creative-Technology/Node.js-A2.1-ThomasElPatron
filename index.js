const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
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
    res.send('Page d\'accueil');
});

app.get('/register', (req, res) => res.sendFile(__dirname + '/public/register.html'))

app.get('/login', (req, res) => res.sendFile(__dirname + '/public/login.html'))

server.listen(3000, () => {
    console.log('Port 3000 actif')
})