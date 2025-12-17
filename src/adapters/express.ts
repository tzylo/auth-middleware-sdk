import { Request, Response, NextFunction } from "express"
import { verifyAccessToken } from "../verifyToken"

export function authMiddleware(options: { jwtSecret: string }) {
  return function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      })
    }

    const token = authHeader.split(" ")[1]
    const payload = verifyAccessToken(token, options.jwtSecret)

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      })
    }

    req.user = payload as any
    next()
  }
}


import { hasRequiredRole } from "../hasRole"

export function roleMiddleware(requiredRoles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = req.user as any

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      })
    }

    const roles = user.roles

    if (!hasRequiredRole(roles, requiredRoles)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      })
    }

    next()
  }
}