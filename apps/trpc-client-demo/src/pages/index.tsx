import React from "react";
import TodoForm from "../components/todo-form";
import TodoList from "../components/todo-list";


export default function Index(){
  return (
    <div className="">
    <h1 className='text-white text-2xl text-center'>Your Todos</h1>
      <TodoForm />
      <TodoList />
    </div>
  )
}