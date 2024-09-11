import { NestFactory } from '@nestjs/core';
import { CloudiaModule } from './cloudia.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(CloudiaModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.use(cookieParser());
  
  await app.listen(process.env.PORT || 8000); // switch to port 8000 if no alternative is given
}

bootstrap();
