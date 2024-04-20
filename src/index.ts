export type RouteBuilderFunction = (
  params?: Record<string, string | number> | null,
  query?: Record<string, string | number>
) => string;

export const buildRoutes = <T extends string>(
  rootUrl: string,
  routeObj: Record<T, string>
): Record<T, RouteBuilderFunction> => {
  // Store route functions
  const routes: Record<T, RouteBuilderFunction> = {} as Record<
    T,
    RouteBuilderFunction
  >;

  // Loop over each routeObj's key
  for (const key of Object.keys(routeObj) as T[]) {
    routes[key] = (
      params: Record<string, string | number> | null = null,
      query?: Record<string, string | number>
    ) => {
      // Start building route
      let route = `${rootUrl}/${routeObj[key].replace(/^\//, "")}`;

      // Replace params with values
      if (params) {
        for (const paramKey of Object.keys(params).sort(
          (a, b) => a.length - b.length
        )) {
          route = route.replace(
            new RegExp(`:${paramKey}`, "g"),
            String(params[paramKey])
          );
        }
      }

      // Add url params
      if (query) {
        const queryParams = new URLSearchParams(
          Object.keys(query).reduce((acc, key) => {
            acc[key] = String(query[key]);
            return acc;
          }, {} as Record<string, string>)
        ).toString();
        route += `?${queryParams}`;
      }

      return route;
    };
  }

  return routes;
};
