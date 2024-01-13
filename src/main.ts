import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["*", "http://localhost:3000"],
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });
  const config = new DocumentBuilder()
    .setTitle("Teplo")
    .setDescription("The teplo API description")
    .setVersion("1.0")
    .addTag("teplo")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}
bootstrap();
