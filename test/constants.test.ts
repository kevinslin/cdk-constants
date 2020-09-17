import {
  FederatedPrincipals,
  ServicePrincipals,
  ManagedPolicies, Regions
} from "../lib";

describe("principles", () => {
  test("federated", () => {
    expect(FederatedPrincipals.COGNITO_IDENTITY).toEqual(
      "cognito-identity.amazonaws.com"
    );
  });
  test("service", () => {
    expect(Object.keys(ServicePrincipals).length).toEqual(95);
  });
});

describe("policies", () => {
  test("policies", () => {
    expect(Object.keys(ManagedPolicies).length).toEqual(619);
  });
});

describe("regions", () => {
  test("public", () => {
    expect(Regions.AP_SOUTH_1).toEqual("ap-south-1");
  });

  test("govcloud", () => {
    expect(Regions.US_GOV_EAST_1).toEqual("us-gov-east-1");
  })

  test("china", () => {
    expect(Regions.CN_NORTHWEST_1).toEqual("cn-northwest-1");
  });
})
