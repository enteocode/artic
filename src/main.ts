import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env/environment.variables';

import helmet from '@fastify/helmet';
import cookie from '@fastify/cookie';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));

    const config = app.get(ConfigService<EnvironmentVariables>);

    await app.register(cookie, { secret: config.get<string>('AUTH_SECRET') });
    await app.register(helmet);

    // Starting the server

    const host = config.get('SERVER_HOST');
    const port = config.get('SERVER_PORT');

    await app.listen(port, host);
}

void bootstrap();
