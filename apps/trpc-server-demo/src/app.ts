import express, { Router as ExpressRouter } from "express";
import * as trpcExpressAdpater from "@trpc/server/adapters/express";
import { createContext, router } from "./trpc";
import { todosRouter } from "./routes";
import cors from "cors";

const expressRouter = ExpressRouter();

const app = express();

const appRouter = router({
  todo: todosRouter,
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  "/trpc",
  trpcExpressAdpater.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use(expressRouter);

export type AppRouter = typeof appRouter;

export default app;
