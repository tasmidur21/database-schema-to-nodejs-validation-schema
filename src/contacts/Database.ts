// Define the DatabaseStrategy interface
export interface Database {
  connect(): Promise<void>;
  query(sql: string): Promise<any>;
  end(): Promise<void>;
}