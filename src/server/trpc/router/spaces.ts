import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const spacesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
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
