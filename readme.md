## API Route Builder

This TypeScript library aims to simplify and prevent URL API typing errors within JavaScript projects. It provides a convenient way to replace route parameters and generate query parameters using a single function.

### Installation

To install the library, you can use npm or yarn:

```bash
npm install api-route-builder
```

```bash
yarn add api-route-builder
```

### Usage

```typescript
import { buildRoutes } from "api-route-builder";

// Define your route paths
type RoutePath = "UsersList" | "UserGet" | "GroupJoin";

type Paths = {
  [K in RoutePath]: string;
};

const paths: Paths = {
  UsersList: "/users",
  UserGet: "/users/:userId",
  GroupJoin: "/groups/:groupId/join",
};

// Create your API routes
const apiRoutes = buildRoutes<RoutePath>("http://localhost:3000", paths);

// Now you can use your API routes
Object.keys(apiRoutes); // ["UsersList", "UserGet", "GroupJoin"]

// Example: Build a route with route parameters
apiRoutes.UserGet({ userId: "95dbd66e-c548-4d83-9aca-6087d27e1a87" });
// returns -> "http://localhost:3000/users/95dbd66e-c548-4d83-9aca-6087d27e1a87"

// Example: Build a route with query parameters
apiRoutes.UsersList(null, { limit: 50, offset: 25 });
// returns -> "http://localhost:3000/users?limit=50&offset=25"
```

### API

```typescript
buildRoutes(rootUrl: string, routeObj: Record<T, string>): Record<T, RouteBuilderFunction>
```

Creates API routes based on a root URL and a set of route paths.

- **rootUrl**: The root URL of the API.
- **routeObj**: An object containing route paths, where the keys are route names and the values are path templates with optional route parameters.

Returns an object where each key is a route name and each value is a function that generates the corresponding route URL.

### RouteBuilderFunction

A function that generates a route URL based on route parameters and query parameters.

- **params?**: Record<string, string | number> | null: Optional route parameters.
- **query?**: Record<string, string | number>: Optional query parameters.

Returns the generated route URL as a string.

### Tests

The library includes unit tests to ensure the correctness of the API route builder function. You can run the tests using your preferred testing framework.

### Contributing

Contributions are welcome! If you have any ideas, bug fixes, or feature requests, feel free to open an issue or submit a pull request on GitHub.

### License

This library is licensed under the MIT License. See the LICENSE file for details.
