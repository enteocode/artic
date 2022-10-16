ICF Technology Backend Trial Test
=================================

Personal list of favorite art pieces of Art Institute of Chicago (ARTIC).

## Requirements

- Node LTS 16.13 (or above)
- Docker
- Redis 6
- MySQL 8

## Development

To introduce new features or fix bugs, use the composition file with the 
development extension. It should be the another way around, but the task
description described this way to use the production code.

To start development, simply run:

```shell
$ npm start
```

## Production

To build the optimized version of the source code ready for production and 
start the server:

```shell
$ docker-compose up
```

---

Copyright © 2022 by [Ádám Székely][Z], All rights reserved!


[Z]: https://www.linkedin.com/in/enteocode/
