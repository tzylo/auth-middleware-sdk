import { verify } from "jsonwebtoken"

export function verifyAccessToken(token: string, secret: string) {
  try {
    return verify(token, secret)
  } catch {
    return null
  }
}
