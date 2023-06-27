import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../../trpc-server-demo/src/app";

export const trpc = createTRPCReact<AppRouter>();
