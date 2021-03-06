import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 解决跨域
  app.enableCors()
  app.useStaticAssets('uploads',{
    prefix:'/uploads'
  })
  const options = new DocumentBuilder()
    .setTitle('V-WEB')
    .setDescription('API LIST')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log(`http://localhost:3000/api-docs`)
}
bootstrap();
