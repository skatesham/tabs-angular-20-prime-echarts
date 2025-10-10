import { APP_INITIALIZER, Provider, isDevMode } from '@angular/core';
import { DatabaseService } from './database.service';
import { MigrationService } from './migration.service';
import { SeedService } from './seed.service';

// Inicializa o banco de dados e executa migrations antes da aplicação iniciar
export function initializeDatabase(
  dbService: DatabaseService, 
  migrationService: MigrationService,
  seedService: SeedService
) {
  return async () => {
    await dbService.init();
    await migrationService.runMigrations();
    
    // Seed apenas em modo desenvolvimento
    if (isDevMode()) {
      await seedService.seedDatabase();
    }
  };
}

export const DATABASE_PROVIDERS: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeDatabase,
    deps: [DatabaseService, MigrationService, SeedService],
    multi: true
  }
];
