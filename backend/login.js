

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = loginForm.elements.username.value;
    const password = loginForm.elements.password.value;

    const data = {username, password};

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch('/login', options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur de connexion');
            }
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            //Redirection vers la page demandée
            window.location = 'index.html';
        })
        .catch(error => {
            console.error(error);
        });
});

