const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thomas:Lemdp123@thomaselpatron.bopfink.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true });

/*const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = loginForm.elements.username.value;
    const password = loginForm.elements.password.value;
});*/

client.connect(err => {
  const db = client.db("test");
  const collection = db.collection("user");
  collection.findOne({ username: username }, function(err, user) {
    if (err) {
      console.log(err);
    } else if (user) {
      if (user.password === password) {
        console.log("L'utilisateur existe dans la base de données.");
        /*window.location = 'index.html';*/
      } else {
        console.log("Mot de passe incorrect.");
      }
    } else {
      console.log("L'utilisateur n'existe pas dans la base de données.");
    }
    client.close();
  });
});