import "fastify";
import { AuthUser } from ".";

declare module "fastify" {
  interface FastifyRequest {
    user? : AuthUser
  }
}