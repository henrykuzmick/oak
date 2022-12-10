import { z } from "zod";
import { router, orgProcedure } from "../trpc";

export const spacesRouter = router({
  getAll: orgProcedure.query(({ ctx }) => {
    return ctx.prisma.space.findMany({
      where: {
        organizationId: ctx.organizationId,
      },
    });
  }),
  create: orgProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.space.create({
        data: {
          organizationId: ctx.organizationId,
          name: input.name,
          slug: "dfsd",
        },
      });

      return res;
    }),
});
