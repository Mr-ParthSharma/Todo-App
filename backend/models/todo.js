const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    done: Boolean
});

mongoose.model('Todo', todoSchema);
