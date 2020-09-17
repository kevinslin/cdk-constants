import { normalizeServiceName } from "../lib/utils";

describe("normalizeServiceName", () => {
  test("snakeCase", () => {
    expect(normalizeServiceName("aws S3")).toEqual("AWS_S3");
  });

  test("stripPrefix", () => {
    expect(
      normalizeServiceName("aws s3", {
        stripPrefix: true,
        snakeCase: false
      })
    ).toEqual("s3");

    expect(
      normalizeServiceName("amazon s3", {
        stripPrefix: true,
        snakeCase: false
      })
    ).toEqual("s3");
  });

  test("useBlacklist", () => {
    expect(normalizeServiceName("af-south-1", {useBlacklist: false})).toEqual("AF_SOUTH_1");
  });
});
