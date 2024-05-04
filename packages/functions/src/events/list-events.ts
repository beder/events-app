import { json } from "@events-app/core/src/utils/json";
import { listEvents } from "@events-app/core/src/list-events";
import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (apiEvent) => {
  const q = apiEvent.queryStringParameters?.q;

  const events = await listEvents(q);

  return json({
    body: events,
    statusCode: 200,
  });
});
