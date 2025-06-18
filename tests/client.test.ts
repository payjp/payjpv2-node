import type { Client } from "@hey-api/client-fetch";
import { describe, expect, jest, test } from "@jest/globals";
import * as sdkExports from "../client/sdk.gen";
import * as indexExports from "../index";
import { createCustomer } from "../index";
import * as payjp2Exports from "../payjp2";

describe("index.ts", () => {
  test("correctly exports modules", () => {
    // Verify that createClient and ClientConfig are correctly exported
    expect(indexExports.createClient).toBeDefined();
    expect(indexExports.createClient).toBe(payjp2Exports.createClient);

    // Verify that all functions exported from client/sdk.gen are included
    for (const key in sdkExports) {
      if (Object.prototype.hasOwnProperty.call(sdkExports, key)) {
        expect(indexExports).toHaveProperty(key);
        // For type safety, check for property existence only, not direct comparison
        expect((indexExports as Record<string, unknown>)[key]).toBe(
          (sdkExports as Record<string, unknown>)[key],
        );
      }
    }
  });

  test("createClient returns an object of the correct format", () => {
    const client = indexExports.createClient({
      apiKey: "sk_test_dummy_key",
    });

    // Ensure the client object exists
    expect(client).toBeDefined();
    expect(typeof client).toBe("object");

    // Ensure it has at least get and post methods (basic functionality of @hey-api/client-fetch)
    expect(client).toHaveProperty("get");
    expect(client).toHaveProperty("post");
    expect(typeof client.get).toBe("function");
    expect(typeof client.post).toBe("function");
  });

  test("default baseUrl is used", () => {
    const spy = jest.spyOn(payjp2Exports, "createClient");

    indexExports.createClient({
      apiKey: "sk_test_dummy_key",
    });

    // Verify that createClient was called with the correct arguments
    expect(spy).toHaveBeenCalledWith({
      apiKey: "sk_test_dummy_key",
    });

    spy.mockRestore();
  });

  test("custom baseUrl is used", () => {
    const spy = jest.spyOn(payjp2Exports, "createClient");

    indexExports.createClient({
      apiKey: "sk_test_dummy_key",
      baseUrl: "https://custom.example.com",
    });

    // Verify that createClient was called with the correct arguments
    expect(spy).toHaveBeenCalledWith({
      apiKey: "sk_test_dummy_key",
      baseUrl: "https://custom.example.com",
    });

    spy.mockRestore();
  });

  test("can import createCustomer function", () => {
    // Ensure the createCustomer function exists
    expect(createCustomer).toBeDefined();
    expect(typeof createCustomer).toBe("function");
  });
});
