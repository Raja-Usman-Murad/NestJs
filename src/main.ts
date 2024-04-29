import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const config = new DocumentBuilder()
  //   .setTitle('USMAN API')
  //   .setDescription('API for usman test project')
  //   .setVersion('1.0')
  //   .addTag('backend api')
  //   .addBearerAuth(
  //     {
  //       type: 'http',
  //       scheme: 'bearer',
  //       bearerFormat: 'JWT',
  //       name: 'JWT',
  //       description: 'Enter JWT token',
  //       in: 'header',
  //     },
  //     'JWT-auth', // @ApiBearerAuth() in controller!
  //   )
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
