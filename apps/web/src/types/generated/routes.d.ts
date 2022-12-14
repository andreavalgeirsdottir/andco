// IMPORTANT! This file is autogenerated by the `type-safe-next-routes` 
// package. You should _not_ update these types manually...

declare module "next-type-safe-routes" {
  type Query = { [key: string]: any };
  export type TypeSafePage = "" | { route: "", path?: string, query?: Query } | "/server-sitemap.xml" | { route: "/server-sitemap.xml", query?: Query } | "/test" | { route: "/test", query?: Query };
  export type TypeSafeApiRoute = "/api/exit-preview" | { route: "/api/exit-preview", query?: Query } | "/api/preview" | { route: "/api/preview", query?: Query } | "/api/revalidate" | { route: "/api/revalidate", query?: Query } | "/api/v1/endpoint" | { route: "/api/v1/endpoint", query?: Query } | "/api/v1/search" | { route: "/api/v1/search", query?: Query };
  export const getPathname: (typeSafeUrl: TypeSafePage | TypeSafeApiRoute) => string;
  export const getRoute: (typeSafeUrl: TypeSafePage | TypeSafeApiRoute) => string;
}
