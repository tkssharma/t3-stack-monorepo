import { router, publicProcedure } from "../trpc";

export const appRouter = router({
  sayHello: publicProcedure.query(() => {
    return "Hello tRPC";
  }),
  log: publicProcedure
    .input((input) => {
      if (typeof input === "string") return input;
      throw new Error("Invalid Input");
    })
    .mutation((req) => {
      console.log(req.input);
      return `trpc Hello with ${req.input}`;
    }),
});
