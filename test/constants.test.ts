import { FEDERATED_PRINCIPALS, SERVICE_PRINCIPALS, MANAGED_POLICIES } from "../lib"

describe("principles", () => {
    test("federated", () => {
        expect(FEDERATED_PRINCIPALS.COGNITO_IDENTITY).toEqual("cognito-identity.amazonaws.com")
    })
    test("service", () => {
        expect(Object.keys(SERVICE_PRINCIPALS).length).toEqual(95)
    })
})

describe("policies", () => {
    test("policies", () => {
        expect(Object.keys(MANAGED_POLICIES).length).toEqual(619)
    })
})