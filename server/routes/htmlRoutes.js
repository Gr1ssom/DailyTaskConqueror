const path = require('path');

// need routes for login, homepage, personal account page
// lots of examples to rip off from assignments

module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
