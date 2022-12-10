import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next, ...rest }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

const isAuthedWithOrganization = t.middleware(
  async ({ ctx, next, ...rest }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (!ctx.organization) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No Organization Selected",
      });
    }

    const organization = await ctx.prisma.organization.findUnique({
      where: {
        slug: ctx.organization,
      },
      include: {
        memberships: true,
      },
    });

    if (!organization) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid Organization",
      });
    }

    const validMembership = organization.memberships.find(
      (mem) => mem.userId === ctx.session?.user?.id
    );

    if (!validMembership) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid Organization",
      });
    }

    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
        organization: ctx.organization,
      },
    });
  }
);

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);

export const orgProcedure = t.procedure.use(isAuthedWithOrganization);
