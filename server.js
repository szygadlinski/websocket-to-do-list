const express = require('express');
const socket = require('socket.io');

const app = express();

const tasks = [];

app.use((req, res) => {
  res.status(404).send('<h1>404 - page not found...</h1>');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000: http://localhost:8000');
});

const io = socket(server);

io.on('connection', socket => {
  socket.emit('updateData', tasks);

  socket.on('addTask', task => {
    tasks.push(task);
    socket.broadcast.emit('addTask', tasks);
  });

  socket.on('removeTask', taskId => {
    tasks.splice(taskId, 1);
    socket.broadcast.emit('removeTask', tasks);
  });
});
