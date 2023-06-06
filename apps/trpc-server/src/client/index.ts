import { httpBatchLink, createTRPCProxyClient } from "@trpc/client";
import type { AppRouter } from "../index";
import "./polyfill";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
  transformer: undefined,
});

async function main() {
  const userData = await trpc.userList.query();

  console.log(userData);

  await trpc.userCreate.mutate({ name: "tkssharma" });
  await trpc.userCreate.mutate({ name: "tkssharma" });
  await trpc.userCreate.mutate({ name: "tkssharma" });

  const userCreateData = await trpc.userCreate.mutate({ name: "tkssharma" });

  console.log(userCreateData);

  const list = await trpc.userList.query();
  console.log(list);
}

main().catch(console.error);
