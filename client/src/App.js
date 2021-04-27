import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {
  state = {
    tasks: [],
    taskName: '',
  }

  componentDidMount() {
    this.socket = io.connect('http://localhost:8000', {
      transports: ['websocket'],
    });

    this.socket.on('addTask', event => this.addTask(event));
    this.socket.on('removeTask', event => this.removeTask(event));
    this.socket.on('updateData', event => this.updateTasks(event));
  }

  updateTasks = newTasks => {
    this.setState({ tasks: newTasks });
  }

  addTask = task => {
    let newTasks = this.state.tasks;
    if (!task || !task.trim()) {
      alert('You have to type something first!');
    } else if (newTasks.includes(task)) {
      alert('Your task is already on the list!');
    } else {
      newTasks.push(task);
      this.setState({ tasks: newTasks })
    }
  }

  removeTask = (index, localRemoval) => {
    let newTasks = [];
    for(let task of this.state.tasks){
      if(this.state.tasks.indexOf(task) !== index) newTasks.push(task)
    }
    this.setState({ tasks: newTasks });
    if(localRemoval) this.socket.emit('removeTask', index)
  }

  submitForm = event => {
    event.preventDefault();
    this.addTask(this.state.taskName);
    this.socket.emit('addTask', this.state.taskName)
    this.setState({ taskName: '' });
  }

  render() {
    const { tasks, taskName } = this.state;

    return (
      <div className="App">
        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-list" id="tasks-list">
            {tasks.map(task => (
              <li className="task" key={tasks.indexOf(task)}>
                {task}
                <button
                  className="btn btn-red"
                  onClick={localRemoval => this.removeTask(tasks.indexOf(task), localRemoval)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <form id="add-task-form" onSubmit={event => this.submitForm(event)}>
            <input
              className="text-input"
              id="text-input"
              type="text"
              placeholder="Type your description"
              autoComplete="off"
              value={taskName}
              onChange={event => this.setState({ taskName: event.target.value })}
            />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    )
  }
}

export default App;
