import {
  FederatedPrincipals,
  ServicePrincipals,
  ManagedPolicies
} from "../lib";

describe("principles", () => {
  test("federated", () => {
    expect(FederatedPrincipals.COGNITO_IDENTITY).toEqual(
      "cognito-identity.amazonaws.com"
    );
  });
  test("service", () => {
    expect(Object.keys(ServicePrincipals).length).toEqual(96);
  });
});

describe("policies", () => {
  test("policies", () => {
    expect(Object.keys(ManagedPolicies).length).toEqual(619);
  });
});
