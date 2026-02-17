export function checkAdminRole(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return false;

  const authMatch = cookieHeader.match(/auth=([^;]+)/);
  if (!authMatch) return false;

  try {
    const auth = JSON.parse(decodeURIComponent(authMatch[1]));
    const userRole = auth.role;
    return userRole === 'admin';
  } catch {
    return false;
  }
}
