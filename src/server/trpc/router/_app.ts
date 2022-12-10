import { organizationsRouter } from "./organizations";
import { membershipsRouter } from "./memberships";
import { exampleRouter } from "./example";
import { spacesRouter } from "./spaces";
import { authRouter } from "./auth";
import { router } from "../trpc";

export const appRouter = router({
  organizations: organizationsRouter,
  memberships: membershipsRouter,
  example: exampleRouter,
  spaces: spacesRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
