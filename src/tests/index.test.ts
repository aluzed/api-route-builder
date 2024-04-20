import { describe } from "node:test";
import { buildRoutes } from "../";

type RoutePath = "UsersList" | "UserGet" | "GroupJoin";

type Paths = {
  [K in RoutePath]: string;
};

const paths: Paths = {
  UsersList: "/users",
  UserGet: "/users/:userId",
  GroupJoin: "/groups/:groupId/join",
};

const apiRoutes = buildRoutes<RoutePath>("http://localhost:3000", paths);

describe("Api Route Builder", () => {
  it("Should retrieve my routes", () => {
    expect(Object.keys(apiRoutes)).toHaveLength(3);
    expect(typeof apiRoutes.UsersList).toEqual("function");
    expect(typeof apiRoutes.UserGet).toEqual("function");
    expect(typeof apiRoutes.GroupJoin).toEqual("function");
  });

  it("Should correctly build my route", () => {
    expect(
      apiRoutes.UserGet({ userId: "95dbd66e-c548-4d83-9aca-6087d27e1a87" })
    ).toEqual(
      "http://localhost:3000/users/95dbd66e-c548-4d83-9aca-6087d27e1a87"
    );

    expect(
      apiRoutes.GroupJoin({ groupId: "29929f44-a5a7-435d-b774-48b0bb5d5f27" })
    ).toEqual(
      "http://localhost:3000/groups/29929f44-a5a7-435d-b774-48b0bb5d5f27/join"
    );
  });

  it("Should handle query parameters", () => {
    expect(apiRoutes.UsersList(null, { limit: 50, offset: 25 })).toEqual(
      "http://localhost:3000/users?limit=50&offset=25"
    );
  });
});
