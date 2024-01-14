import { Client } from 'pg';

export class Database {
  private client: Client;

  constructor(config: any) {
    this.client = new Client(config);
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

  async end(): Promise<void> {
    await this.client.end();
  }

  async query(sql: string): Promise<any> {
    return this.client.query(sql);
  }
}
