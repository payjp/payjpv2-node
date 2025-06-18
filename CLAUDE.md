# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run build` - Build the TypeScript project to dist/
- `npm run lint` - Run TypeScript type checking (no emit)
- `npm test` - Run Jest tests
- `npm run dev` - Watch mode for development
- `npm run format` - Format code with Biome
- `npm run clean` - Remove dist/ directory

## Architecture

This is a Node.js SDK for the PAY.JP v2 API built with TypeScript. The architecture consists of:

### Core Components
- **Client Creation**: `payjp2.ts` - Main client factory using `@hey-api/client-fetch`
- **Generated API**: `client/` directory contains auto-generated API functions and types from OpenAPI spec
- **Entry Point**: `index.ts` exports the client factory and all API functions

### Key Files
- `payjp2.ts` - Creates authenticated HTTP client with proper headers and user agent
- `client/sdk.gen.ts` - Auto-generated API functions (healthcheck, plans, payment methods, etc.)
- `client/types.gen.ts` - Auto-generated TypeScript types
- `client/client.gen.ts` - Auto-generated client configuration

### Generated Code
The `client/` directory contains auto-generated code from OpenAPI specs. Do not edit these files directly as they will be overwritten during regeneration.

### Client Configuration
The SDK uses Bearer token authentication with the PAY.JP API. The client automatically sets:
- Authorization header with Bearer token
- User-Agent with binding version and platform info
- X-Payjp-Client-User-Agent with detailed client metadata

### Testing
- Jest configuration in `jest.config.js`
- Tests located in `tests/` directory
- Coverage reporting enabled with lcov output

### Code Quality
- Biome for linting and formatting (config in `biome.json`)
- TypeScript strict mode enabled
- Node.js 20+ required