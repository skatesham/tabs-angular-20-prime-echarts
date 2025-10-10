import { Injectable } from '@angular/core';
import initSqlJs, { Database } from 'sql.js';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private db!: Database;
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;

    console.log('🔧 Initializing database...');
    
    try {
      // Inicializa sql.js
      const SQL = await initSqlJs({
        locateFile: (file: string) => `https://sql.js.org/dist/${file}`
      });
      
      // Cria banco em memória
      this.db = new SQL.Database();
      
      this.initialized = true;
      console.log('✅ Database initialized');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }

  async execute(sql: string, params: any[] = []): Promise<any> {
    if (!this.initialized) {
      throw new Error('Database not initialized. Call init() first.');
    }
    
    try {
      console.log('Executing:', sql, params);
      this.db.run(sql, params);
      return { changes: this.db.getRowsModified() };
    } catch (error) {
      console.error('SQL execution error:', error);
      throw error;
    }
  }

  async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.initialized) {
      throw new Error('Database not initialized. Call init() first.');
    }
    
    try {
      console.log('Querying:', sql, params);
      
      const result = this.db.exec(sql, params);
      
      if (result.length === 0) {
        return [];
      }

      const columns = result[0].columns;
      const values = result[0].values;

      return values.map((row: any) => {
        const obj: any = {};
        columns.forEach((col: string, idx: number) => {
          obj[col] = row[idx];
        });
        return obj as T;
      });
    } catch (error) {
      console.error('SQL query error:', error);
      throw error;
    }
  }

  async run(sql: string, params: any[] = []): Promise<void> {
    await this.execute(sql, params);
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  // Exporta o banco para persistência (localStorage, IndexedDB, etc)
  export(): Uint8Array {
    return this.db.export();
  }

  // Importa banco salvo
  async import(data: Uint8Array): Promise<void> {
    if (!this.initialized) {
      await this.init();
    }
    const SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`
    });
    this.db = new SQL.Database(data);
  }
}
