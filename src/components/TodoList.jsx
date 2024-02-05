// src/components/TodoList.jsx

import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleAdd = () => {
    if (input.trim() !== '') {
      if (selectedTodo !== null) {
        // Update existing todo
        const updatedTodos = [...todos];
        updatedTodos[selectedTodo] = input;
        setTodos(updatedTodos);
        setSelectedTodo(null);
      } else {
        // Add new todo
        setTodos([...todos, input]);
      }

      // Clear input after adding/updating
      setInput('');
    }
  };

  const handleUpdate = (index) => {
    setInput(todos[index]);
    setSelectedTodo(index);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleToggle = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = `#${updatedTodos[index]}#`;
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span style={{ color: todo.includes('#') ? 'red' : 'black' }}>
              {todo.replace(/#/g, '')}
            </span>
            <button onClick={() => handleUpdate(index)}>Update</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleToggle(index)}>Toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
