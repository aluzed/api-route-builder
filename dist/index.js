"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRoutes = void 0;
const buildRoutes = (rootUrl, routeObj) => {
    // Store route functions
    const routes = {};
    // Loop over each routeObj's key
    for (const key of Object.keys(routeObj)) {
        routes[key] = (params = null, query) => {
            // Start building route
            let route = `${rootUrl}/${routeObj[key].replace(/^\//, "")}`;
            // Replace params with values
            if (params) {
                for (const paramKey of Object.keys(params).sort((a, b) => a.length - b.length)) {
                    route = route.replace(new RegExp(`:${paramKey}`, "g"), String(params[paramKey]));
                }
            }
            // Add url params
            if (query) {
                const queryParams = new URLSearchParams(Object.keys(query).reduce((acc, key) => {
                    acc[key] = String(query[key]);
                    return acc;
                }, {})).toString();
                route += `?${queryParams}`;
            }
            return route;
        };
    }
    return routes;
};
exports.buildRoutes = buildRoutes;
