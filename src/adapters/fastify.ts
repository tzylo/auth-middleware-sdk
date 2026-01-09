import { FastifyRequest, FastifyReply } from "fastify"
import { verifyAccessToken } from "../verifyToken"

export function fastifyAuth(options: { jwtSecret: string }) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      reply.status(401).send({
        success: false,
        message: "Unauthorized",
      })
      return
    }

    const token = authHeader.split(" ")[1]
    const payload = verifyAccessToken(token, options.jwtSecret)

    if (!payload) {
      reply.status(401).send({
        success: false,
        message: "Invalid or expired token",
      })
      return
    }

    request.auth = payload as any
  }
}


import { hasRequiredRole } from "../hasRole"

export function fastifyRole(requiredRoles: string[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = request.auth as any

    if (!user) {
      reply.status(401).send({
        success: false,
        message: "Unauthorized",
      })
      return
    }

    const roles = user.roles

    if (!hasRequiredRole(roles, requiredRoles)) {
      reply.status(403).send({
        success: false,
        message: "Forbidden",
      })
      return
    }
  }
}
