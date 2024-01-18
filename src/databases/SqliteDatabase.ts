import * as sqlite3 from 'sqlite3';
import { Database } from '../contacts/Database';


export class SqliteDatabase implements Database {
  private db: sqlite3.Database;

  constructor(config: any) {
    this.db = new sqlite3.Database(config.database);
  }

  async connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.db.serialize(() => {
          resolve();
        });
      } catch (error:any) {
        reject(error);
      }
    });
  }

  async query(sql: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.db.all(sql, (err:any, rows:any) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      } catch (error:any) {
        reject(error);
      }
    });
  }

  async end(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.db.close((err:any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (error:any) {
        reject(error);
      }
    });
  }
}
