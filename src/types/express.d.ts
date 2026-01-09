import "express";
import { AuthUser } from ".";

declare module "express" {
  interface Request {
    auth? : AuthUser
  }
}