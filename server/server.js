const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Todo = require('./models/Todo');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post('/todo/new', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save();

  res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.get('/todo/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.completed = !todo.completed;

  todo.save();

  res.json(todo);
});

mongoose.connect(process.env.PORT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
.catch(console.error);


app.listen(3001, () => console.log(`Server Running on PORT 3001`));