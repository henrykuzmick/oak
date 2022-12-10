import { router, publicProcedure } from "../trpc";

export const organizationsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const memberships = await ctx.prisma.membership.findMany({
      where: { userId: ctx.session?.user?.id },
    });
    return memberships;
  }),
});
