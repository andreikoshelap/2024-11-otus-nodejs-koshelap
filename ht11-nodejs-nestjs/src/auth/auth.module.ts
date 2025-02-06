import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtStrategy} from "./jwt.strategy";
import {MongooseModule} from "@nestjs/mongoose";
import {UserModel, UserSchema} from "./user.module";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
    ]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
