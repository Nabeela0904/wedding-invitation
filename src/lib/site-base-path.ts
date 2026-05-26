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

/** Main invitation content (event buttons), skipping the envelope entrance. */
export function mainInvitationPath(): string {
  return sitePath("/index.html?view=invitation");
}
