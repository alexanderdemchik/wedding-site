import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addApiKey({ type: 'apiKey', in: 'header', name: 'Authorization' }, 'API_KEY')
    .setTitle('Wedding Site API')
    .setDescription('Wedding Site API')
    .setVersion('1.0')
    .addServer('/api', 'production')
    .addServer('/', 'dev')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: '*' });

  await app.listen(process.env.PORT);
}
bootstrap();
