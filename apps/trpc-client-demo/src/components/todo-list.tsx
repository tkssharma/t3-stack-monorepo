import React from 'react'
import { trpc } from '../../utils/trpc'
import TodoCard from "./todo-card";

function TodoList(){
  const {data, isError, isLoading, error} = trpc.todo.get.useQuery();

  if(isLoading) return <div>Loading ...</div>
  if (isError) return <div>{error.message}</div>
  return (
    <div className='grid gap-5'>
        {(data || []).map((todo: any) => {
           return (<TodoCard key={todo._id} todo={todo}></TodoCard>)
        })
        }
    </div>
  )
}
export default TodoList;