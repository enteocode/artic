import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentVariables } from './env/environment.variables';

import helmet from '@fastify/helmet';
import cookie from '@fastify/cookie';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));
    app.enableShutdownHooks();

    // OpenAPI (for development only)
    //
    // We are using direct referencing and value in order to let optimization process
    // remove it completely in production builds

    if (process.env.NODE_ENV === 'development') {
        const { readPackage } = await import('read-pkg');

        const meta = await readPackage();
        const docs = new DocumentBuilder()
            .setTitle('ARTIC')
            .setDescription(meta.description)
            .setVersion(meta.version)
            .addBearerAuth()
            .build();

        SwaggerModule.setup('api/docs', app, () => {
            return SwaggerModule.createDocument(app, docs);
        });
    }

    // Fastify extensions

    const config = app.get(ConfigService<EnvironmentVariables>);

    await app.register(cookie, { secret: config.get<string>('AUTH_SECRET') });
    await app.register(helmet);

    // Starting the server

    const host = config.get<string>('SERVER_HOST');
    const port = config.get<number>('SERVER_PORT');

    await app.listen(port, host);
}

void bootstrap();
