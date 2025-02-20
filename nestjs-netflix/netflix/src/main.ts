import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class validator를 사용하기 위해 pipe 등록
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Dto로 정의한 것이 아닌 필드가 있다면 전달 안되도록 한다.
      forbidNonWhitelisted: true, // whitelist에 없는 것은 애러 발생
      transformOptions: {
        enableImplicitConversion: true, // ts type을 기반으로 변환함. dto
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
