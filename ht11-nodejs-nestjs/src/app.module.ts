import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {ContentModule} from './content/content.module';
import {ContentController} from "./content/content.controller";
import {AuthController} from "./auth/auth.controller";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/cms'),
        ConfigModule.forRoot(),
        AuthModule,
        ContentModule],

controllers: [ContentController, AuthController],
})
export class AppModule {
}
