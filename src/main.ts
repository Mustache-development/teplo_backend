import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { config } from "dotenv";
config();

// main
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  console.log('route to upload', join(__dirname, "..", "..", "upload"));

  app.useStaticAssets(join(__dirname, "..", "..", "upload"), {
    prefix: "/upload",
  });

  app.enableCors({
    origin: "*",
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
