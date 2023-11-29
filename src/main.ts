import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Quitará del payload todos los atributos que no estén definidos en el dto (util para evitar datos innecesarios en BDD)
      forbidNonWhitelisted: true, //Devuelve una alerta si recibe parámetros de más. Funciona solo con whitelist activada
    }),
  );
  await app.listen(3000);
}
bootstrap();
