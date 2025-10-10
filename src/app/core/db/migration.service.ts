import { Injectable, inject } from '@angular/core';
import { DatabaseService } from './database.service';

interface Migration {
  version: string;
  name: string;
  sql: string;
}

@Injectable({ providedIn: 'root' })
export class MigrationService {
  private db = inject(DatabaseService);

  private migrations: Migration[] = [
    {
      version: 'V001',
      name: 'CREATE_USER',
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY NOT NULL,
          nome TEXT NOT NULL,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          profile_img TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      `
    },
    {
      version: 'V002',
      name: 'CREATE_BUYER',
      sql: `
        CREATE TABLE IF NOT EXISTS buyers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          name TEXT NOT NULL,
          location TEXT,
          last_buy DATETIME,
          ranking INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_buyers_user_id ON buyers(user_id);
        CREATE INDEX IF NOT EXISTS idx_buyers_name ON buyers(name);
        CREATE INDEX IF NOT EXISTS idx_buyers_ranking ON buyers(ranking);
      `
    }
  ];

  async runMigrations(): Promise<void> {
    console.log('🔄 Starting migrations...');

    // Cria tabela de controle de migrations
    await this.createMigrationsTable();

    // Pega migrations já executadas
    const executedMigrations = await this.getExecutedMigrations();

    // Executa migrations pendentes em ordem
    for (const migration of this.migrations) {
      if (!executedMigrations.includes(migration.version)) {
        console.log(`▶️  Running migration ${migration.version}__${migration.name}`);
        
        try {
          await this.db.run(migration.sql);
          await this.recordMigration(migration.version, migration.name);
          console.log(`✅ Migration ${migration.version}__${migration.name} completed`);
        } catch (error) {
          console.error(`❌ Migration ${migration.version}__${migration.name} failed:`, error);
          throw error;
        }
      } else {
        console.log(`⏭️  Skipping ${migration.version}__${migration.name} (already executed)`);
      }
    }

    console.log('✅ All migrations completed');
  }

  private async createMigrationsTable(): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await this.db.run(sql);
  }

  private async getExecutedMigrations(): Promise<string[]> {
    const sql = 'SELECT version FROM schema_migrations ORDER BY version';
    const rows = await this.db.query<{ version: string }>(sql);
    return rows.map(row => row.version);
  }

  private async recordMigration(version: string, name: string): Promise<void> {
    const sql = 'INSERT INTO schema_migrations (version, name) VALUES (?, ?)';
    await this.db.run(sql, [version, name]);
  }
}
