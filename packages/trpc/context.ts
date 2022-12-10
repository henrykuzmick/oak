import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type inferAsyncReturnType } from "@trpc/server";
import { type Session } from "next-auth";
import { prisma } from "db";

import { getServerAuthSession } from "./common";

type CreateContextOptions = {
  session: Session | null;
  organizationSlug?: string;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    organizationSlug: opts.organizationSlug,
    organizationId: "",
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  console.log("create context");
  console.log(req.headers);

  return await createContextInner({
    session,
    organizationSlug: req.headers.organization as string,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
