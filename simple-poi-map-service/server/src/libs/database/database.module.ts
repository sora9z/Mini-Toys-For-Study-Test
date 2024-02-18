import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get<string>(
          'ELASTICSEARCH_NODE',
          'http://localhost:9200',
        ),
        auth: {
          username: configService.get<string>('ELASTICSEARCH_USERNAME'),
          password: configService.get<string>('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [ElasticsearchModule, DatabaseService],
})
export class DatabaseModule {}
