import { ApiHandler } from "sst/node/api";
import { deleteEvent } from "@events-app/core/src/delete-event";
import { json } from "@events-app/core/src/utils/json";
import middy from "@middy/core";
import {
  withOwnershipCheck,
  withUserStoredInContext,
} from "@events-app/core/src/middleware";

export const handler = middy()
  .use([withUserStoredInContext(), withOwnershipCheck()])
  .handler(
    ApiHandler(async (apiEvent) => {
      const id = parseInt(apiEvent.pathParameters?.id ?? "");

      const deletedEvent = await deleteEvent(id);

      return json({
        body: deletedEvent,
        statusCode: 200,
      });
    })
  );
