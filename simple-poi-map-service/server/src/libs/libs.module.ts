import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';

@Module({
  imports: [
    HttpModule.register({
      timeout: 50000,
    }),
    DatabaseModule,
  ],
  exports: [HttpModule, DatabaseModule],
})
export class LibsModule {}
