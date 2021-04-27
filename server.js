const express = require('express');
const cors = require('cors');
const socket = require('socket.io');

const app = express();

const tasks = [];

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use((req, res) => {
  res.status(404).send('<h1>404 - page not found...</h1>');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000: http://localhost:8000');
});

const io = socket(server);

io.on('connection', socket => {
  socket.emit('updateData', tasks);

  socket.on('addTask', taskName => {
    tasks.push(taskName);
    socket.broadcast.emit('addTask', taskName);
  });

  socket.on('removeTask', taskIndex => {
    tasks.splice(taskIndex, 1);
    socket.broadcast.emit('removeTask', taskIndex);
  });
});
