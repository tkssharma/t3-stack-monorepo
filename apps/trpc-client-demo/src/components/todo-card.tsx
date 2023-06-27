import React from 'react'

function TodoCard({ todo }: any) {

  return (
    <div className='border-amber-200 border-2 rounded-md p-3'>
      <div className='pb-3'>
        <h2 className='font-bold text-lg text-center'>{todo.title}</h2>
        <p className='p-2'>{todo.description}</p>
      </div>
    </div>
  )
}

export default TodoCard