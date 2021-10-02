import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './@core/services/config.service';
import { AppModule } from './@core/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  if (!configService.isProduction()) {

    const options = new DocumentBuilder()
      .setTitle('Contact Nestjs Restful API')
      .setVersion('1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

  }

  await app.listen(3000);
}


bootstrap();
