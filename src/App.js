import './App.css'
import React from 'react'
import axios from 'axios'

import TodoList from './components/TodoList'

function App() {
  const [todo, setTodo] = React.useState('')
  const [todoList, setTodoList] = React.useState([])

  const changeHandler = (e) => {
    setTodo(e.target.value)
  }

  const getTodos = async () => {
    try {
      await axios
        .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then((response) => setTodoList(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getTodos()
  }, [])

  const createNewTodo = async () => {
    try {
      await axios
        .post('https://jsonplaceholder.typicode.com/todos', { text: todo })
        .then((response) => {
          setTodo('')
          const newArr = (prev) => [...prev, response.data]
          setTodoList(newArr)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      setTodoList(todoList.filter((todoItem) => id !== todoItem.id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <div className='row main-content mt-50'>
        <div className='col-md p-0'>
          <div className='shapka p-15 mb-15'>Список задач</div>
          <div className='input-group align-center p-20'>
            <input
              type='text'
              className='form-control'
              value={todo}
              onChange={changeHandler}
              placeholder='Введите задачу'
              aria-label="Recipient's username"
              aria-describedby='button-addon2'
            />
            <button
              className='btn brown btn-secondary'
              onClick={createNewTodo}
              type='button'
              id='button-addon2'
            >
              Добавить
            </button>
          </div>
          <div className='pr-30 pl-30 pb-30'>
            <ul className='p-0 m-0'>
              <TodoList todos={todoList} deleteTodo={deleteTodo} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
