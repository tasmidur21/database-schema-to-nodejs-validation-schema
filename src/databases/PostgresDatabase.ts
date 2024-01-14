import { Database } from "../contacts/Database";
import { Client as PostgresClient } from 'pg';

export class PostgresDatabase implements Database {
  private client: PostgresClient;

  constructor(config: any) {
    this.client = new PostgresClient(config);
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log('Connected to PostgreSQL database');
    } catch (error:any) {
      console.error('Error connecting to PostgreSQL database:', error.message);
      throw error;
    }
  }

  async query(sql: string): Promise<any> {
    try {
      return await this.client.query(sql);
    } catch (error:any) {
      console.error('Error executing query:', error.message);
      throw error;
    }
  }

  async end(): Promise<void> {
    try {
      await this.client.end();
      console.log('Disconnected from PostgreSQL database');
    } catch (error:any) {
      console.error('Error disconnecting from PostgreSQL database:', error.message);
      throw error;
    }
  }
}
