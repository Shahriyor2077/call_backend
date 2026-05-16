"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
function validateEnv() {
    const required = ['DATABASE_URL', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        throw new Error(`Muhim environment o'zgaruvchilar topilmadi: ${missing.join(', ')}`);
    }
}
async function bootstrap() {
    validateEnv();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',');
    app.enableCors({ origin: allowedOrigins });
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Backend ishga tushdi: http://localhost:${port}/api/v1`);
}
bootstrap();
//# sourceMappingURL=main.js.map