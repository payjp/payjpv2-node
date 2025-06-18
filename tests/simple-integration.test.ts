import { describe, expect, test } from "@jest/globals";
import { createClient } from "../payjp2";
import { createCustomer } from "../index";

describe("Simple Integration Tests", () => {
  test("createClient creates proper client object", () => {
    const client = createClient({
      apiKey: "sk_test_dummy_key",
    });

    expect(client).toBeDefined();
    expect(typeof client).toBe("object");
    expect(client).toHaveProperty("get");
    expect(client).toHaveProperty("post");
  });

  test("createCustomer function is available", () => {
    expect(createCustomer).toBeDefined();
    expect(typeof createCustomer).toBe("function");
  });

  test("client creation with custom baseUrl", () => {
    const client = createClient({
      apiKey: "sk_test_dummy_key",
      baseUrl: "https://custom.example.com",
    });

    expect(client).toBeDefined();
  });
});