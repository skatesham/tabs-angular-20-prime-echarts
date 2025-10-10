import { Injectable, inject } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({ providedIn: 'root' })
export class SeedService {
  private db = inject(DatabaseService);

  async seedDatabase(): Promise<void> {
    console.log('🌱 Starting database seeding...');

    // Verifica se já tem dados
    const userCount = await this.db.query<{ count: number }>('SELECT COUNT(*) as count FROM users');
    if (userCount[0]?.count > 0) {
      console.log('⏭️  Database already seeded, skipping...');
      return;
    }

    // Seed Users
    await this.seedUsers();
    
    // Seed Buyers
    await this.seedBuyers();

    console.log('✅ Database seeding completed');
  }

  private async seedUsers(): Promise<void> {
    console.log('👤 Seeding users...');

    const users = [
      {
        id: crypto.randomUUID(),
        nome: 'João Silva',
        username: 'joao.silva',
        password: 'senha123',
        phone: '+55 11 98765-4321',
        email: 'joao.silva@email.com',
        profile_img: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: crypto.randomUUID(),
        nome: 'Maria Santos',
        username: 'maria.santos',
        password: 'senha123',
        phone: '+55 21 98765-4322',
        email: 'maria.santos@email.com',
        profile_img: 'https://i.pravatar.cc/150?img=5'
      },
      {
        id: crypto.randomUUID(),
        nome: 'Pedro Oliveira',
        username: 'pedro.oliveira',
        password: 'senha123',
        phone: '+55 31 98765-4323',
        email: 'pedro.oliveira@email.com',
        profile_img: 'https://i.pravatar.cc/150?img=12'
      },
      {
        id: crypto.randomUUID(),
        nome: 'Ana Costa',
        username: 'ana.costa',
        password: 'senha123',
        phone: '+55 41 98765-4324',
        email: 'ana.costa@email.com',
        profile_img: 'https://i.pravatar.cc/150?img=9'
      },
      {
        id: crypto.randomUUID(),
        nome: 'Carlos Ferreira',
        username: 'carlos.ferreira',
        password: 'senha123',
        phone: '+55 51 98765-4325',
        email: 'carlos.ferreira@email.com',
        profile_img: 'https://i.pravatar.cc/150?img=15'
      }
    ];

    for (const user of users) {
      const sql = `
        INSERT INTO users (id, nome, username, password, phone, email, profile_img)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await this.db.run(sql, [
        user.id,
        user.nome,
        user.username,
        user.password,
        user.phone,
        user.email,
        user.profile_img
      ]);
    }

    console.log(`✅ Seeded ${users.length} users`);
  }

  private async seedBuyers(): Promise<void> {
    console.log('🛒 Seeding buyers...');

    // Pega os IDs dos usuários criados
    const users = await this.db.query<{ id: string }>('SELECT id FROM users LIMIT 5');
    
    if (!users || users.length === 0) {
      console.warn('⚠️  No users found, skipping buyers seed.');
      return;
    }
    
    const buyers = [
      {
        user_id: users[0]?.id,
        name: 'Empresa Alpha Ltda',
        location: 'São Paulo, SP',
        last_buy: new Date('2025-01-15').toISOString(),
        ranking: 5
      },
      {
        user_id: users[1]?.id,
        name: 'Beta Comércio',
        location: 'Rio de Janeiro, RJ',
        last_buy: new Date('2025-02-20').toISOString(),
        ranking: 4
      },
      {
        user_id: users[2]?.id,
        name: 'Gamma Distribuidora',
        location: 'Belo Horizonte, MG',
        last_buy: new Date('2025-03-10').toISOString(),
        ranking: 3
      },
      {
        user_id: users[3]?.id,
        name: 'Delta Atacado',
        location: 'Curitiba, PR',
        last_buy: new Date('2025-04-05').toISOString(),
        ranking: 5
      },
      {
        user_id: users[4]?.id,
        name: 'Epsilon Varejo',
        location: 'Porto Alegre, RS',
        last_buy: new Date('2025-05-12').toISOString(),
        ranking: 4
      }
    ].filter(b => b.user_id);

    for (const buyer of buyers) {
      const sql = `
        INSERT INTO buyers (user_id, name, location, last_buy, ranking)
        VALUES (?, ?, ?, ?, ?)
      `;
      await this.db.run(sql, [
        buyer.user_id,
        buyer.name,
        buyer.location,
        buyer.last_buy,
        buyer.ranking
      ]);
    }

    console.log(`✅ Seeded ${buyers.length} buyers`);
  }

  async clearDatabase(): Promise<void> {
    console.log('🗑️  Clearing database...');
    await this.db.run('DELETE FROM buyers');
    await this.db.run('DELETE FROM users');
    console.log('✅ Database cleared');
  }

  async reseedDatabase(): Promise<void> {
    await this.clearDatabase();
    await this.seedDatabase();
  }
}
