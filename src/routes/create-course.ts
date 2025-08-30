import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import z from "zod";
import { REPL_MODE_SLOPPY } from "repl";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Create a course",
        description: "This route create a course",
        body: z.object({
          title: z
            .string()
            .min(5, "O título precisa ter no mínimo 5 caracteres"),
        }),

        response: {
          201: z
            .object({ courseId: z.uuid() })
            .describe("Course created succefully"),
        },
      },
    },
    async (request, reply) => {
      const courseTitle = request.body.title;

      const result = await db
        .insert(courses)
        .values({ title: courseTitle })
        .returning();

      return reply.status(201).send({ courseId: result[0].id });
    }
  );
};
