import React from 'react';

class App extends React.Component {

  render() {
    return (
      <div className="App">

        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-list" id="tasks-list">
            <li className="task">Shopping <button className="btn btn-red">Remove</button></li>
            <li className="task">Go out with a dog <button className="btn btn-red">Remove</button></li>
          </ul>

          <form id="add-task-form">
            <input
              className="text-input"
              id="text-input"
              type="text"
              placeholder="Type your description"
              autoComplete="off"
            />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    )
  }
}

export default App;
