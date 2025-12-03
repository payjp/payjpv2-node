# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2024-06-17

### Added
- Initial release of PAY.JP Node.js SDK v2
- TypeScript support with full type definitions
- Authentication via Bearer token (API Key)
- Comprehensive API coverage including:
  - Customer management (create, read, update, delete)
  - Payment Flow operations (create, confirm, capture, cancel)
  - Payment Method management
  - Product and Price management
  - Refund operations
  - Setup Flow operations
  - Checkout Session management
  - Tax Rate management
  - Payment Page creation
- Automatic User-Agent and client metadata headers
- Jest test suite with coverage reporting
- Examples and documentation

### Technical Details
- Built with `@hey-api/client-fetch` for HTTP client
- Auto-generated API functions and types from OpenAPI specification
- Node.js 20+ support
- CommonJS module format
- TypeScript strict mode enabled
- Biome for code formatting and linting

[0.0.1]: https://github.com/payjp/payjpv2-node/releases/tag/v0.0.1