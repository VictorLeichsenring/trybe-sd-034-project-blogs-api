const express = require('express');
const {
  userController,
} = require('./controllers');

// ...
// comentário para commit
const app = express();
app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.post('/login', userController.login);


// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
