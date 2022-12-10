import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const spacesRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.space.findMany();
  }),
  // create: publicProcedure
  //   .input(
  //     z.object({
  //       name: z.string(),
  //     })
  //   )
  //   .mutation(({ ctx, input }) => {
  //     ctx.prisma.space.create({
  //       data: {
  //         name: input.name,
  //         slug: "dfsd",
  //       },
  //     });
  //   }),
});
