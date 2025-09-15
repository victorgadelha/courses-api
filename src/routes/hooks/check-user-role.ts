import type { FastifyRequest, FastifyReply } from "fastify";
import { getAuthenticatedUserFromRequest } from "../../utils/get-authenticated-user-from-request.ts";

// Função que retorna um preHandler do Fastify, checando o role
export function checkUserRole(role: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = getAuthenticatedUserFromRequest(request);

      if (user.role !== role) {
        return reply.status(403).send({ message: "Permissão insuficiente" });
      }
    } catch {
      return reply.status(401).send({ message: "Usuário não autenticado" });
    }
  };
}
