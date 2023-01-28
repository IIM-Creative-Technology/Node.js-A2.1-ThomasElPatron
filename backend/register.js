const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const tokenSchema = new mongoose.Schema({
    userId: String,
    token: String
});


const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = registerForm.elements.username.value;
    const email = registerForm.elements.email.value;
    const password = registerForm.elements.password.value;

    const data = {username, email, password};

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch('/register', options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur d\'inscription');
            }
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            //Redirection vers la page demandée
            window.location = '/dashboard';
        })
        .catch(error => {
            console.error(error);
        });
});


app.post('/login', (req, res) => {
    // Récupérer les données de connexion de la requête
    const { username, password } = req.body;

    // Vérifiez si un utilisateur avec ce nom d'utilisateur existe dans la base de données
    User.findOne({username: username}, (err, user) => {
        if (err) return res.status(500).send({error: 'Erreur de base de données'});
        if (!user) return res.status(404).send({error: 'Utilisateur non trouvé'});

        // Compare le mot de passe envoyé avec celui stocké dans la base de données
        bcrypt.compare(password, user.password, (err, same) => {
            if (err) return res.status(500).send({error: 'Erreur de cryptage'});
            if (!same) return res.status(401).send({error: 'Mot de passe incorrect'});

            // Génère un jeton d'accès pour l'utilisateur
            const token = jwt.sign({userId: user._id}, 'secretkey', {expiresIn: '24h'});

            // Enregistre le jeton dans la collection de jetons d'accès
            const newToken = new Token({userId: user._id, token: token});
            newToken.save((err) => {
                if (err) return res.status(500).send({error: 'Erreur de sauvegarde de jeton'});
                // Renvoie le jeton au client
                res.send({token: token});
            });
        });
    });
});
