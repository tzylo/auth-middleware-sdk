export interface AuthUser {
  authId: string
  email: string
  isVerified?: boolean
  role?: string
}

export interface AuthRequest {
  user?: AuthUser
}
