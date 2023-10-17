import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const noteRouter = createTRPCRouter({
    getAll: protectedProcedure
        .input(z.object( {topicId: z.string()} ))
        .query(({ctx, input}) => {
            return ctx.db.note.findMany({
                where: {
                    topicId: input.topicId
                }
            })
        }),
    createNote: protectedProcedure
        .input(z.object({ title: z.string(), content: z.string(), topicId: z.string() }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.note.create({
                data: {
                    title: input.title,
                    content: input.content,
                    topicId: input.topicId
                }
            })
        }),
    deleteNote: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async({ctx, input}) => {
            return ctx.db.note.delete({
                where: {
                    id: input.id
                }
            })
        })
})