import { createPool, Pool, PoolConnection, ConnectionConfig } from 'mysql2/promise';
import { Database } from '../contacts/Database';
import { errorMessage, successMessage } from '../config/messages';

export class MySQLDatabase implements Database{
  private pool: Pool;
  private connection?: PoolConnection;

  constructor(config: ConnectionConfig) {
    this.pool = createPool(config);
  }

  async connect(): Promise<void> {
    try {
      this.connection = await this.pool.getConnection();
      console.log(successMessage('Connected to MySQL database'));
    } catch (error:any) {
      console.error(errorMessage('Error connecting to MySQL database:'+error.message));
      throw error;
    }
  }

  async query(sql: string): Promise<any> {
    try {
      if (this.connection) {
        const [rows, fields] = await this.connection.query(sql);
        return rows;
      } else {
        console.error(errorMessage('Connection is not available.'));
        // Handle the case where there's no valid connection
        throw new Error(errorMessage('No valid connection available.'));
      }
    } catch (error:any) {
      console.error(errorMessage('Error executing query:'+error.message));
      throw error;
    }
  }

  async end(): Promise<void> {
    try {
      if (this.connection) {
        this.connection.release();
        console.log(successMessage('Disconnected from MySQL database'));
      } else {
        console.error(errorMessage('Connection is not available.'));
      }
    } catch (error:any) {
      console.error(errorMessage('Error disconnecting from MySQL database:'+error.message));
      throw error;
    }
  }
}
