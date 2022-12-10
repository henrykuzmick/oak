import { router, protectedProcedure } from "../trpc";

export const membershipsRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.membership.findMany({
      where: { userId: ctx.session?.user?.id },
      include: {
        organization: true,
      },
    });
  }),
});
