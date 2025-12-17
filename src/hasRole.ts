export function hasRequiredRole(
  userRoles: string[] | undefined,
  requiredRoles: string[]
): boolean {
  if (!userRoles || userRoles.length === 0) return false
  return requiredRoles.some(role => userRoles.includes(role))
}
