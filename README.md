ARTIC (Example NestJS Application)
=================================

Personal list of favorite art pieces of Art Institute of Chicago (ARTIC).

## Requirements

- Node LTS (or above)
- Redis 6
- MySQL 8

## Development

To start development, copy the `.env.example` file to `.env` and change values according to your setup, then simply run:

```shell
npm i
npm start
```

When all containers are ready and the Nest application has successfully started, you can access the following services 
on `localhost`, provided you haven't changed the default ports defined in `.env`:

| Name                | Port   | Protocol | Availability                          |
|---------------------|--------|----------|---------------------------------------|
| **API**             | `3030` | HTTP     | -                                     |
| **MySQL**           | `3306` | TCP      | Not publicly accessible in production |
| **Redis**           | `6379` | TCP      | Not publicly accessible in production |
| **Redis Commander** | `8081` | HTTP     | Not available in production           |


## Production

To build the optimized version of the source code ready for production and start the server:

```shell
$ docker-compose up
```

## API

The API will be listening on `localhost`, so make sure that the port 80 is 
free to use.
For easier testing you can find a Postman collection under the `resources`
directory.

**Everything works with JSON objects.**

### Login 

**Endpoint**: `[POST] /api/login`

Authenticates the user credentials and on success it puts a HttpOnly COOKIE to
the response to support sticky sessions. If your client does not support 
cookies, then you can find the token in the X-Token response header and can
authorize each requests by

```
Authorization Bearer {Token}
```

**Schema**

```json
{
  "username": "user1@email.com",
  "password": "password"
}
```

### Logout

**Endpoint**: `[GET] /api/logout`

This endpoint will remove the COOKIE and will return HTTP/401 Unauthorized
header.

### Artwork

To retrieve a paginated collection, you can use `[GET] /api/artworks` with
optional query parameters:

- `limit`: Number of items per page
- `page`: Number of the page (starts with 1)

To retrieve an exact item, you can use `[GET] /api/artworks/{id}`.

### Favorites

To add an item to your personal collection call `[POST] /api/favorites`,
with the numeric ID of the artwork. 

```json
{
  "artwork": 66607
}
```

To list your stored favorites call `[GET] /api/favorites` and to remove
one call `[DELETE] /api/favorites/{id}`.

## Roadmap

- Introduce Swagger (Open API) for easier testing
- Make E2E and unit-tests
- Split documentation into separate files and use Table of Contents

---

Copyright © 2022-2025 by [Ádám Székely][Z], All rights reserved!


[Z]: https://www.linkedin.com/in/enteocode/
