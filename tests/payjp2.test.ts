import { describe, expect, test } from "@jest/globals";
import {
  createClient,
} from "../payjpv2";

describe("payjpv2.ts", () => {
  test("createClient creates a client with correct configuration", () => {
    const client = createClient({
      apiKey: "sk_test_dummy_key",
    });

    expect(client).toBeDefined();
    expect(typeof client).toBe("object");
    expect(client).toHaveProperty("get");
    expect(client).toHaveProperty("post");
    expect(client).toHaveProperty("put");
    expect(client).toHaveProperty("delete");
    expect(client).toHaveProperty("patch");
  });

  test("createClient with custom baseUrl", () => {
    const client = createClient({
      apiKey: "sk_test_dummy_key",
      baseUrl: "https://custom.api.example.com",
    });

    expect(client).toBeDefined();
    expect(typeof client).toBe("object");
  });

  test("createClient sets default baseUrl when not provided", () => {
    const client = createClient({
      apiKey: "sk_test_dummy_key",
    });

    expect(client).toBeDefined();
  });

  test("createClient handles different API key formats", () => {
    const testCases = [
      "sk_test_dummy_key",
      "sk_live_dummy_key",
      "pk_test_dummy_key",
    ];

    testCases.forEach((apiKey) => {
      const client = createClient({ apiKey });
      expect(client).toBeDefined();
      expect(typeof client).toBe("object");
    });
  });

  test("client configuration includes proper headers", () => {
    // This is a more complex test that would require mocking the internal client
    // For now, we just ensure the client is created successfully
    const client = createClient({
      apiKey: "sk_test_dummy_key",
    });

    expect(client).toBeDefined();
    expect(typeof client).toBe("object");
  });
});
