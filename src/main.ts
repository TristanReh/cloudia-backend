import { NestFactory } from '@nestjs/core';
import { CloudiaModule } from './cloudia.module';

async function bootstrap() {
  const app = await NestFactory.create(CloudiaModule);
  await app.listen(process.env.PORT || 8000) // switch to port 8000 if no alternative is given
}
bootstrap();
