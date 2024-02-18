// migrate.js
const { ElasticsearchService } = require('@nestjs/elasticsearch');
const mappings = require('../libs/database/mappings');

async function runMigration() {
  const elasticsearchService = new ElasticsearchService({
    node: 'http://localhost:9200', // Your Elasticsearch instance URL
    // Add any other necessary Elasticsearch client configuration
  });

  for (const [index, mapping] of Object.entries(mappings)) {
    console.log(`Creating index for: ${index}`);
    try {
      const indexExists = await elasticsearchService.indices.exists({ index });

      if (!indexExists) {
        await elasticsearchService.indices.create({
          index,
          body: { mappings: mapping },
        });
      }
    } catch (error) {
      console.error(`Error creating index for ${index}: `, error);
    }
  }

  console.log('Migration completed');
  process.exit(0);
}

runMigration();
