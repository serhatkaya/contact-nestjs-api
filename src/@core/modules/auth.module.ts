import { AuthController } from "@api/controllers/auth/auth.controller";
import { UsersModule } from "@core/modules/users.module";
import { configService } from "@core/services/config.service";
import { EncryptionService } from "@core/services/encryption.service";
import { JwtStrategy } from "@core/services/jwt.strategy";
import { AuthService } from "@infrastructure/services/auth/auth.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register(configService.getJwtConfig()),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EncryptionService],
  exports: [
    PassportModule,
    JwtModule,
    AuthService
  ],
})
export class AuthModule { }