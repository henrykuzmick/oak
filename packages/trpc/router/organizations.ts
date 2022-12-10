import { router, protectedProcedure } from "../trpc";

export const organizationsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const memberships = await ctx.prisma.membership.findMany({
      where: { userId: ctx.session?.user?.id },
    });
    return memberships;
  }),
});
