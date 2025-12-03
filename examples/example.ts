import {
  createClient,
  createCustomer,
  getCustomer,
  updateCustomer,
  getAllCustomers,
  deleteCustomer,
} from "../index";

// Get settings from environment variables
const API_HOST = process.env.PAYJP_API_HOST || "https://api.pay.jp";
const API_KEY = process.env.PAYJP_API_KEY || "";

async function run() {
  if (!API_KEY) {
    console.error("Error: Please set the PAYJP_API_KEY environment variable");
    process.exit(1);
  }

  const client = createClient({
    baseUrl: API_HOST,
    apiKey: API_KEY,
  });

  console.log("Client initialized");
  console.log();

  try {
    // 1. Create Customer
    console.log("=== 1. Create Customer ===");
    const idempotencyKey = crypto.randomUUID();
    console.log("Using Idempotency-Key:", idempotencyKey);

    const createResult = await createCustomer({
      client,
      body: {
        email: "test@example.com",
        description: "Test customer from Node.js SDK",
      },
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    });

    if (createResult.error) {
      console.error("Customer creation error:", createResult.error);
      process.exit(1);
    }

    const customerId = createResult.data!.id!;
    console.log("Created customer:", customerId);
    console.log("Email:", createResult.data!.email);
    console.log();

    // 2. Get Customer
    console.log("=== 2. Get Customer ===");
    const getResult = await getCustomer({
      client,
      path: {
        customer_id: customerId,
      },
    });

    if (getResult.error) {
      console.error("Customer retrieval error:", getResult.error);
      process.exit(1);
    }

    console.log("Retrieved customer:", getResult.data!.id);
    console.log("Email:", getResult.data!.email);
    console.log("Description:", getResult.data!.description ?? "(none)");
    console.log();

    // 3. Update Customer
    console.log("=== 3. Update Customer ===");
    const updateResult = await updateCustomer({
      client,
      path: {
        customer_id: customerId,
      },
      body: {
        email: "updated@example.com",
        description: "Updated description from Node.js SDK",
      },
    });

    if (updateResult.error) {
      console.error("Customer update error:", updateResult.error);
      process.exit(1);
    }

    console.log("Updated customer:", updateResult.data!.id);
    console.log("New email:", updateResult.data!.email);
    console.log("New description:", updateResult.data!.description ?? "(none)");
    console.log();

    // 4. List Customers
    console.log("=== 4. List Customers ===");
    const listResult = await getAllCustomers({
      client,
      query: {
        limit: 3,
      },
    });

    if (listResult.error) {
      console.error("Customer list error:", listResult.error);
      process.exit(1);
    }

    console.log("Total customers retrieved:", listResult.data!.data!.length);
    for (const c of listResult.data!.data!) {
      console.log(`  - ${c.id} (${c.email ?? "no email"})`);
    }
    console.log();

    // 5. Delete Customer
    console.log("=== 5. Delete Customer ===");
    const deleteResult = await deleteCustomer({
      client,
      path: {
        customer_id: customerId,
      },
    });

    if (deleteResult.error) {
      console.error("Customer deletion error:", deleteResult.error);
      process.exit(1);
    }

    console.log("Deleted customer:", customerId);
    console.log();

    console.log("=== All tests passed! ===");
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    process.exit(1);
  }
}

run();
