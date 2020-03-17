const express = require('express');

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));

const AppRouting = myApp => {
    const BookController = require('./controllers/BookController');
    // GET
    myApp.get("/api", BookController.getAbout);
    myApp.get("/api/books", BookController.getAll);
    myApp.get("/api/books/:keyword", BookController.getBooks);
    // POST
    // PUT
}

AppRouting(app);

// Server
const port = 8000;
app.listen(port, () => console.log(`bd2011-web server is up and listening on port ${port}`));