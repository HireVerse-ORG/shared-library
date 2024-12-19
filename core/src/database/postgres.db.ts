import { DataSource } from 'typeorm';
import { IDatabase } from '../types/database.interface';

export class PostgresDBConnection implements IDatabase {
  private dataSource?: DataSource;

  async connect(uri: string) {
    try {
      this.dataSource = new DataSource({
        type: 'postgres',
        url: uri,
        synchronize: true,
        logging: true,
      });
      await this.dataSource.initialize();
      console.log('PostgreSQL connected');
    } catch (err) {
      console.error('PostgreSQL connection failed:', err);
      throw err;
    }
  }

  async disconnect() {
    try {
      if (this.dataSource) {
        await this.dataSource.destroy();
        console.log('PostgreSQL disconnected');
      }
    } catch (err) {
      console.error('Failed to disconnect from PostgreSQL:', err);
    }
  }
}
