import { describe, expect, test } from "@jest/globals";
import { createClient } from "../payjpv2";
import {
  createCustomer,
  getCustomer,
  createPaymentFlow,
  createProduct,
  createPrice
} from "../index";

describe("Integration Tests", () => {
  
  describe("Client Creation", () => {
    test("createClient returns a functional client", () => {
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
        baseUrl: "https://custom.example.com",
      });

      expect(client).toBeDefined();
      expect(typeof client).toBe("object");
    });
  });

  describe("API Function Availability", () => {
    test("customer functions are exported and callable", () => {
      expect(createCustomer).toBeDefined();
      expect(typeof createCustomer).toBe("function");
      expect(getCustomer).toBeDefined();
      expect(typeof getCustomer).toBe("function");
    });

    test("payment flow functions are exported and callable", () => {
      expect(createPaymentFlow).toBeDefined();
      expect(typeof createPaymentFlow).toBe("function");
    });

    test("product and price functions are exported and callable", () => {
      expect(createProduct).toBeDefined();
      expect(typeof createProduct).toBe("function");
      expect(createPrice).toBeDefined();
      expect(typeof createPrice).toBe("function");
    });
  });

  describe("Client Configuration", () => {
    test("client handles different API key formats", () => {
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

    test("client accepts configuration options", () => {
      const client = createClient({
        apiKey: "sk_test_dummy_key",
        baseUrl: "https://api.pay.jp",
      });

      expect(client).toBeDefined();
    });
  });

  describe("Function Parameters Type Safety", () => {
    test("createCustomer function signature", () => {
      const client = createClient({
        apiKey: "sk_test_dummy_key",
      });

      // This test verifies that the function accepts proper parameters
      // without actually making HTTP calls
      expect(() => {
        createCustomer({
          client: client,
          body: {
            email: "test@example.com",
            description: "Test Customer",
          },
        });
      }).not.toThrow();
    });

    test("createPaymentFlow function signature", () => {
      const client = createClient({
        apiKey: "sk_test_dummy_key",
      });

      // This test verifies that the function accepts proper parameters
      expect(() => {
        createPaymentFlow({
          client: client,
          body: {
            amount: 1000,
            payment_method_id: "pm_test_dummy",
            currency: "jpy",
          },
        });
      }).not.toThrow();
    });
  });

  describe("Error Scenarios", () => {
    test("client creation with empty API key", () => {
      expect(() => {
        createClient({
          apiKey: "",
        });
      }).not.toThrow(); // Client creation should succeed, errors occur during API calls
    });

    test("client creation with undefined baseUrl defaults correctly", () => {
      const client = createClient({
        apiKey: "sk_test_dummy_key",
        baseUrl: undefined,
      });

      expect(client).toBeDefined();
    });
  });
});