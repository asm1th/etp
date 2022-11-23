import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JWTAuthGuard } from './auth/jwt-auth.guard';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const ssl = process.env.SSL === 'true' ? true : false;
  let httpsOptions = null;
  if (ssl) {
    const keyPath = process.env.SSL_KEY_PATH || '';
    const certPath = process.env.SSL_CERT_PATH || '';
    httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  }
  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });
  const port = Number(process.env.PORT) || 5010;
  const hostname = process.env.HOSTNAME || 'localhost';
  const config = new DocumentBuilder()
  .setTitle('Электроннная торговая площадка ПАО "Газпромнефть"')
  .setDescription('Описание REST API')
  .setVersion('1.0.0')
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(port, hostname, () => {
    const address =
      'http' + (ssl ? 's' : '') + '://' + hostname + ':' + port + '/';
    Logger.log('Listening at ' + address);
  });
  //const app = await NestFactory.create(AppModule);
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization');
  //   next();
  // });
  /*
  app.enableCors({  origin: true,
                    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
                    methods: ['GET', 'POST'],//'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
                    credentials: true,
                });
  */
}
bootstrap();
