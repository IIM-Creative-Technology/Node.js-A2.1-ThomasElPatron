<h1>ThomasElPatron</h1>

<p>ThomasElPatron is a real-time messaging application. It uses the Express framework to handle HTTP requests and the Socket.io library for real-time communication between client and server. The server receives incoming messages via an HTTP POST request and saves them in an array. The messages can be retrieved by the client via an HTTP GET request. The client and server communicate via the Socket.io library, which allows for real-time updates of the message array. The server runs on port 3000 and logs a message to the console when a user connects.</p>

Import the project in your document: -> git init -> git clone git@github.com:IIM-Creative-Technology/Node.js-A2.1-ThomasElPatron.git

<h2>Documentation:</h2>

POST /message:
This route accepts a JSON payload containing a message key in the request body. It pushes the message to the messages array and emits the message to all connected clients using Socket.IO.

GET /messages:
This route returns the entire messages array as a response.

<h2>Travail réalisé:</h2>
Thomas: Chat fonctionnel, README (présentation, documentation), PowerPoint.<br>
Marvin: Work on the login/register and assist for the routes.<br>
Martin: Work on the register/login.br>
Quentin: Work on the game.<br>
Antoine: Work on the game.






  
