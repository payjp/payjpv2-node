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
  client: client,
  body: {
    email: 'customer@example.com',
    description: 'New Customer',
    metadata: {
      user_id: '12345'
    }
  }
});

if (result.error) {
  console.error('Error:', result.error);
} else {
  console.log('Customer created:', result.data);

  // Get customer details
  const customer = await getCustomer({
    client: client,
    path: { customer_id: result.data.id }
  });

  console.log('Retrieved customer:', customer.data);
}
```

#### Payment Intent Operations

```typescript
import {
  createPaymentIntent,
  confirmPaymentIntent,
  capturePaymentIntent
} from '@payjp/payjpv2';

// Create a payment intent
const paymentIntent = await createPaymentIntent({
  client: client,
  body: {
    amount: 1000, // Amount in smallest currency unit (e.g., 1000 = ¥1,000)
    currency: 'jpy',
    payment_method_types: ['card'],
    metadata: {
      order_id: 'order_12345'
    }
  }
});

if (paymentIntent.data) {
  // Confirm the payment intent
  const confirmed = await confirmPaymentIntent({
    client: client,
    path: { payment_intent_id: paymentIntent.data.id },
    body: {
      payment_method: 'pm_test_card'
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
  client: client,
  body: {
    name: 'Premium Subscription',
    description: 'Monthly premium subscription',
    metadata: {
      category: 'subscription'
    }
  }
});

// Create a price for the product
if (product.data) {
  const price = await createPrice({
    client: client,
    body: {
      unit_amount: 1500,
      currency: 'jpy',
      product: product.data.id,
      recurring: {
        interval: 'month'
      }
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

#### Payment Intents
- `createPaymentIntent()` - Create a payment intent
- `retrievePaymentIntent()` - Get payment intent details
- `updatePaymentIntent()` - Update payment intent
- `confirmPaymentIntent()` - Confirm a payment intent
- `capturePaymentIntent()` - Capture an authorized payment
- `cancelPaymentIntent()` - Cancel a payment intent

#### Payment Methods
- `createPaymentMethod()` - Create a payment method
- `getPaymentMethod()` - Retrieve payment method details
- `updatePaymentMethod()` - Update payment method
- `getAllPaymentMethods()` - List payment methods

#### Products and Prices
- `createProduct()`, `getProduct()`, `updateProduct()`, `deleteProduct()`
- `createPrice()`, `getPrice()`, `updatePrice()`

#### Refunds
- `createRefund()`, `retrieveRefund()`, `updateRefund()`, `cancelRefund()`

#### Setup Intents
- `createSetupIntent()`, `confirmSetupIntent()`, `cancelSetupIntent()`

#### Checkout Sessions
- `createCheckoutSession()`, `getCheckoutSession()`, `updateCheckoutSession()`

## Error Handling

The SDK returns errors in a consistent format:

```typescript
import { createCustomer } from '@payjp/payjpv2';

const result = await createCustomer({
  client: client,
  body: {
    email: 'invalid-email' // This will cause an error
  }
});

if (result.error) {
  console.error('API Error:', {
    type: result.error.type,
    message: result.error.message,
    param: result.error.param, // Field that caused the error
    code: result.error.code
  });
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
import type { Customer, PaymentIntent } from '@payjp/payjpv2';

// Types are automatically inferred
const customer: Customer = await createCustomer({
  client: client,
  body: {
    email: 'test@example.com' // TypeScript will validate this
  }
});
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

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Support

- [PAY.JP Documentation](https://docs.pay.jp/v2)
- [GitHub Issues](https://github.com/payjp/payjpv2-node/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.