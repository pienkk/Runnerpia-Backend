import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger 옵션
  const options = new DocumentBuilder()
    .setTitle('RunnerPia API Document')
    .setDescription('러너피아 API 문서입니다.')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  // Swagger 실행
  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(4500);
}
bootstrap();
