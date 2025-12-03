# PAY.JP API Client for Node.js

PAY.JP Node.js SDK for v2 API. This library provides a TypeScript-first client for integrating with the PAY.JP payment platform.

## Features

- 🚀 **TypeScript Support**: Full type definitions for all API endpoints
- 🔐 **Secure**: Built-in authentication with API key management
- 📦 **Modern**: Uses fetch API with `@hey-api/client-fetch`
- 🧪 **Well Tested**: Comprehensive test coverage
- 📚 **Auto-generated**: API client generated from OpenAPI specification

## Installation

```bash
npm install @payjp/payjpv2
```

```bash
yarn add @payjp/payjpv2
```

```bash
pnpm install @payjp/payjpv2
```

## Quick Start

### Client Initialization

```typescript
import { createClient } from '@payjp/payjpv2';

const client = createClient({
  apiKey: 'sk_test_xxxxxxxxxxxx', // Your PAY.JP API Key
  baseUrl: 'https://api.pay.jp', // Optional: defaults to PAY.JP API
});
```

### Basic Usage Examples

#### Customer Management

```typescript
import { createCustomer, getCustomer, updateCustomer } from '@payjp/payjpv2';

// Create a customer
const result = await createCustomer({
  client,
  body: {
    email: 'customer@example.com',
    description: 'New Customer',
  }
});

if (result.error) {
  console.error('Error:', result.error);
} else {
  console.log('Customer created:', result.data);

  // Get customer details
  const customer = await getCustomer({
    client,
    path: { customer_id: result.data.id }
  });

  console.log('Retrieved customer:', customer.data);
}
```

#### Payment Flow Operations

```typescript
import {
  createPaymentFlow,
  confirmPaymentFlow,
  capturePaymentFlow
} from '@payjp/payjpv2';

// Create a payment flow
const paymentFlow = await createPaymentFlow({
  client,
  body: {
    amount: 1000, // Amount in yen (e.g., 1000 = ¥1,000)
  }
});

if (paymentFlow.data) {
  // Confirm the payment flow with a payment method
  const confirmed = await confirmPaymentFlow({
    client,
    path: { payment_flow_id: paymentFlow.data.id },
    body: {
      payment_method: 'pm_xxxxxxxxxxxx'
    }
  });

  console.log('Payment confirmed:', confirmed.data);
}
```

#### Product and Price Management

```typescript
import { createProduct, createPrice } from '@payjp/payjpv2';

// Create a product
const product = await createProduct({
  client,
  body: {
    name: 'Premium Plan',
  }
});

// Create a price for the product
if (product.data) {
  const price = await createPrice({
    client,
    body: {
      unit_amount: 1500,
      currency: 'jpy',
      product: product.data.id,
    }
  });

  console.log('Price created:', price.data);
}
```

## API Reference

### Core Functions

The SDK provides functions for all PAY.JP v2 API endpoints:

#### Customer Management
- `createCustomer()` - Create a new customer
- `getCustomer()` - Retrieve customer details
- `updateCustomer()` - Update customer information
- `deleteCustomer()` - Delete a customer
- `getAllCustomers()` - List all customers

#### Payment Flows
- `createPaymentFlow()` - Create a payment flow
- `getPaymentFlow()` - Get payment flow details
- `updatePaymentFlow()` - Update payment flow
- `confirmPaymentFlow()` - Confirm a payment flow
- `capturePaymentFlow()` - Capture an authorized payment
- `cancelPaymentFlow()` - Cancel a payment flow
- `getAllPaymentFlows()` - List payment flows

#### Payment Methods
- `createPaymentMethod()` - Create a payment method
- `getPaymentMethod()` - Retrieve payment method details
- `updatePaymentMethod()` - Update payment method
- `getAllPaymentMethods()` - List payment methods

#### Products and Prices
- `createProduct()`, `getProduct()`, `updateProduct()`, `deleteProduct()`
- `createPrice()`, `getPrice()`, `updatePrice()`

#### Refunds
- `createPaymentRefund()` - Create a refund
- `getPaymentRefund()` - Get refund details
- `updatePaymentRefund()` - Update refund
- `getAllPaymentRefunds()` - List refunds

#### Setup Flows
- `createSetupFlow()` - Create a setup flow
- `getSetupFlow()` - Get setup flow details
- `updateSetupFlow()` - Update setup flow
- `confirmSetupFlow()` - Confirm a setup flow
- `cancelSetupFlow()` - Cancel a setup flow
- `getAllSetupFlows()` - List setup flows

#### Checkout Sessions
- `createCheckoutSession()`, `getCheckoutSession()`, `updateCheckoutSession()`

## Error Handling

The SDK returns errors in a consistent format:

```typescript
import { createCustomer } from '@payjp/payjpv2';

const result = await createCustomer({
  client,
  body: {
    email: 'customer@example.com'
  }
});

if (result.error) {
  console.error('API Error:', result.error);
} else {
  console.log('Success:', result.data);
}
```

### Common Error Types

- `invalid_request_error` - Invalid parameters or malformed request
- `authentication_error` - Invalid API key
- `permission_error` - Insufficient permissions
- `rate_limit_error` - Too many requests
- `api_error` - Internal server error

## Configuration

### Environment Variables

For security, store your API key in environment variables:

```bash
# .env file
PAYJP_API_KEY=sk_test_xxxxxxxxxxxx
```

```typescript
import { createClient } from '@payjp/payjpv2';

const client = createClient({
  apiKey: process.env.PAYJP_API_KEY!,
});
```

### Custom Base URL

For testing or custom endpoints:

```typescript
const client = createClient({
  apiKey: 'sk_test_xxxxxxxxxxxx',
  baseUrl: 'https://custom-api.example.com'
});
```

## TypeScript Support

The SDK is built with TypeScript and provides full type safety:

```typescript
import type { CustomerResponse, PaymentFlowResponse } from '@payjp/payjpv2';
import { createCustomer } from '@payjp/payjpv2';

// Types are automatically inferred from API responses
const result = await createCustomer({
  client,
  body: {
    email: 'test@example.com'
  }
});

if (result.data) {
  const customer: CustomerResponse = result.data;
  console.log(customer.id);
}
```

## Testing

The SDK includes comprehensive tests. To run them:

```bash
npm test        # Run tests
npm run build   # Build the project
npm run lint    # Type check
```

## Requirements

- Node.js 20 or higher
- TypeScript 5.0+ (for TypeScript projects)

## Support

- [PAY.JP Documentation](https://docs.pay.jp/v2)
- [GitHub Issues](https://github.com/payjp/payjpv2-node/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.