"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "upload"), {
        prefix: "/upload",
    });
    app.enableCors({
        origin: ["*", "http://localhost:3000"],
        methods: "GET,PUT,POST,DELETE",
        allowedHeaders: "Content-Type, Authorization",
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Teplo")
        .setDescription("The teplo API description")
        .setVersion("1.0")
        .addTag("teplo")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map