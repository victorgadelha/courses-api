import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { makeCourse } from "../tests/factories/make-course.ts";
import { randomUUID } from "node:crypto";

test("Create a course", async () => {
  await server.ready();

  const course = await makeCourse();

  const response = await request(server.server).get(`/courses/${course.id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test("Return 404 for non existing courses", async () => {
  await server.ready();

  const response = await request(server.server).get(`/courses/${randomUUID}`);

  expect(response.status).toEqual(404);
});
