import './App.css';
import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [currentTab, setCurrentTab] = useState('todo');

  const handleAddTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
    setInputValue('');
  };

  const handleToggleCompleted = (index) => {
    const todo = todos[index];
    todo.completed = true;
    setTodos([...todos]);
  };

  const handleTabchange = (tab) => {
    setCurrentTab(tab);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo(inputValue);
      setInputValue('');
    }
  };

  const handleAddButtonClick = () => {
    if (inputValue !== '') {
      handleAddTodo(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.completed);
    const timer = setTimeout(() => {
      setHistory([...history, ...completedTodos]);
      setTodos(todos.filter((todo) => !todo.completed));
    }, 60000);
    return () => clearTimeout(timer);
  }, [todos, history]);

  return (
    <div className='design'>
      <h1>Todo List</h1>

      <div>
        <button onClick={() => handleTabchange('todo')}>Todo</button>
        <button onClick={() => handleTabchange('history')}>History</button>
      </div>

      {currentTab === 'todo' && (
        <div>
          <input
            type="text"
            placeholder='My todos for today '
            value={inputValue}
            onKeyPress={handleKeyPress}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleAddButtonClick}>ADD</button>
        </div>
      )}

      <ul>
        {currentTab === 'todo' &&
          todos.map((todo, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(index)}
              />
              <span>{todo.text}</span>
            </li>
          ))}
      </ul>

      {currentTab === 'history' &&
        history.map((todo, index) => (
          <li key={index}>{todo.text}</li>
        ))}
    </div>
  );
}

export default TodoList;