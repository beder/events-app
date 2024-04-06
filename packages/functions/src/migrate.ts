import { ApiHandler } from "sst/node/api";
import { migrate } from "@events-app/core/drizzle/migrate";

export const handler = ApiHandler(async (_event) => {
  await migrate("migrations");

  return {
    body: "Migrations completed",
  };
});
