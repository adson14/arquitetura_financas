import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422
  }))

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001',
    credentials: true, // Permite o uso de credenciais (cookies, autenticação, etc.)
  };

  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();


