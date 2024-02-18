import { Module } from '@nestjs/common';

import { AddressController } from './address.controller';
import { LibsModule } from 'src/libs';
import { AddressService } from './address.service';

@Module({
  imports: [LibsModule],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
