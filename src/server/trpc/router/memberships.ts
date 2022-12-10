import { router, publicProcedure } from "../trpc";

export const membershipsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.membership.findMany({
      where: { userId: ctx.session?.user?.id },
      include: {
        organization: true,
      },
    });
  }),
});
