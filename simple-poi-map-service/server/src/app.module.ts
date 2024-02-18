import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { CustomAddressModule } from './custom-address/custom-address.module';
import { CustomAreaModule } from './custom-area/custom-area.module';
import { UserModule } from './user/user.module';
import { LibsModule } from './libs/libs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AddressModule,
    CustomAddressModule,
    CustomAreaModule,
    UserModule,
    LibsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
