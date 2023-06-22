"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_transactional_1 = require("typeorm-transactional");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    (0, typeorm_transactional_1.initializeTransactionalContext)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('RunnerPia API Document')
        .setDescription('러너피아 API 문서입니다.')
        .setVersion('0.0.1')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options, {});
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    await app.listen(4500);
}
bootstrap();
//# sourceMappingURL=main.js.map