import { createPool, Pool, PoolConnection, ConnectionConfig } from 'mysql2/promise';
import { Database } from '../contacts/Database';

export class MySQLDatabase implements Database{
  private pool: Pool;
  private connection?: PoolConnection;

  constructor(config: ConnectionConfig) {
    this.pool = createPool(config);
  }

  async connect(): Promise<void> {
    try {
      this.connection = await this.pool.getConnection();
      console.log('Connected to MySQL database');
    } catch (error:any) {
      console.error('Error connecting to MySQL database:', error.message);
      throw error;
    }
  }

  async query(sql: string): Promise<any> {
    try {
      if (this.connection) {
        const [rows, fields] = await this.connection.query(sql);
        return rows;
      } else {
        console.error('Connection is not available.');
        // Handle the case where there's no valid connection
        throw new Error('No valid connection available.');
      }
    } catch (error:any) {
      console.error('Error executing query:', error.message);
      throw error;
    }
  }

  async end(): Promise<void> {
    try {
      if (this.connection) {
        this.connection.release();
        console.log('Disconnected from MySQL database');
      } else {
        console.error('Connection is not available.');
      }
    } catch (error:any) {
      console.error('Error disconnecting from MySQL database:', error.message);
      throw error;
    }
  }
}
