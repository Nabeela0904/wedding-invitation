export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function sitePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalized}` || "/";
}

export function assetPath(relativePath: string): string {
  return sitePath(relativePath.startsWith("/") ? relativePath : `/${relativePath}`);
}

export function siteBaseWithSlash(): string {
  if (!siteBasePath) return "/";
  return siteBasePath.endsWith("/") ? siteBasePath : `${siteBasePath}/`;
}

/** Static envelope + main invitation page (not the Next.js app root). */
export function mainInvitationPath(): string {
  return sitePath("/index.html");
}
