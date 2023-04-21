const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = require("./config/server.config");
const { mongoDbUri } = require("./config/db.config");
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const ticketRoutes = require('./routes/ticket.routes');

app.use(bodyParser.json());

authRoutes(app);
userRoutes(app);
ticketRoutes(app);

mongoose.connect(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

app.use(bodyParser.json());

db.on("error", () => {
    console.log("Error while connecting to data base");
})

db.once("open", () => {
    console.log("Connected to MongoDB Successfully");
})


app.listen(PORT, () => {
    console.log("server is listening to the port: ", PORT);
})

