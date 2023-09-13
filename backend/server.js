const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");


const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
dotenv.config()



require('./models/todo');

mongoose.set('strictQuery', false);

app.use(require('./routes'));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
    app.listen(4000, () => {
    console.log("Server is running on port 4000");
})
})
.catch( (error) => {
    console.log(error);
});
