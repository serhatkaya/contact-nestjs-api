import { AppGateway } from '@api/gateways/app.gateway';
import { RequestLoggerMiddleware } from '@core/middlewares/request-logger.middleware';
import { configService } from '@core/services/config.service';
import { SharedModule } from '@core/shared/modules/shared.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    AuthModule,
    SharedModule
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes({
        path: '*', method: RequestMethod.ALL
      });
  }
}