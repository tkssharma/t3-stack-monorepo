import todo from "../models/todo";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

const getTodos = publicProcedure.query(async () => {
  const todos = await todo.find();
  return todos;
});

/**
 * Add new TODO to db
 */
const addTodo = publicProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  )
  .mutation(async ({ input: { title, description } }) => {
    const newTodo = new todo({ title, description });
    const addedTodo = await newTodo.save();
    return addedTodo;
  });

const deleteTodo = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    console.log("input: ", input);
    const deletedTodo = await todo.findByIdAndDelete(input);
    if (!deletedTodo) throw new Error("Todo not found");
    return true;
  });

const toggleTodoStatus = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    try {
      const foundTodo = await todo.findById(input);
      if (!foundTodo) throw new Error("Todo not found");
      foundTodo.done = !foundTodo.done;
      await foundTodo.save();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

export const todosRouter = router({
  get: getTodos,
  add: addTodo,
  delete: deleteTodo,
  toggleTodoStatus,
});
