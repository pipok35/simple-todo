import React from 'react'
import '../App.css'

function TodoList({ todos, deleteTodo }) {
  return (
    <>
      {todos.map((todoItem, index) => {
        return (
          <div className='p-10 item-container' key={todoItem.id}>
            <li className='list-item pos-r'>
              {todoItem.title}
              <button
                className='del-btn'
                onClick={() => deleteTodo(todoItem.id)}
              >
                <i className='bi bi-trash-fill'></i>
              </button>
            </li>
          </div>
        )
      })}
    </>
  )
}

export default TodoList
