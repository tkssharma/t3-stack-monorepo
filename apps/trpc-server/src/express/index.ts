const express = require("express");
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./router";

const app = express();

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`app server started on port ${process.env.PORT || 3000}`);
});

export type AppRouter = typeof appRouter;
