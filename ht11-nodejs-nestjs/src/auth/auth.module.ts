import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtStratagy} from "./jwt.strategy";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModel, AuthSchema} from "./entities/auth.model";
import {UserModel, UserSchema} from "./user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
    ]),
  ],
  providers: [AuthService, JwtStratagy],
  controllers: [AuthController]
})
export class AuthModule {}
