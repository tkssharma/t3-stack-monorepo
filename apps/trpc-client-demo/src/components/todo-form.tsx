import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { trpc } from '../../utils/trpc'

const initialState = {
  title: "",
  description: ""
}

function TodoForm() {
  const [todo, setTodo] = useState(initialState)
  const addTodo = trpc.todo.add.useMutation()
  const utils = trpc.useContext()
  const titleRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTodo({ ...todo, [e.target.name]: e.target.value })


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo.mutate(todo, {
      onSuccess: () => {
        utils.todo.get.invalidate() // Refetch after add a new todo
        setTodo(initialState)
        titleRef.current?.focus()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-5 rounded-lg text-center">
      <input
        type="text"
        placeholder='Title'
        name='title'
        onChange={handleChange}
        value={todo.title}
        ref={titleRef}
        autoFocus
        className='bg-neutral-800 px-3 py-2 block w-full rounded-md mb-3 text-white'
      />

      <textarea
        placeholder="Description"
        name="description"
        onChange={handleChange}
        value={todo.description}
        rows={3}
        className='bg-neutral-800 px-3 py-2 block w-full rounded-md mb-3 text-white'
      />

      <button className='px-3 py-2 rounded-md border-2 text-white w-full'>Save</button>

    </form>
  )
}

export default TodoForm