import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JWTAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule, {cors: false});
  //const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization');
    next();
  });
  /*
  app.enableCors({  origin: true,
                    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
                    methods: ['GET', 'POST'],//'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
                    credentials: true,
                });
  */
  const config = new DocumentBuilder()
    .setTitle('Электроннная торговая площадка ПАО "Газпромнефть"')
    .setDescription('Описание REST API')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, ()=> console.log('Server start on port %s', PORT));
}
bootstrap();
