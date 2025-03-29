import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

import helmet from 'helmet';
import cookie from 'cookie-parser';

// The input body size limit (in bytes)

const BODY_LIMIT = 32e6;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));

    app.use(helmet());
    app.use(cookie());
    app.use(urlencoded({ extended: true, limit: BODY_LIMIT }));
    app.use(json({ limit: BODY_LIMIT }));

    await app.listen(80, '0.0.0.0');
}

void bootstrap();
