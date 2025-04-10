ARTIC (Example NestJS Application)
=====

A personal collection of favorite artworks from the Art Institute of Chicago (ARTIC).

## Requirements

- Node.js (LTS or later)
- Redis 6
- MySQL 8

## Development

To start development:

1. Copy `.env.example` to `.env` and update values as needed
2. Install dependencies and start the application

```shell
npm i
npm start
```

Once all containers are running and the NestJS application has started successfully, the following services will be
available on `localhost`, provided the default ports in `.env` remain unchanged:

| Service             | Port   | Protocol | Availability                          |
|---------------------|--------|----------|---------------------------------------|
| **API**             | `3030` | HTTP     | -                                     |
| **MySQL**           | `3306` | TCP      | Not publicly accessible in production |
| **Redis**           | `6379` | TCP      | Not publicly accessible in production |
| **Redis Commander** | `8081` | HTTP     | Not available in production           |

### Authorization

A user is created by default in non-production environments:

- Username: `user@example.com`
- Password: `password`

### API Documentation

OpenAPI documentation is available in the development environment at `/api/docs`.

## Production

To build and deploy the application in a production-ready state:

```shell
$ docker-compose up
```

The build process generates source maps alongside compiled files to facilitate debugging via the Node.js inspector.

## Technical Decisions Made

### Rollup

Using the latest `rollup` offers several key advantages:

- Tree-shaking of imports and unused class methods reduces bundle size, improving initial performance
- Its native implementation delivers fast compilation
- Redundant decorator helpers are removed, streamlining tokenization
- Node.js caches source files based on content hash—any change in the system invalidates the cache and triggers a full reset

This bundler performs significantly better and produces no boilerplate code compared to Webpack. Its native 
implementation outperforms Bun and its mature plugin ecosystem and active community made it the best fit for this
backend project.

Webpack is more suitable for asset handling (e.g. images, CSS preprocessors), but that's irrelevant in a backend-focused
setup like this.

### MySQL/MariaDB

Postgres is more robust and feature-rich overall, but the MyISAM engine (used by default in MySQL/MariaDB alongside the
optional InnoDB) performs better with smaller datasets due to its memory-first design.

## Roadmap

- Implement end-to-end (E2E) and unit tests.

---

© 2022-2025 [Ádám Székely][Z]. All rights reserved.


[Z]: https://www.linkedin.com/in/enteocode/

