import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as mappings from './mappings';

@Injectable()
export class DatabaseService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createDocument(index: string, body: object) {
    const result = await this.elasticsearchService.index({
      index,
      body,
      refresh: 'wait_for', // Ensures the document is searchable immediately
      op_type: 'create', // This ensures the operation is for creation only
    });

    return result;
  }

  async updateDocument(index: string, id: string, body: object) {
    return await this.elasticsearchService.update({
      index,
      id,
      body: {
        doc: body,
      },
    });
  }

  async getAddress(index: string, search: string, fields: string[]) {
    const retult = await this.elasticsearchService.search({
      index,
      body: {
        query: {
          multi_match: {
            query: search,
            fields,
          },
        },
      },
    });
  }

  async getAddressByIndex(index: string, id: string) {
    const result = await this.elasticsearchService.get({
      index,
      id,
    });

    return result;
  }

  async getCustomAddressByUserId(index: string, userId: number) {
    const result = await this.elasticsearchService.search({
      index,
      body: {
        query: {
          match: {
            userId,
          },
        },
      },
    });

    return result;
  }
}
