import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box } from '@material-ui/core';
import AddToDo from './components/addTodo';
import ToDoItem from './components/toDoItem';
import NavBar from './components/navBar';

const App = () => {
  const initialTodos = [
    { id: 1, name: 'Go to the supermarket', complete: false },
    { id: 2, name: 'Call Alice', complete: false },
    { id: 3, name: 'Ask Alice to call Bob', complete: false },
    { id: 4, name: 'Do the dishes', complete: false },
    { id: 5, name: 'Change car tyres', complete: false },
  ];

  const [newTodo, setnewTodo] = useState({ id: null, name: '', complete: false });
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.get('/api/todos/');
      setTodos(response.data);
    }
    fetchData();
  }, []);

  const generateNewId = () => {
    return todos.length + 1;
  };

  function emptyFields() {
    return setnewTodo({
      id: null,
      name: '',
      complete: false,
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setTodos(todos.concat(newTodo));
    emptyFields();
  };

  const onClick = (id) => {
    const todo = todos.find((n) => n.id === id);
    const changedtodo = { ...todo, complete: !todo.complete };
    const filteredtodo = todos.filter((n) => n !== todo);
    setTodos(filteredtodo.concat(changedtodo));
  };

  const onChange = (event) => {
    setnewTodo({ ...newTodo, name: event.target.value, id: generateNewId() });
  };

  const onRemoveClick = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <Box>
          <AddToDo
            onSubmit={onSubmit}
            newTodo={newTodo}
            onInputChange={onChange}
            emptyFields={emptyFields}
          />
          {todos.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} onClick={onClick} onRemoveClick={onRemoveClick} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default App;
