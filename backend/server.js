require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./src/api');

const app = express();

app.use(cors());

// Express middleware that reads request stream and stores it as an accessible javascript object
app.use(bodyParser.json());

// API Routes
app.use("/api", api);

// Initial application startup
const PORT = process.env.PORT || 3000;

// error handler all thrown error are caught here
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

if (require.main === module) {
    app.listen(PORT, () => console.log("Server running on PORT:" + PORT));
}